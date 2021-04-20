import { PaginationService } from './../../service/pagination.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private af: AngularFirestore,
    public paginationService:PaginationService
  ) {

  }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;



  ngOnInit(): void {

    this.paginationService.init();

  }



  //infinite scroll
  //it will when reach 100px from bottom
  count:number=0;
  loadData(event) {
    console.log('reached at 100px distance from bottom');
    setTimeout(() => {
     this.paginationService.more();
      console.log('function fired');
      console.log(this.count++);
      event.target.complete(); // it will hide the spinner

    }, 2000);
  }






  closeModal() {
    this.modalController.dismiss();
  }

}
