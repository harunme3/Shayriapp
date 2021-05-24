import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PaginationService } from 'src/app/service/pagination.service';
import { EditorPage } from '../editor/editor.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-favroite',
  templateUrl: './favroite.page.html',
  styleUrls: ['./favroite.page.scss'],
})
export class FavroitePage implements OnInit {





  flag:number=0;
  y:number=4;
  x:number=10;
  displayData:any=[];

  constructor(
    private modalController: ModalController,
    private af: AngularFirestore,
    public paginationService:PaginationService,
    private nativeStorage: NativeStorage
  ) {

  }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChildren('box') box:QueryList<ElementRef>





  saves(i)
{
  this.paginationService.Save(this.box.get(i).nativeElement)
}




  ngOnInit(): void {

    this.nativeStorage.getItem('boobs').then((res)=>{
      console.log(JSON.parse(res));

    }).catch((e)=>{
      console.log(e);
    })

    this.loadmoredata();


  }



  async edit(item)
  {
    const modal = await this.modalController.create({
      component:EditorPage,
      componentProps:{value:item}
      });

      await modal.present();

  }














  //infinite scroll
  //it will when reach 100px from bottom
  loadData(event) {

    console.log('reached at 100px distance from bottom');
    setTimeout(() => {
      this.loadmoredata()
      console.log('function fired');
      event.target.complete(); // it will hide the spinner

    }, 2000);
  }



  loadmoredata()
{

// this.y=this.y+this.x;
// if(this.displayData.length<=this.data.length)
// {
// for(this.flag;this.flag<this.y;this.flag++)
// {
//    this.displayData.push(this.data[this.flag])
// }

// }

}





  closeModal() {

    this.modalController.dismiss();

  }

}
