import { PaginationService } from './../../service/pagination.service';
import { Component, ElementRef, Input, OnInit, ViewChild, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonInfiniteScroll } from '@ionic/angular';
import { EditorPage } from '../editor/editor.page';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import domtoimage from 'dom-to-image';
import { File } from '@ionic-native/file/ngx';

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
    private renderer:Renderer2,
    private toastController: ToastController
  ) {

  }

@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
@Input() value: string;
@Input() background_image: string;


@ViewChildren('box') box:QueryList<ElementRef>








saves(i)
{

this.paginationService.Save(this.box.get(i).nativeElement)
}











changeBackground(event,i)
{

  console.log('event :>> ', event);
  this.renderer.setStyle(this.box.get(i).nativeElement,' background-image',"url('../../../assets/images/paint.png')")


}







  ngOnInit(): void {


  this.paginationService.init(this.value);
   console.log('value ', this.value);

  }






  setColor(i)
  {





  }


  async edit(item)
  {
    const modal = await this.modalController.create({
      component:EditorPage,
      componentProps:{value:item}
      });

      await modal.present();

  }

async copy(item)
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
    this.paginationService.ismodalopen=false;
     this.paginationService.reset();
    this.modalController.dismiss();

  }


  favroite(index)
  {


    this.data[index]=this.paginationService.item2[index];
    console.log(this.data[index]);


   this.nativeStorage.setItem('boobs',JSON.stringify(this.data));

  }










  commonshare(i)
  {
this.paginationService.commonshare(this.box.get(i).nativeElement)
  }

  whatsAppSharecard(i)
  {
    this.paginationService.whatsAppSharecard(this.box.get(i).nativeElement)
  }















}
