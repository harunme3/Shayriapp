import { PaginationService } from './../service/pagination.service';

import { ContentPage } from './../pages/content/content.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})



export class Tab1Page {
data:any=[];
  constructor(private af:AngularFirestore,
    private modalController: ModalController,

    private paginationService:PaginationService
    )
  {

  }



async presentModal() {
  const modal = await this.modalController.create({
  component:ContentPage,
  componentProps: { value: 123 }
  });

  await modal.present();

}




ngOnInit(): void {
  this.data=["Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday","Sunday", "Monday",
   "Tuesday", "Wednesday", "Thursday", "Friday",
   "Saturday","Sunday", "Monday", "Tuesday", "Wednesday",
   "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday",
   "Wednesday", "Thursday", "Friday", "Saturday"] ;
}





//search







dummydata()
{
  this.data=["Sunday", "Monday", "Tuesday", "Wednesday",
   "Thursday", "Friday", "Saturday","Sunday", "Monday",
    "Tuesday", "Wednesday", "Thursday", "Friday",
    "Saturday","Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"] ;
}

searchcard(event?)
{

  this.dummydata();
  let searchterm=event.srcElement.value;
if(!searchterm)
return;

this.data=this.data.filter((shayari)=>{

  if(searchterm)
   return shayari.toLowerCase().indexOf(searchterm.toLowerCase())>-1;

})


}

}
