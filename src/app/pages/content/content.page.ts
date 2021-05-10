import { PaginationService } from './../../service/pagination.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonInfiniteScroll } from '@ionic/angular';
import { EditorPage } from '../editor/editor.page';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import domtoimage from 'dom-to-image';
import { File } from '@ionic-native/file/ngx';
import { JSDocComment } from '@angular/compiler';
@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {

  data:any[]=[];


  constructor(
    private modalController: ModalController,
    private af: AngularFirestore,
    public paginationService:PaginationService,
    private clipboard: Clipboard,
    private nativeStorage: NativeStorage,
    private file:File,
  ) {

  }

@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
@Input() value: string;
@ViewChild('box') box:ElementRef;

  ngOnInit(): void {


  this.paginationService.init(this.value);
   console.log('value ', this.value);

  }



  async edit(item)
  {
    const modal = await this.modalController.create({
      component:EditorPage,
      componentProps:{value:item}
      });

      await modal.present();

  }

copy(item)
{
  this.clipboard.copy(item);
}













  //infinite scroll
  //it will when reach 100px from bottom
  count:number=0;
  loadData(event) {
    console.log('reached at 100px distance from bottom');
    setTimeout(() => {
     this.paginationService.more(this.value);
      console.log('function fired');
      event.target.complete(); // it will hide the spinner

    }, 2000);
  }






  closeModal() {

     this.paginationService.reset();

    this.modalController.dismiss();

  }


  favroite(index)
  {


    this.data[index]=this.paginationService.item2[index];
    console.log(this.data[index]);


   this.nativeStorage.setItem('boobs',JSON.stringify(this.data));

  }







  Save()
  {





        const options = { background: 'white', height: 845, width: 595 };
        domtoimage.toPng(this.box.nativeElement, options).then(
          (dataUrl) =>
        {
            //Initialize JSPDF
           console.log('dataUl :>> ',dataUrl);
           var link = document.createElement('a');
           link.download = 'my-image-name.png';
           link.href = dataUrl;

           link.click();

        this.writeFile(dataUrl,'xx','yy.png')

        })






  }












  public writeFile(base64Data: any, folderName: string, fileName: any) {
    let contentType = this.getContentType(base64Data);
    let DataBlob = this.base64toBlob(base64Data, contentType);
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.
    let filePath = this.file.externalRootDirectory + folderName;
    this.file.createDir( this.file.externalRootDirectory,folderName,true)

    this.file.writeFile(filePath, fileName, DataBlob, contentType).then((success) => {

      console.log("File Writed Successfully", success);
  this.file.checkFile(this.file.externalRootDirectory + folderName,fileName).then((res)=>{
    console.log('res :>> ', res);
  })


    }).catch((err) => {

      console.log("Error Occured While Writing File", err);
    })
  }





    //here is the method used to get content type of an bas64 data
    public getContentType(base64Data: any) {
      let block = base64Data.split(";");
      let contentType = block[0].split(":")[1];
      return contentType;
    }

  public base64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    let byteCharacters = atob(b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
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
      type: contentType
    });
    return blob;
  }


























}
