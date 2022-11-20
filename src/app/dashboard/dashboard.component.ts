import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
  
  import { initializeApp } from "firebase/app";
  
  import {ref, get, set, getDatabase,} from "firebase/database";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBfYPu-SuEYKz6YVe6gcA9O_Ku2185nDVE",
    authDomain: "elegance-gadget-partner.firebaseapp.com",
    projectId: "elegance-gadget-partner",
    storageBucket: "elegance-gadget-partner.appspot.com",
    messagingSenderId: "431024818502",
    appId: "1:431024818502:web:ac770e0f0cca562e493d47"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dateArray:any[] = [];
  chosendate:any;
  activeLink:any;
  all: any[] = [];
  allsales: any[] = [];
  allmovement: any[] = [];
  constructor(private route:ActivatedRoute,
              private mat: MatSnackBar) { 

  }

  ngOnInit(): void {
    this.route.data.subscribe(e=>{
      console.log(e);
      this.all = e['getall'][0];
      this.allsales = e['getall'][1];
      this.allmovement = e['getall'][2];
      e['getall'][0].forEach((f:any)=>{
        console.log(f);
        
         
          if(!this.dateArray.includes(f?.dateBrought)){
            
            this.dateArray.push(f?.dateBrought)
            
          } 
          console.log(this.dateArray);
        
      })
    })
  }
updateOnline(){
  let timestamp = new Date().getTime();
 
  for(let eachlaptop of this.all){
    let index = eachlaptop['productId'];
    
  set(ref(db, "products/"+index), eachlaptop).then((e:any)=>{
    this.mat.open(e, 'close', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })  }).catch((e:any)=>{
      this.mat.open(e, 'close', {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }) ;
    })



}

for(let eachlaptop of this.allsales){
  let index = eachlaptop['id'];
  
set(ref(db, "sales/"+index), eachlaptop).then((e:any)=>{
  this.mat.open(e, 'close', {
    horizontalPosition: 'center',
    verticalPosition: 'top'
  })  }).catch((e:any)=>{
    this.mat.open(e, 'close', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    }) ;
  })



}

for(let eachlaptop of this.allmovement){
  let index = eachlaptop['id'];
  
set(ref(db, "movement/"+index), eachlaptop).then((e:any)=>{
  this.mat.open(e, 'close', {
    horizontalPosition: 'center',
    verticalPosition: 'top'
  })  }).catch((e:any)=>{
    this.mat.open(e, 'close', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    }) ;
  })



}


}
}
