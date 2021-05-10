import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject ,BehaviorSubject, pipe,Observable} from 'rxjs';
import{ scan,tap,take, retry, retryWhen, delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})




export class PaginationService {






  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);



 // Observable data
 data: Observable<any> = this._done.asObservable();;
 done: Observable<boolean> = this._done.asObservable();
 loading: Observable<boolean> = this._loading.asObservable();

  constructor(private af:AngularFirestore) {

   }

   item2:any=[];






init(collection)
{


  const first = this.af.collection(collection, ref => {
    return ref
    .orderBy("time", "desc")
    .limit(1)
  });

  console.log('first :>> ', first);





  this.mapAndUpdate(first);

    // Create the observable array for consumption in components
    this.data = this._data.pipe(
      scan( (acc, val) => {
        return acc.concat(val)
      })

    )



}



// Retrieves additional data from firestore
more(collection) {

  const cursor = this.getCursor();

  const more = this.af.collection(collection, ref => {
    return ref
       .orderBy("time", "desc")
          .limit(1)
          .startAfter(cursor)

  })
  this.mapAndUpdate(more)
}

 // Determines the doc snapshot to paginate query
 getCursor() {

  const current = this._data.value
  if (current.length) {
    return current[current.length - 1].doc
  }
  return null
}





// Maps the snapshot to usable format the updates source
mapAndUpdate(col: AngularFirestoreCollection<any>) {


  if (this._done.value || this._loading.value) {
    return;
  }

 // loading
 this._loading.next(true);




  // Map snapshot with doc ref (needed for cursor)
  return col.snapshotChanges().pipe(


   tap(arr => {
     console.log('arr :>> ', arr);

      let values = arr.map(snap => {


        const data = snap.payload.doc.data();
        const doc = snap.payload.doc;

       data.data.forEach(element => {
        this.item2.push(element)
       });


        return { ...data, doc }
      })


          // update source with new values, done loading
          this._data.next(values);
           this._loading.next(false);

              // no more values, mark done
        if (!values.length) {
          this._done.next(true);
        }

      //   this.data.subscribe(res=>console.log(res[0].field))

    })



  ).subscribe()





}

 // Reset the page
 reset() {
  this._data.next([]);
  this._done.next(false);
  this.item2=[];
}























}

