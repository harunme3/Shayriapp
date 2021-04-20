import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject ,BehaviorSubject, pipe,Observable} from 'rxjs';
import{ scan,tap,take} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PaginationService {


//focus only in this page

//source of data

  private _data = new BehaviorSubject([]);


// make observable data now we can use only observer function next(),complete(),error()
   data: Observable<any>;









  constructor(private af:AngularFirestore) {


   }



   item2:any=[];



init()
{
  const first = this.af.collection('verydard', ref => {
    return ref.limit(1)
  });

  this.mapAndUpdate(first);

    // Create the observable array for consumption in components
    this.data = this._data.asObservable().pipe(
      scan( (acc, val) => {
        return acc.concat(val)
      })

    )



}



// Retrieves additional data from firestore
more() {

  const cursor = this.getCursor();


  const more = this.af.collection('verydard', ref => {
    return ref
           .orderBy('field')
          .limit(1)
          .startAfter(cursor)

  })
  this.mapAndUpdate(more)
}


private getCursor() {

  const current = this._data.value
  console.log('current :>> ', current);
  if (current.length) {
    return current[current.length - 1].doc
  }
  return null
}






mapAndUpdate(col: AngularFirestoreCollection<any>) {





  // Map snapshot with doc ref (needed for cursor)
  return col.snapshotChanges().pipe(

    tap(arr => {

      let values = arr.map(snap => {

        const data = snap.payload.doc.data();
        const doc = snap.payload.doc;


       console.log('data :>> ', data.field);

       data.field.forEach(element => {
        this.item2.push(element)
       });

        return { ...data, doc }
      })



          // update source with new values, done loading
          this._data.next(values);

    })



  ).subscribe()





}






}

