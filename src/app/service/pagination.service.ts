import { EditorPage } from './../pages/editor/editor.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, pipe, Observable } from 'rxjs';
import { scan, tap, take, retry, retryWhen, delay } from 'rxjs/operators';
import { ModalController, ToastController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { File } from '@ionic-native/file/ngx';
import domtoimage from 'dom-to-image';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {

  count:number=0;
  ismodalopen: boolean = false;




  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  // Observable data
  data: Observable<any> = this._done.asObservable();
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

  constructor(
    private af: AngularFirestore,
    private socialSharing: SocialSharing,
    private toastController: ToastController,
    private clipboard: Clipboard,
    private nativeStorage: NativeStorage,
    private file: File,
    private modalController: ModalController
  ) {}

  item2: any = [];
  favoritedata: any = [];

  init(collection) {
    const first = this.af.collection(collection, (ref) => {
      return ref.orderBy('time', 'desc').limit(1);
    });

    this.mapAndUpdate(first);

    // Create the observable array for consumption in components
    this.data = this._data.pipe(
      scan((acc, val) => {
        return acc.concat(val);
      })
    );
  }

  // Retrieves additional data from firestore
  more(collection) {
    const cursor = this.getCursor();

    const more = this.af.collection(collection, (ref) => {
      return ref.orderBy('time', 'desc').limit(1).startAfter(cursor);
    });
    this.mapAndUpdate(more);
  }

  // Determines the doc snapshot to paginate query
  getCursor() {
    const current = this._data.value;
    if (current.length) {
      return current[current.length - 1].doc;
    }
    return null;
  }

  // Maps the snapshot to usable format the updates source
  mapAndUpdate(col: AngularFirestoreCollection<any>) {
    console.log('rr', col);

    if (this._done.value || this._loading.value) {
      return;
    }

    // loading
    this._loading.next(true);

    // Map snapshot with doc ref (needed for cursor)
    return col
      .snapshotChanges()
      .pipe(
        tap((arr) => {
          console.log('arr :>> ', arr);

          let values = arr.map((snap) => {
            const data = snap.payload.doc.data();
            const doc = snap.payload.doc;

            data.data.forEach((element) => {
              this.item2.push(element);
            });

            return { ...data, doc };
          });

          // update source with new values, done loading
          this._data.next(values);
          this._loading.next(false);

          // no more values, mark done
          if (!values.length) {
            this._done.next(true);
          }

          //   this.data.subscribe(res=>console.log(res[0].field))
        })
      )
      .subscribe();
  }

  // Reset the page
  reset() {
    this._data.next([]);
    this._done.next(false);
    this.item2 = [];
  }

  shareApp() {
    this.socialSharing.share(
      'for best Sharyari install this app',
      '',
      '',
      'http://www.shayarify.com/love-shayari/'
    );
  }

  faceboookShare() {
    this.socialSharing.shareViaFacebookWithPasteMessageHint(
      'for best Sharyari install this app',
      '',
      'http://www.shayarify.com/love-shayari/',
      'is App ko mai recommend karta hun'
    );
  }
  whatsAppShare() {
    this.socialSharing.shareViaWhatsApp(
      'for best Sharyari install this app',
      '',
      'http://www.shayarify.com/love-shayari/'
    );
  }

  mail() {
    this.socialSharing.shareViaEmail('rahul', 'contact with us', [
      'rahulguptasonu123@gmail.com',
    ]);
  }

  //Acction bar

  async copy(item) {
    this.clipboard.copy(item);

    const toast = await this.toastController.create({
      message: 'copied',
      duration: 1000,
      mode: 'ios',
      cssClass: 'my-custom-class',
    });
    toast.present();
  }







  Save(box) {


    let file_name=new Date().getTime().toString()+'.png';

    const options = { background: 'white', height: 845, width: 595 };
    domtoimage.toPng(box, options).then((dataUrl) => {

      var link = document.createElement('a');
      link.download =file_name;
      link.href = dataUrl;

      link.click();

      this.writeFile(dataUrl, 'TRVShayari', file_name);
    });
  }

  public writeFile(base64Data: any, folderName: string, fileName: any) {
    let contentType = this.getContentType(base64Data);
    let DataBlob = this.base64toBlob(base64Data, contentType);
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.
    let filePath = this.file.externalRootDirectory + folderName;
    this.file.createDir(this.file.externalRootDirectory, folderName, true);

    this.file
      .writeFile(filePath, fileName, DataBlob, contentType)
      .then(async (success) => {
        console.log('File Writed Successfully', success);
        const toast = await this.toastController.create({
          message: 'Download',
          duration: 1000,
          mode: 'ios',
          cssClass: 'my-custom-class',
        });
        toast.present();


      })
      .catch((err) => {
        console.log('Error Occured While Writing File', err);
      });
  }

  //here is the method used to get content type of an bas64 data
  public getContentType(base64Data: any) {
    let block = base64Data.split(';');
    let contentType = block[0].split(':')[1];
    return contentType;
  }

  public base64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    let byteCharacters = atob(
      b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
    );
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, {
      type: contentType,
    });
    return blob;
  }

  async edit(item) {
    const modal = await this.modalController.create({
      component: EditorPage,
      componentProps: { value: item },
    });

    await modal.present();
  }

  //action bar 2


    commonshare(box) {

    //save

    let file_name=new Date().getTime().toString()+'.png';

    // const options = { background: 'white', height: 845, width: 595 };
    // domtoimage.toPng(box, options).then((dataUrl) => {
    //   this.writeFile(dataUrl, 'TRVShayari', file_name);
    // });


    this.file.resolveDirectoryUrl(this.file.externalRootDirectory+'TRVShayari').then((res)=>{
      this.file.getFile(res,file_name,{create:false}).then((url)=>{
        console.log('url :>> ', url.nativeURL);
        this.socialSharing.share('', '', url.nativeURL, '');
      }).catch((err)=>{
        console.log('err :>> ', err);
      })
    }).catch((e)=>{
      console.log('e :>> ', e);
    })



    //share


    //delete


    this.file.removeFile(this.file.externalRootDirectory+'TRVShayari',file_name);







    }









  whatsAppSharecard(box) {
    this.socialSharing.shareViaWhatsApp(
      'install this app',
      '',
      'https://play.google.com/store/apps/details?id=com.trv.statussaverforwhatsapp'
    );
  }








downloadeddata:any=[];

fetchdownloadedcard()
{


  this.file.listDir(this.file.externalRootDirectory,'TRVShayari').then((entry)=>{

    entry.map(data=>{
      this.downloadeddata.push({
        imageview:this.getimagesrc(data.nativeURL),
        nativeurl:data.nativeURL
      });
    })





  })

}



public win: any = window;

getimagesrc(urls) {
  let path = this.win.Ionic.WebView.convertFileSrc(urls);
  return path;
}













favroite(index) {


this.nativeStorage.getItem('boobs').then((res)=>{

  console.log('res :>> ', res);

}).catch((e)=>{

  console.log('e :>> ', e);
})





  this.favoritedata[index] = this.item2[index];
  this.nativeStorage.setItem('boobs', JSON.stringify(this.favoritedata));


}























}
