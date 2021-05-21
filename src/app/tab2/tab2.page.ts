import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import  firebase from 'firebase/app';
import { AnimationOptions } from 'ngx-lottie';
import { ContentPage } from '../pages/content/content.page';
import { DownloadPage } from '../pages/download/download.page';
import { EditorPage } from '../pages/editor/editor.page';
import { FavroitePage } from '../pages/favroite/favroite.page';
import { PaginationService } from '../service/pagination.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  data:any=[];
  color:any=[];
  flag:number=0;
  y:number=4;
  x:number=4;
  displayData:any=[];


  constructor(private af:AngularFirestore,
    private modalController: ModalController,
private androidPermissions:AndroidPermissions,
    private paginationService:PaginationService
    )
  {

  }

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;



async presentModal(item,index) {
  const modal = await this.modalController.create({
  component:ContentPage,
  componentProps: {
    value:item ,
    background_image:this.color[index]
  }
  });

  await modal.present();

}
async presentModalFavroite() {
  const modal = await this.modalController.create({
  component:FavroitePage,

  });

  await modal.present();

}

async presentModalDownload() {
  const modal = await this.modalController.create({
  component:DownloadPage,

  });

  await modal.present();

}



async edit() {
  const modal = await this.modalController.create({
  component:EditorPage
  });

  await modal.present();
}


ngOnInit(): void {
  this.data=
  [
      {
      name:'Ahmad Faraz',
      photo:'assets/poet/Ahmadfaraz.jpg',
      },
      {
      name:'Ali Zaryoun',
      photo:'assets/poet/AliZaryoun.jpg',
      },
      {
      name:'Ammar Iqbal',
      photo:'assets/poet/AmmarIqbal.jpg',
      },
      {
      name:'Anamika Amber',
      photo:'assets/poet/AnamikaAmber.jpg',
      },
      {
      name:'Anjum Rehbar',
      photo:'assets/poet/AnjumRehbar.jpg',
      },

      {
      name:'Ankita Singh',
      photo:'assets/poet/ankitasingh.jpg',
      },
      {
      name:'Ansh Pandit',
      photo:'assets/poet/Anshpandit.jpg',
      },
      {
      name:'Arunendra Kumar',
      photo:'assets/poet/ArunendraKumar.jpg',
      },
      {
      name:'Chetna Balhara',
      photo:'assets/poet/ChetnaBalhara.jpg',
      },
      {
      name:'Dr Bashir Badr',
      photo:'assets/poet/DrBashirBadr.jpg',
      },
      {
      name:'Faiz Ahmad Faiz',
      photo:'assets/poet/FaizAhmadFaiz.jpg',
      },
      {
      name:'Gulzar',
      photo:'assets/poet/Gulzar.jpg',
      },
      {
      name:'Jaun Eliya',
      photo:'assets/poet/JaunEliya.jpg',
      },
      {
      name:'Kanha Kamboj',
      photo:'assets/poet/KanhaKamboj.jpg',
      },
      {
      name:'Kumar Vishwas',
      photo:'assets/poet/KumarVishwas.jpg',
      },{
      name:'Meer Taqi Meer',
      photo:'assets/poet/MeerTaqiMeer.jpg',
      },
      {
      name:'Mirza Ghalib',
      photo:'assets/poet/MirzaGhalib.jpg',
      },
      {
      name:'Mo Imran Pratapgarhi',
      photo:'assets/poet/MohammadImranPratapgarhi.jpg',
      },
      {
      name:'Momin Khan Momin',
      photo:'assets/poet/MominKhanMomin.jpg',
      },
      {
      name:'Munawwar Rana',
      photo:'assets/poet/MunawwarRana.jpg',
      },{
      name:'Naseerturabi',
      photo:'assets/poet/Naseerturabi.jpg',
      },
      {
      name:'Nida Fazli',
      photo:'assets/poet/NidaFazli.jpg',
      },
      {
      name:'Nidhi Nagrwal',
      photo:'assets/poet/NidhiNagrwal.jpg',
      },
      {
      name:'Rahat Indori',
      photo:'assets/poet/RahatIndori.jpg',
      },
      {
      name:'Shabeena Adeeb',
      photo:'assets/poet/ShabeenaAdeeb.jpg',
      },
      {
      name:'Shakeel Azmi',
      photo:'assets/poet/ShakeelAzmi.jpg',
      },
      {
      name:'Shakeel Badayuni',
      photo:'assets/poet/Shakeelbadayuni.jpg',
      },
      {
      name:'Tahzeeb Hafi',
      photo:'assets/poet/tahzeebhafi.jpg',
      },
      {
      name:'Vabby',
      photo:'assets/poet/Vabby.jpg',
      },
      {
      name:'Waseem Barelvi',
      photo:'assets/poet/WaseemBarelvi.jpg',
      }
      ,
      {
      name:'Wasi Shah',
      photo:'assets/poet/WasiShah.jpg',
      },
      {
      name:'Yogesh Kumar',
      photo:'assets/poet/YogeshKumar.jpg',
      },
      {
      name:'Zubair Ali Tabish',
      photo:'assets/poet/ZubairAliTabish.jpg',
      },

  ]


this.color=[
'linear-gradient( 135deg, #FFF720 10%, #3CD500 100%)',
 'linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)',
 'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
 'linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)',
 'linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)',
 'linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%)',
 'linear-gradient( 135deg, #FFF6B7 10%, #F6416C 100%)',
 'linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)',
 'linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%)',
 'linear-gradient( 135deg, #F97794 10%, #623AA2 100%)',
 'linear-gradient( 135deg, #FCCF31 10%, #F55555 100%)',
 'linear-gradient( 135deg, #F761A1 10%, #8C1BAB 100%)',
 'linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)',
 'linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%)',
 'linear-gradient( 135deg, #FAD7A1 10%, #E96D71 100%)',
 'linear-gradient( 135deg, #FFD26F 10%, #3677FF 100%)',
 'linear-gradient( 135deg, #A0FE65 10%, #FA016D 100%)',
 'linear-gradient( 135deg, #FFDB01 10%, #0E197D 100%)',
 'linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)',
 'linear-gradient( 135deg, #92FFC0 10%, #002661 100%)',
 'linear-gradient( 135deg, #EEAD92 10%, #6018DC 100%)',
 'linear-gradient( 135deg, #F6CEEC 10%, #D939CD 100%)',
 'linear-gradient( 135deg, #52E5E7 10%, #130CB7 100%)',
 'linear-gradient( 135deg, #F1CA74 10%, #A64DB6 100%)',
 'linear-gradient( 135deg, #E8D07A 10%, #5312D6 100%)',
 'linear-gradient( 135deg, #EECE13 10%, #B210FF 100%)',
 'linear-gradient( 135deg, #79F1A4 10%, #0E5CAD 100%)',
 'linear-gradient( 135deg, #FDD819 10%, #E80505 100%)',
 'linear-gradient( 135deg, #FFF3B0 10%, #CA26FF 100%)',
 'linear-gradient( 135deg, #FFF5C3 10%, #9452A5 100%)',
 'linear-gradient( 135deg, #F05F57 10%, #360940 100%)',
 'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
 'linear-gradient( 135deg, #FFF886 10%, #F072B6 100%)',
 'linear-gradient( 135deg, #97ABFF 10%, #123597 100%)',
]


this.loadmoredata();




}










setColor(i)
{


  return this.color[i];


}





















searchcard(event?)
{

  this.displayData=[...this.data]
  let searchterm=event.srcElement.value;


if(!searchterm)
return;

this.displayData=this.displayData.filter((shayari)=>{
  if(searchterm)
   return shayari.toLowerCase().indexOf(searchterm.toLowerCase())>-1;

})


}





  //infinite scroll
  //it will when reach 100px from bottom
  loadData(event) {
    console.log('reached at 100px distance from bottom');
    setTimeout(() => {
      this.loadmoredata()
      console.log('function fired');
      event.target.complete(); // it will hide the spinner

    }, 10);
  }




loadmoredata()
{
  console.log('x :>> ', this.x);
  this.y=this.y+this.x;
if(this.displayData.length<=150)
{
for(this.flag;this.flag<this.y;this.flag++)
{
   this.displayData.push(this.data[this.flag])
}

}
}











}
