import { EditorPage } from './../pages/editor/editor.page';
import { PaginationService } from './../service/pagination.service';

import { ContentPage } from './../pages/content/content.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import{AndroidPermissions} from '@ionic-native/android-permissions/ngx'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})



export class Tab1Page {
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

















async presentModal() {
  const modal = await this.modalController.create({
  component:ContentPage,
  componentProps: { value:'verydard' }
  });

  await modal.present();

}

async edit() {
  const modal = await this.modalController.create({
  component:EditorPage,
  componentProps: { value:'verydard' }
  });

  await modal.present();

}


ngOnInit(): void {
this.data=
['Aankhen Shayari',
'Aansu Shayari',
'Aitbaar Shayari',
'Ajnabi Shayari',
'Alone Shayari ',
'Anniversary Shayari ',
'Apnapan Shayari',
'April Fool Shayari',
'Army Shayari ',
'Arzoo Justajoo Shayari',
'Asqi',
'Attitude Shayari ',
'Bakra Eid Shayari ',
'Basant Panchami Shayari',
'Best Shayari ',
'Bewafa Shayari',
'Bhaiya Dooj Shayari ',
'Bhojpuri Shayari',
'Bhool Shayari',
'Birthday Shayari',
'Breakup Shayari ',
'Chahat Shayari',
'Chand Sitare Shayari',
"Children's Day Shayari ",
'Chocolate Day Shayari ',
'Christmas Day Shayari ',
'Computer Shayari ',
'Cool Shayari ',
'Corona Shayari ',
'Couple Shayari',
'Cute Shayari ',
'Dard Shayari',
"Daughter's Day Shayari ",
'Decent Shayari',
'Desh Bhakti Shayari ',
'Dhanteras Shayari ',
'Dhoka Shayari',
'Dil Shayari',
'Diwali Shayari',
'Dussehra Shayari ',
'Dosti Shayari ',
'Double meaning',
'Dua Shayari',
'Durga Ashtami Shayari ',
'Ehsaas Shayari',
'Eid Shayari',
'Election Shayari',
'Emotional Shayari',
"Engineer's Day Shayari ",
'English Poetry Shayari',
'Famous Shayari ',
"Farmer's Day Shayari ",
"Father's Day Shayari ",
'Festivals Shayari ',
'Flirt Shayari ',
'Fool Shayari ',
'Friendship Shayari',
'Friendship Day Shayari ',
'Funny Shayari',
'Ganesh Chaturthi Shayari',
'Get well soon Shayari',
'Gam Shayari',
'Girlfriend Boyfriend Shayari ',
'Good Evening Shayari ',
'Good Morning Shayari',
'Good Night Shayari',
'Good afternoon Shayari',
'Good luck ',
'Gudi Padwa Shayari ',
'Guru Purnima Shayari ',
'Hariyali Teej Shayari',
'Heart Touching Shayari',
'Hindi Diwas Shayari ',
'Holi Shayari',
'Hug Day Shayari',
'Independence Day Shayari ',
'Interesting Shayari ',
'Karbala Shayari',
'Karwa Chauth Shayari ',
'Kashmiri Shayari',
'Khushboo Shayari',
'Kiss Shayari',
'Kiss Day Shayari ',
'Krishna Janmashtami Shayari ',
'Love Shayari ',
'Maha Navami Shayari ',
'Maha Shivaratri Shayari',
'Mahila Sangeet Shayari ',
'Mehfil Muhabbat Shayari',
'Missing you Shayari',
"Mother's Day Shayari ",
'Motivational Shayari ',
'Muharram Shayari ',
'Nag Panchami Shayari',
'Narazgi Roothna Shayari',
'Naseeb Qismat Shayari',
'Naughty Shayari ',
'Navaratri Shayari ',
'Nazar Shayari',
'New Year Shayari ',
'Nimari Shayari ',
'Painful Shayari ',
'Phool Kaante Shayari',
'Politics Shayari',
'Positive Shayari ',
'Promise Day Shayari ',
'Propose Day Shayari ',
'Punjabi Shayari',
'Pyar Shayari',
'Rajasthani Shayari',
'Raksha Bandhan Shayari',
'Rama Navami Shayari ',
'Ramadan Shayari',
'Random Shayari',
'Relations Shayari',
'Relationship Shayari ',
'Republic Day Shayari ',
'Romantic Shayari',
'Rose Day Shayari ',
'SMS Shayari',
'Sad Shayari',
'Sardarji',
'Shaheed Diwas Shayari ',
'Sharaab Shayari',
'Sharabi Shayari ',
'Shaurya Diwas Shayari ',
'Smile Shayari ',
'Sorry Shayari',
'Tanhai Shayari',
'Taunting Shayari',
'Teachers Day Shayari ',
'Technical Shayari',
'Teddy Day Shayari ',
'Top Shayari ',
'Touching Shayari',
'Trending Shayari ',
'Tribute Shayari ',
'Truck Shayari ',
'twoLine Shayari ',
'Ultimate Shayari',
'Urdu Shayari',
"Valentine's Day Shayari ",
'Victory Shayari ',
'Vijay Diwas Shayari ',
'Viral Shayari ',
'Wedding Shayari ',
'Welcome Shayari ',
'Whatsapp Shayari',
"Women's Day Shayari",
'Yaad Shayari',
'Zakham Shayari',
'Zindagi Shayari'
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
 'linear-gradient( 135deg, #F5CBFF 10%, #C346C2 100%)',
 'linear-gradient( 135deg, #FFF720 10%, #3CD500 100%)',
 'linear-gradient( 135deg, #FF6FD8 10%, #3813C2 100%)',
 'linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)',
 'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)',
 'linear-gradient( 135deg, #C2FFD8 10%, #465EFB 100%)',
 'linear-gradient( 135deg, #FD6585 10%, #0D25B9 100%)',
 'linear-gradient( 135deg, #FD6E6A 10%, #FFC600 100%)',
 'linear-gradient( 135deg, #65FDF0 10%, #1D6FA3 100%)',
 'linear-gradient( 135deg, #6B73FF 10%, #000DFF 100%)',
 'linear-gradient( 135deg, #FF7AF5 10%, #513162 100%)',
 'linear-gradient( 135deg, #F0FF00 10%, #58CFFB 100%)',
 'linear-gradient( 135deg, #FFE985 10%, #FA742B 100%)',
 'linear-gradient( 135deg, #FFA6B7 10%, #1E2AD2 100%)',
 'linear-gradient( 135deg, #FFAA85 10%, #B3315F 100%)',
 'linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%)',
 'linear-gradient( 135deg, #FF9D6C 10%, #BB4E75 100%)',
 'linear-gradient( 135deg, #F6D242 10%, #FF52E5 100%)',
 'linear-gradient( 135deg, #69FF97 10%, #00E4FF 100%)',
 'linear-gradient( 135deg, #3B2667 10%, #BC78EC 100%)',
 'linear-gradient( 135deg, #70F570 10%, #49C628 100%)',
 'linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%)',
 'linear-gradient( 135deg, #FAB2FF 10%, #1904E5 100%)',
 'linear-gradient( 135deg, #81FFEF 10%, #F067B4 100%)',
 'linear-gradient( 135deg, #FFA8A8 10%, #FCFF00 100%)',
 'linear-gradient( 135deg, #FFCF71 10%, #2376DD 100%)',
 'linear-gradient( 135deg, #FF96F9 10%, #C32BAC 100%)',
 'linear-gradient(45deg, rgb(255, 154, 158) 0%, rgb(250, 208, 196) 99%, rgb(250, 208, 196) 100%)',
 'linear-gradient(to top, rgb(161, 140, 209) 0%, rgb(251, 194, 235) 100%)',
 'linear-gradient(to top, rgb(250, 208, 196) 0%, rgb(255, 209, 255) 100%)',
 'linear-gradient(to right, rgb(255, 236, 210) 0%, rgb(252, 182, 159) 100%)',
 'linear-gradient(to right, rgb(255, 129, 119) 0%, rgb(255, 134, 122) 0%, rgb(255, 140, 127) 21%, rgb(249, 145, 133) 52%, rgb(207, 85, 108) 78%, rgb(177, 42, 91) 100%)',
 'linear-gradient(to top, rgb(255, 154, 158) 0%, rgb(254, 207, 239) 99%, rgb(254, 207, 239) 100%)',
 'linear-gradient(120deg, rgb(246, 211, 101) 0%, rgb(253, 160, 133) 100%)',
 'linear-gradient(to top, rgb(251, 194, 235) 0%, rgb(166, 193, 238) 100%)',
 'linear-gradient(to top, rgb(253, 203, 241) 0%, rgb(253, 203, 241) 1%, rgb(230, 222, 233) 100%)',
 'linear-gradient(120deg, rgb(161, 196, 253) 0%, rgb(194, 233, 251) 100%)',
 'linear-gradient(120deg, rgb(212, 252, 121) 0%, rgb(150, 230, 161) 100%)',
 'linear-gradient(120deg, rgb(132, 250, 176) 0%, rgb(143, 211, 244) 100%)',
 'linear-gradient(to top, rgb(207, 217, 223) 0%, rgb(226, 235, 240) 100%)',
 'linear-gradient(120deg, rgb(166, 192, 254) 0%, rgb(246, 128, 132) 100%)',
 'linear-gradient(120deg, rgb(252, 203, 144) 0%, rgb(213, 126, 235) 100%)',
 'linear-gradient(120deg, rgb(224, 195, 252) 0%, rgb(142, 197, 252) 100%)',
 'linear-gradient(120deg, rgb(240, 147, 251) 0%, rgb(245, 87, 108) 100%)',
 'linear-gradient(120deg, rgb(253, 251, 251) 0%, rgb(235, 237, 238) 100%)',
 'linear-gradient(to right, rgb(79, 172, 254) 0%, rgb(0, 242, 254) 100%)',
 'linear-gradient(to right, rgb(67, 233, 123) 0%, rgb(56, 249, 215) 100%)',
 'linear-gradient(to right, rgb(250, 112, 154) 0%, rgb(254, 225, 64) 100%)',
 'linear-gradient(to top, rgb(48, 207, 208) 0%, rgb(51, 8, 103) 100%)',
 'linear-gradient(to top, rgb(168, 237, 234) 0%, rgb(254, 214, 227) 100%)',
 'linear-gradient(to top, rgb(94, 231, 223) 0%, rgb(180, 144, 202) 100%)',
 'linear-gradient(to top, rgb(210, 153, 194) 0%, rgb(254, 249, 215) 100%)',
 'linear-gradient(135deg, rgb(245, 247, 250) 0%, rgb(195, 207, 226) 100%)',
 'radial-gradient(248px at center center, rgb(22, 217, 227) 0%, rgb(48, 199, 236) 47%, rgb(70, 174, 247) 100%)',
 'linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)',
 'linear-gradient(135deg, rgb(253, 252, 251) 0%, rgb(226, 209, 195) 100%)',
 'linear-gradient(120deg, rgb(137, 247, 254) 0%, rgb(102, 166, 255) 100%)',
 'linear-gradient(to top, rgb(253, 219, 146) 0%, rgb(209, 253, 255) 100%)',
 'linear-gradient(to top, rgb(152, 144, 227) 0%, rgb(177, 244, 207) 100%)',
 'linear-gradient(to top, rgb(235, 192, 253) 0%, rgb(217, 222, 216) 100%)',
 'linear-gradient(to top, rgb(150, 251, 196) 0%, rgb(249, 245, 134) 100%)',
 'linear-gradient(rgb(42, 245, 152) 0%, rgb(0, 158, 253) 100%)',
 'linear-gradient(to top, rgb(205, 156, 242) 0%, rgb(246, 243, 255) 100%)',
 'linear-gradient(to right, rgb(228, 175, 203) 0%, rgb(184, 203, 184) 0%, rgb(184, 203, 184) 0%, rgb(226, 197, 139) 30%, rgb(194, 206, 156) 64%, rgb(126, 219, 220) 100%)',
 'linear-gradient(to right, rgb(184, 203, 184) 0%, rgb(184, 203, 184) 0%, rgb(180, 101, 218) 0%, rgb(207, 108, 201) 33%, rgb(238, 96, 156) 66%, rgb(238, 96, 156) 100%)',
 'linear-gradient(to right, rgb(106, 17, 203) 0%, rgb(37, 117, 252) 100%)',
 'linear-gradient(rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%) radial-gradient(at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.5) 50%)',
 'linear-gradient(to top, rgb(55, 236, 186) 0%, rgb(114, 175, 211) 100%)',
 'linear-gradient(to top, rgb(235, 187, 167) 0%, rgb(207, 199, 248) 100%)',
 'linear-gradient(to top, rgb(255, 241, 235) 0%, rgb(172, 224, 249) 100%)',
 'linear-gradient(to right, rgb(238, 162, 162) 0%, rgb(187, 193, 191) 19%, rgb(87, 198, 225) 42%, rgb(180, 159, 218) 79%, rgb(122, 197, 216) 100%)',
 'linear-gradient(rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%) radial-gradient(at center top, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.4) 120%)',
 'linear-gradient(to top, rgb(196, 113, 245) 0%, rgb(250, 113, 205) 100%)',
 'linear-gradient(to top, rgb(72, 198, 239) 0%, rgb(111, 134, 214) 100%)',
 'linear-gradient(to right, rgb(247, 140, 160) 0%, rgb(249, 116, 143) 19%, rgb(253, 134, 140) 60%, rgb(254, 154, 139) 100%)',
 'linear-gradient(to top, rgb(254, 173, 166) 0%, rgb(245, 239, 239) 100%)',
 'linear-gradient(to top, rgb(230, 233, 240) 0%, rgb(238, 241, 245) 100%)',
 'linear-gradient(to top, rgb(172, 203, 238) 0%, rgb(231, 240, 253) 100%)',
 'linear-gradient(-20deg, rgb(233, 222, 250) 0%, rgb(251, 252, 219) 100%)',
 'linear-gradient(to top, rgb(193, 223, 196) 0%, rgb(222, 236, 221) 100%)',
 'linear-gradient(to top, rgb(11, 163, 96) 0%, rgb(60, 186, 146) 100%)',
 'linear-gradient(to top, rgb(0, 198, 251) 0%, rgb(0, 91, 234) 100%)',
 'linear-gradient(to right, rgb(116, 235, 213) 0%, rgb(159, 172, 230) 100%)',
 'linear-gradient(to top, rgb(106, 133, 182) 0%, rgb(186, 200, 224) 100%)',
 'linear-gradient(to top, rgb(163, 189, 237) 0%, rgb(105, 145, 199) 100%)',
 'linear-gradient(to top, rgb(151, 149, 240) 0%, rgb(251, 200, 212) 100%)',
 'linear-gradient(to top, rgb(167, 166, 203) 0%, rgb(137, 137, 186) 52%, rgb(137, 137, 186) 100%)',
 'linear-gradient(to top, rgb(63, 81, 177) 0%, rgb(90, 85, 174) 13%, rgb(123, 95, 172) 25%, rgb(143, 106, 174) 38%, rgb(168, 106, 164) 50%, rgb(204, 107, 142) 62%, rgb(241, 130, 113) 75%, rgb(243, 164, 105) 87%, rgb(247, 201, 120) 100%)',
 'linear-gradient(to top, rgb(252, 197, 228) 0%, rgb(253, 163, 75) 15%, rgb(255, 120, 130) 35%, rgb(200, 105, 158) 52%, rgb(112, 70, 170) 71%, rgb(12, 29, 184) 87%, rgb(2, 15, 117) 100%)',
 'linear-gradient(to top, rgb(219, 220, 215) 0%, rgb(221, 220, 215) 24%, rgb(226, 201, 204) 30%, rgb(231, 98, 125) 46%, rgb(184, 35, 90) 59%, rgb(128, 19, 87) 71%, rgb(61, 22, 53) 84%, rgb(28, 26, 39) 100%)',
 'linear-gradient(to top, rgb(244, 59, 71) 0%, rgb(69, 58, 148) 100%)',
 'linear-gradient(to top, rgb(79, 181, 118) 0%, rgb(68, 196, 137) 30%, rgb(40, 169, 174) 46%, rgb(40, 162, 183) 59%, rgb(76, 119, 136) 71%, rgb(108, 79, 99) 86%, rgb(67, 44, 57) 100%)',
 'linear-gradient(to top, rgb(2, 80, 197) 0%, rgb(212, 63, 141) 100%)',
 'linear-gradient(to top, rgb(136, 211, 206) 0%, rgb(110, 69, 226) 100%)',
 'linear-gradient(to top, rgb(217, 175, 217) 0%, rgb(151, 217, 225) 100%)',
 'linear-gradient(to top, rgb(112, 40, 228) 0%, rgb(229, 178, 202) 100%)',
 'linear-gradient(15deg, rgb(19, 84, 122) 0%, rgb(128, 208, 199) 100%)',
 'linear-gradient(to left, rgb(189, 187, 190) 0%, rgb(157, 158, 163) 100%) radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%)',
 'linear-gradient(to top, rgb(80, 82, 133) 0%, rgb(88, 94, 146) 12%, rgb(101, 104, 159) 25%, rgb(116, 116, 176) 37%, rgb(126, 126, 187) 50%, rgb(131, 137, 199) 62%, rgb(151, 149, 212) 75%, rgb(162, 161, 220) 87%, rgb(181, 174, 228) 100%)',
 'linear-gradient(to top, rgb(255, 8, 68) 0%, rgb(255, 177, 153) 100%)',
 'linear-gradient(-180deg, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)',
 'linear-gradient(45deg, rgb(147, 165, 207) 0%, rgb(228, 239, 233) 100%)',
 'linear-gradient(to right, rgb(67, 67, 67) 0%, black 100%)',
 'linear-gradient(to top, rgb(12, 52, 131) 0%, rgb(162, 182, 223) 100%, rgb(107, 140, 206) 100%, rgb(162, 182, 223) 100%)',
 'linear-gradient(45deg, rgb(147, 165, 207) 0%, rgb(228, 239, 233) 100%)',
 'linear-gradient(to right, rgb(146, 254, 157) 0%, rgb(0, 201, 255) 100%)',
 'linear-gradient(to right, rgb(255, 117, 140) 0%, rgb(255, 126, 179) 100%)',
 'linear-gradient(to right, rgb(134, 143, 150) 0%, rgb(89, 97, 100) 100%)',
 'linear-gradient(to top, rgb(199, 144, 129) 0%, rgb(223, 165, 121) 100%)',
 'linear-gradient(45deg, rgb(139, 170, 170) 0%, rgb(174, 139, 156) 100%)',
 'linear-gradient(to right, rgb(248, 54, 0) 0%, rgb(249, 212, 35) 100%)',
 'linear-gradient(-20deg, rgb(183, 33, 255) 0%, rgb(33, 212, 253) 100%)',
 'linear-gradient(-20deg, rgb(110, 69, 226) 0%, rgb(136, 211, 206) 100%)',
 'linear-gradient(-20deg, rgb(213, 88, 200) 0%, rgb(36, 210, 146) 100%)',
 'linear-gradient(60deg, rgb(171, 236, 214) 0%, rgb(251, 237, 150) 100%)',
 'linear-gradient(to top, rgb(213, 212, 208) 0%, rgb(213, 212, 208) 1%, rgb(238, 238, 236) 31%, rgb(239, 238, 236) 75%, rgb(233, 233, 231) 100%)',
 'linear-gradient(to top, rgb(95, 114, 189) 0%, rgb(155, 35, 234) 100%)',
 'linear-gradient(to top, rgb(9, 32, 63) 0%, rgb(83, 120, 149) 100%)',
 'linear-gradient(-20deg, rgb(221, 214, 243) 0%, rgb(250, 172, 168) 100%, rgb(250, 172, 168) 100%)',
 'linear-gradient(-20deg, rgb(220, 176, 237) 0%, rgb(153, 201, 156) 100%)',
 'linear-gradient(to top, rgb(243, 231, 233) 0%, rgb(227, 238, 255) 99%, rgb(227, 238, 255) 100%)',
 'linear-gradient(to top, rgb(199, 29, 111) 0%, rgb(208, 150, 147) 100%)',
 'linear-gradient(60deg, rgb(150, 222, 218) 0%, rgb(80, 201, 195) 100%)',
 'linear-gradient(to top, rgb(247, 112, 98) 0%, rgb(254, 81, 150) 100%)',
 'linear-gradient(to top, rgb(196, 197, 199) 0%, rgb(220, 221, 223) 52%, rgb(235, 235, 235) 100%)',
 'linear-gradient(to right, rgb(168, 202, 186) 0%, rgb(93, 65, 87) 100%)',
 'linear-gradient(60deg, rgb(41, 50, 60) 0%, rgb(72, 85, 99) 100%)',
 'linear-gradient(-60deg, rgb(22, 160, 133) 0%, rgb(244, 208, 63) 100%)',
 'linear-gradient(-60deg, rgb(255, 88, 88) 0%, rgb(240, 152, 25) 100%)',
 'linear-gradient(-20deg, rgb(43, 88, 118) 0%, rgb(78, 67, 118) 100%)',
 'linear-gradient(-20deg, rgb(0, 205, 172) 0%, rgb(141, 218, 213) 100%)',
 'linear-gradient(-180deg, rgb(188, 197, 206) 0%, rgb(146, 158, 173) 98%), radial-gradient(at left top, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%)',
 'linear-gradient(to top, rgb(68, 129, 235) 0%, rgb(4, 190, 254) 100%)',
 'linear-gradient(to top, rgb(218, 212, 236) 0%, rgb(218, 212, 236) 1%, rgb(243, 231, 233) 100%)',
 'linear-gradient(45deg, rgb(135, 77, 162) 0%, rgb(196, 58, 48) 100%)',
 'linear-gradient(to top, rgb(68, 129, 235) 0%, rgb(4, 190, 254) 100%)',
 'linear-gradient(to top, rgb(232, 25, 139) 0%, rgb(199, 234, 253) 100%)',
 'radial-gradient(73% 147%, rgb(234, 223, 223) 59%, rgb(236, 226, 223) 100%) radial-gradient(91% 146%, rgba(255, 255, 255, 0.5) 47%, rgba(0, 0, 0, 0.5) 100%)',
 'linear-gradient(-20deg, rgb(247, 148, 164) 0%, rgb(253, 214, 189) 100%)',
 'linear-gradient(60deg, rgb(100, 179, 244) 0%, rgb(194, 229, 156) 100%)',
 'linear-gradient(to top, rgb(59, 65, 197) 0%, rgb(169, 129, 187) 49%, rgb(255, 200, 169) 100%)',
 'linear-gradient(to top, rgb(15, 216, 80) 0%, rgb(249, 240, 71) 100%)',
 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, rgb(224, 224, 224) 26%, rgb(239, 239, 239) 48%, rgb(217, 217, 217) 75%, rgb(188, 188, 188) 100%)',
 'linear-gradient(45deg, rgb(238, 156, 167) 0%, rgb(255, 221, 225) 100%)',
 'linear-gradient(to right, rgb(58, 181, 176) 0%, rgb(61, 153, 190) 31%, rgb(86, 49, 122) 100%)',
 'radial-gradient(at 50% 100%, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)',, 'linear-gradient(rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%)',
 'linear-gradient(to top, rgb(32, 156, 255) 0%, rgb(104, 224, 207) 100%)',
 'linear-gradient(to top, rgb(189, 194, 232) 0%, rgb(189, 194, 232) 1%, rgb(230, 222, 233) 100%)',
 'linear-gradient(to top, rgb(230, 185, 128) 0%, rgb(234, 205, 163) 100%)',
 'linear-gradient(to top, rgb(30, 60, 114) 0%, rgb(30, 60, 114) 1%, rgb(42, 82, 152) 100%)',
 'linear-gradient(to top, rgb(213, 222, 231) 0%, rgb(255, 175, 189) 0%, rgb(201, 255, 191) 100%)',
 'linear-gradient(to top, rgb(155, 225, 93) 0%, rgb(0, 227, 174) 100%)',
 'linear-gradient(to right, rgb(237, 110, 160) 0%, rgb(236, 140, 105) 100%)',
 'linear-gradient(to right, rgb(255, 195, 160) 0%, rgb(255, 175, 189) 100%)',
 'linear-gradient(to top, rgb(204, 32, 142) 0%, rgb(103, 19, 210) 100%)',
 'linear-gradient(to top, rgb(179, 255, 171) 0%, rgb(18, 255, 247) 100%)',
 'linear-gradient(rgb(213, 222, 231) 0%, rgb(232, 235, 242) 50%, rgb(226, 231, 237) 100%) linear-gradient(rgba(0, 0, 0, 0.02) 50%, rgba(255, 255, 255, 0.02) 61%, rgba(0, 0, 0, 0.02) 73%) linear-gradient(33deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)',
 'linear-gradient(-45deg, rgb(255, 199, 150) 0%, rgb(255, 107, 149) 100%)',
 'linear-gradient(to right, rgb(36, 57, 73) 0%, rgb(81, 127, 164) 100%)',
 'linear-gradient(-20deg, rgb(252, 96, 118) 0%, rgb(255, 154, 68) 100%)',
 'linear-gradient(to top, rgb(223, 233, 243) 0%, white 100%)',
 'linear-gradient(rgb(50, 50, 50) 0%, rgb(63, 63, 63) 40%, rgb(28, 28, 28) 150%) linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.25) 200%)',
 'linear-gradient(to right, rgb(0, 219, 222) 0%, rgb(252, 0, 255) 100%)',
 'linear-gradient(to right, rgb(249, 212, 35) 0%, rgb(255, 78, 80) 100%)',
 'linear-gradient(to top, rgb(80, 204, 127) 0%, rgb(245, 209, 0) 100%)',
 'linear-gradient(to right, rgb(10, 207, 254) 0%, rgb(73, 90, 255) 100%)',
 'linear-gradient(-20deg, rgb(97, 97, 97) 0%, rgb(155, 197, 195) 100%)',
 'radial-gradient(at center top, rgba(255, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0.03) 100%)',, 'linear-gradient(to top, rgba(255, 255, 255, 0.1) 0%, rgba(143, 152, 157, 0.6) 100%)',
 'linear-gradient(60deg, rgb(61, 51, 147) 0%, rgb(43, 118, 185) 37%, rgb(44, 172, 209) 65%, rgb(53, 235, 147) 100%)',
 'linear-gradient(to top, rgb(223, 137, 181) 0%, rgb(191, 217, 254) 100%)',
 'linear-gradient(to right, rgb(237, 110, 160) 0%, rgb(236, 140, 105) 100%)',
 'linear-gradient(to right, rgb(215, 210, 204) 0%, rgb(48, 67, 82) 100%)',
 'linear-gradient(to top, rgb(225, 79, 173) 0%, rgb(249, 212, 35) 100%)',
 'linear-gradient(to top, rgb(178, 36, 239) 0%, rgb(117, 121, 255) 100%)',
 'linear-gradient(to right, rgb(193, 193, 97) 0%, rgb(193, 193, 97) 0%, rgb(212, 212, 177) 100%)',
 'linear-gradient(to right, rgb(236, 119, 171) 0%, rgb(120, 115, 245) 100%)',
 'linear-gradient(to top, rgb(0, 122, 223) 0%, rgb(0, 236, 188) 100%)',
 'linear-gradient(-225deg, rgb(32, 226, 215) 0%, rgb(249, 254, 165) 100%)',
 'linear-gradient(-225deg, rgb(44, 216, 213) 0%, rgb(197, 193, 255) 56%, rgb(255, 186, 195) 100%)',
 'linear-gradient(-225deg, rgb(44, 216, 213) 0%, rgb(107, 141, 214) 48%, rgb(142, 55, 215) 100%)',
 'linear-gradient(-225deg, rgb(223, 255, 205) 0%, rgb(144, 249, 196) 48%, rgb(57, 243, 187) 100%)',
 'linear-gradient(-225deg, rgb(93, 159, 255) 0%, rgb(184, 220, 255) 48%, rgb(107, 187, 255) 100%)',
 'linear-gradient(-225deg, rgb(168, 191, 255) 0%, rgb(136, 77, 128) 100%)',
 'linear-gradient(-225deg, rgb(82, 113, 196) 0%, rgb(177, 159, 255) 48%, rgb(236, 161, 254) 100%)',
 'linear-gradient(-225deg, rgb(255, 226, 159) 0%, rgb(255, 169, 159) 48%, rgb(255, 113, 154) 100%)',
 'linear-gradient(-225deg, rgb(34, 225, 255) 0%, rgb(29, 143, 225) 48%, rgb(98, 94, 177) 100%)',
 'linear-gradient(-225deg, rgb(182, 206, 232) 0%, rgb(245, 120, 220) 100%)',
 'linear-gradient(-225deg, rgb(255, 254, 255) 0%, rgb(215, 255, 254) 100%)',
 'linear-gradient(-225deg, rgb(227, 253, 245) 0%, rgb(255, 230, 250) 100%)',
 'linear-gradient(-225deg, rgb(125, 226, 252) 0%, rgb(185, 182, 229) 100%)',
 'linear-gradient(-225deg, rgb(203, 186, 204) 0%, rgb(37, 128, 179) 100%)',
 'linear-gradient(-225deg, rgb(183, 248, 219) 0%, rgb(80, 167, 194) 100%)',
 'linear-gradient(-225deg, rgb(112, 133, 182) 0%, rgb(135, 167, 217) 50%, rgb(222, 243, 248) 100%)',
 'linear-gradient(-225deg, rgb(119, 255, 210) 0%, rgb(98, 151, 219) 48%, rgb(30, 236, 255) 100%)',
 'linear-gradient(-225deg, rgb(172, 50, 228) 0%, rgb(121, 24, 242) 48%, rgb(72, 1, 255) 100%)',
 'linear-gradient(-225deg, rgb(212, 255, 236) 0%, rgb(87, 242, 204) 48%, rgb(69, 150, 251) 100%)',
 'linear-gradient(-225deg, rgb(158, 251, 211) 0%, rgb(87, 233, 242) 48%, rgb(69, 212, 251) 100%)',
 'linear-gradient(-225deg, rgb(71, 59, 123) 0%, rgb(53, 132, 167) 51%, rgb(48, 210, 190) 100%)',
 'linear-gradient(-225deg, rgb(101, 55, 155) 0%, rgb(136, 106, 234) 53%, rgb(100, 87, 198) 100%)',
 'linear-gradient(-225deg, rgb(164, 69, 178) 0%, rgb(212, 24, 114) 52%, rgb(255, 0, 102) 100%)',
 'linear-gradient(-225deg, rgb(119, 66, 178) 0%, rgb(241, 128, 255) 52%, rgb(253, 139, 217) 100%)',
 'linear-gradient(-225deg, rgb(255, 60, 172) 0%, rgb(86, 43, 124) 52%, rgb(43, 134, 197) 100%)',
 'linear-gradient(-225deg, rgb(255, 5, 124) 0%, rgb(141, 11, 147) 50%, rgb(50, 21, 117) 100%)',
 'linear-gradient(-225deg, rgb(255, 5, 124) 0%, rgb(124, 100, 213) 48%, rgb(76, 195, 255) 100%)',
 'linear-gradient(-225deg, rgb(105, 234, 203) 0%, rgb(234, 204, 248) 48%, rgb(102, 84, 241) 100%)',
 'linear-gradient(-225deg, rgb(35, 21, 87) 0%, rgb(68, 16, 122) 29%, rgb(255, 19, 97) 67%, rgb(255, 248, 0) 100%)',
 'linear-gradient(-225deg, rgb(61, 78, 129) 0%, rgb(87, 83, 201) 48%, rgb(110, 127, 243) 100%)',







]


this.loadmoredata();




}



permission()

{
  let list: string[] = [
    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
  ];

  this.androidPermissions
    .checkPermission(
      this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
    )
    .then((res) => {
      console.log("permission garnteed")
       if(!res.hasPermission)
       {
        this.androidPermissions.requestPermissions(list);

       }//

    },err=>{
      console.log("no permission error")
      this.androidPermissions.requestPermissions(list);

    });
}


// lottieConfig: AnimationOptions = {
//     path: `../../assets/animation/1 (11).json`

// }




setColor(i)
{

// this.lottieConfig={
//   ...this.lottieConfig,
//     path: `../../assets/animation/1 (${i}).json`

// }
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

    }, 100);
  }




loadmoredata()
{
  console.log('x :>> ', this.x);
  this.y=this.y+this.x;
if(this.displayData.length<=140)
{
for(this.flag;this.flag<this.y;this.flag++)
{
   this.displayData.push(this.data[this.flag])
}
}
}









}
