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
    private menuController: MenuController,
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


items:any;
item2:any=[];


hello() {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.

  this.af.collection('dard').get().subscribe((res)=>{


    res.docs.forEach(snap=>{

      this.items=snap.data();
      console.log(this.items.field1.length)
      this.items.field1.forEach(element => {
       console.log('element :>> ', element);
       this.item2.push(element)
      });


    })
  })



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
