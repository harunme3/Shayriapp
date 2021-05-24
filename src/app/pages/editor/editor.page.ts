import { Component, ElementRef, OnInit, ViewChild ,Renderer2,NgZone, Input} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import domtoimage from 'dom-to-image';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ImagePicker ,ImagePickerOptions} from '@ionic-native/image-picker/ngx';
import { PaginationService } from './../../service/pagination.service';







@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  @ViewChild('box') box:ElementRef;
  @ViewChild('box1') box1:ElementRef;

  @Input() value: string;

  textareavalue:string="hhhhhhhh";


  constructor(
     private modalController: ModalController,
     private renderer:Renderer2,
     private zone: NgZone,
     private base64ToGallery: Base64ToGallery,
    private file:File,
    private socialSharing: SocialSharing,
    private imagePicker: ImagePicker,
    public paginationService:PaginationService,
    private toastController: ToastController

    ) {



     }

  color1="";
  color2="";
  ngOnInit() {


    this.textareavalue=this.value;
  }





  closeModal() {
    this.modalController.dismiss();
  }






  Image()
  {



 const options:ImagePickerOptions={
  maximumImagesCount:1,
  quality:90,
 }
    this.imagePicker.getPictures(options).then((res)=>{
      this.renderer.setStyle(this.box.nativeElement, 'background-image',res[0])
    }).catch(e=>console.log('err :>> ', e))
  }

Gradient(ev)
{
  this.renderer.setStyle(this.box1.nativeElement,'background-image',`linear-gradient( 135deg, ${ev} 10%, #3CD500 100%)`)
}

BackGroundColor(ev)
{
  console.log('this.color1 :>> ', ev);
  this.renderer.setStyle(this.box1.nativeElement,'background-color',ev)

}

Opacity()
{

  this.renderer.setStyle(this.box.nativeElement,'opacity','.5')
}


Share()
{

  this.socialSharing.shareViaWhatsApp('love u','','');



}




TextSize()
{

  this.renderer.setStyle(this.box1.nativeElement,' font-size','100px')
}


TextColor(ev)
{
  console.log('this.color1 :>> ', ev);
  this.renderer.setStyle(this.box1.nativeElement,'color',ev)

}


Font()
{
  this.renderer.setStyle(this.box1.nativeElement, 'font-family','Krona One')
}



TextStyle()
{
  this.renderer.setStyle(this.box1.nativeElement, 'font-style','italic')
}






saves()
{
  this.paginationService.Save(this.box.nativeElement)
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

  this.file.writeFile(filePath, fileName, DataBlob, contentType).then(async(success) => {

    console.log("File Writed Successfully", success);
    const toast = await this.toastController.create({
      message: 'Download',
      duration: 1000,
     mode:'ios',
      cssClass: 'my-custom-class',

    });
    toast.present();
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
