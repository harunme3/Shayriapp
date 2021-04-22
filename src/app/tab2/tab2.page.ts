import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  constructor(private af:AngularFirestore) {
    this.af.collection('hello');
  }

  AddDocument()
  {

    this.af.collection('hello').get()
  }
AddField()
{
  this.af.collection('hell1o').add({values:['value','hhhhh']})
}
AddCollection()
{

  this.af.collection('hello').add({values:['value']});

}


}
