
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, pipe, Observable } from 'rxjs';
import { scan, tap, take, retry, retryWhen, delay } from 'rxjs/operators';
import { ModalController, ToastController, Platform } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { File } from '@ionic-native/file/ngx';
import domtoimage from 'dom-to-image';


@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  count: number = 0;
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
    private modalController: ModalController,
    private platform:Platform,
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

  public writeFileShare(base64Data: any, folderName: string, fileName: any) {
    return new Promise((resolve, reject) => {
      let contentType = this.getContentType(base64Data);
      let DataBlob = this.base64toBlob(base64Data, contentType);
      // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.
      let filePath = this.file.externalRootDirectory + folderName;
      this.file.createDir(this.file.externalRootDirectory, folderName, true);

      this.file
        .writeFile(filePath, fileName, DataBlob, contentType)
        .then((r) => {
          resolve('resolved');
        })
        .catch((err) => {
          console.log('Error Occured While Writing File', err);
          reject('rejected');
        });
    });
  }

  Save(box) {
    let file_name = new Date().getTime().toString() + '.jpeg';

    const options = { background: 'white', height: 300, width: 300 };
    domtoimage.toJpeg(box, options).then((dataUrl) => {

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


  //action bar 2

  commonshare(box) {

    let file_name = new Date().getTime().toString() + '.jpeg';
    const options = { background: 'white', height: 300, width: 300 };

    domtoimage.toJpeg(box, options).then((dataUrl) => {
      this.writeFileShare(dataUrl, 'TRVShayari', file_name).then((res) => {
        this.file
          .resolveLocalFilesystemUrl(
            `file:///storage/emulated/0/TRVShayari/${file_name}`
          )
          .then((res) => {
            this.socialSharing
              .share(
                'install this app for latest shayari',
                '',
                `file:///storage/emulated/0/TRVShayari/${file_name}`,
                ''
              )
              .then((res) => {
                console.log('deleted',res);
                this.file.removeFile(
                  this.file.externalRootDirectory + 'TRVShayari',
                  file_name
                );
              });
          })
          .catch((e) => {
            console.log('e :>> ', e);
          });
      });
    });
  }



  whatsAppcommonshare(box) {

    let file_name = new Date().getTime().toString() + '.jpeg';
    const options = { background: 'white', height: 300, width: 300 };


    domtoimage.toJpeg(box, options).then((dataUrl) => {
      this.writeFileShare(dataUrl, 'TRVShayari', file_name).then((res) => {


        this.file
          .resolveLocalFilesystemUrl(
            `file:///storage/emulated/0/TRVShayari/${file_name}`
          )
          .then((res) => {
            this.socialSharing
              .shareViaWhatsApp(
                'install this app for latest shayari',
                `file:///storage/emulated/0/TRVShayari/${file_name}`,
                ''
              )
              .then((res) => {


              setTimeout(() => {
                this.file.removeFile(
                  this.file.externalRootDirectory + 'TRVShayari',
                  file_name
                );

                console.log('deleted',res);
              }, 30000);







              });
          })
          .catch((e) => {
            console.log('e :>> ', e);
          });
      });
    });
  }


















  downloadeddata: any = [];

  fetchdownloadedcard() {
    this.file
      .listDir(this.file.externalRootDirectory, 'TRVShayari')
      .then((entry) => {
        entry.map((data) => {
          this.downloadeddata.push({
            imageview: this.getimagesrc(data.nativeURL),
            nativeurl: data.nativeURL,
          });
        });
      });
  }

  public win: any = window;

  getimagesrc(urls) {
    let path = this.win.Ionic.WebView.convertFileSrc(urls);
    return path;
  }



  favdata: any[] = [];


  favroite(index) {


    this.nativeStorage
      .getItem('boobs')
      .then((res) => {


          this.favdata=[...JSON.parse(res)];

        this.favdata[index] = this.item2[index];
        this.nativeStorage.setItem('boobs', JSON.stringify(this.favdata)).then((res)=>{

          console.log(JSON.parse(res));
        });


      })
      .catch((e) => {
        this.favdata[index] = this.item2[index];
        this.nativeStorage.setItem('boobs', JSON.stringify(this.favdata));
        console.log('first time catch block');
      });


  }


  unfavroite(index)
  {
this.nativeStorage.getItem('boobs').then((res)=>{


  this.favdata[index]=null;
  this.nativeStorage.setItem('boobs', JSON.stringify(this.favdata)).then((res)=>{

    console.log(JSON.parse(res));
  });


})

  }

















}
