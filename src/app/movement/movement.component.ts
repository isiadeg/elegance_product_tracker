import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import * as DecoupledEditor from '../../build/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { MyUploadAdapter } from '../uploader';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent implements OnInit {
  disablesave:boolean =  false;
  returnedmessage:any = "";
  pMovement!: FormGroup
  typeArray: any[]= ['Collect', 'Returned', 'Repair', 'Brought'];
  typeArrayObs?:Observable<any>;
  productType: any[] = ['Laptop', 'Charger']
  productTypeObs?: Observable<any>
  
  personName: any[] = ['Abu Uwaiz', 'Abu Faridat', 
'Engineer Ismail', 'Abu Fauziyat',
'Ola Smooth'];
personNameObs?:Observable<any>;
productTagArray:any[] =[
  'OD1', 'OD2', 'OD3', 'OD4','OD5', 'OD6', 'OD7', 'OD8', 'OD9',
  'OD10', 'OL1', 'OL2', 'OL3', 'OHF1',
  'OHF2', 'OHF3'
]
productTagArrayObs?:Observable<any>

purpose: any[] = ['Marketing', 'Repair']
purposeObs?: Observable<any>;
public Editor = DecoupledEditor;

  public onReady( editor:any ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
      editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader:any ) => {
        return new MyUploadAdapter( loader );
    };
  }
  
  constructor(private fb: FormBuilder,
              private http:HttpClient, 
              private mat: MatSnackBar) { }

  ngOnInit(): void {
    this.pMovement = this.fb.group({
      movementType: '',
      date: '',
      productTag: '',
      productType: '',
      personName: '',
      purpose: '',
      extraInfo: ''
    })

    this.pMovement.get('movementType')?.valueChanges.pipe(
      startWith(''),
      map(e=>{
        return this.typeArray.filter(f=>{
          if(f.toLowerCase().trim().includes(e.toLowerCase().trim())){
            return true
          }else{return false}
        })
      })
    ).subscribe(e=>{
      let toemit = new BehaviorSubject<any>(0);
    this.typeArrayObs= toemit.asObservable()
    toemit.next(e); 
    })


    
  this.pMovement.get('productTag')?.valueChanges.pipe(
    startWith(''),
    map(e=>{
      return this.productTagArray.filter(f=>{
        if(f.toLowerCase().trim().includes(e.toLowerCase().trim())){
          return true;
        }else{
          return false;
        }})
      })
    ).subscribe(e=>{
      let toemit = new BehaviorSubject<any>(0);
      this.productTagArrayObs = toemit.asObservable();
      toemit.next(e);
    })


    this.pMovement.get('productType')?.valueChanges.pipe(
      startWith(''),
      map(e=>{
        return this.productType.filter(f=>{
          if(f.toLowerCase().trim().includes(e.toLowerCase().trim())){
            return true;
          }else{
            return false;
          }})
        })
      ).subscribe(e=>{
        let toemit = new BehaviorSubject<any>(0);
        this.productTypeObs = toemit.asObservable();
        toemit.next(e);
      })


      
    this.pMovement.get('personName')?.valueChanges.pipe(
      startWith(''),
      map(e=>{
        return this.personName.filter(f=>{
          if(f.toLowerCase().trim().includes(e.toLowerCase().trim())){
            return true;
          }else{
            return false;
          }})
        })
      ).subscribe(e=>{
        let toemit = new BehaviorSubject<any>(0);
        this.personNameObs = toemit.asObservable();
        toemit.next(e);
      })

      this.pMovement.get('purpose')?.valueChanges.pipe(
        startWith(''),
        map(e=>{
          return this.purpose.filter(f=>{
            if(f.toLowerCase().trim().includes(e.toLowerCase().trim())){
              return true;
            }else{
              return false;
            }})
          })
        ).subscribe(e=>{
          let toemit = new BehaviorSubject<any>(0);
          this.purposeObs = toemit.asObservable();
          toemit.next(e);
        })
  
  }


  save(){
    this.disablesave=true;
    console.log(this.pMovement.value);
    this.http.post('http://localhost/elegance/api.php', JSON.stringify({
      ...this.pMovement.value,
      ...{mode: 'createMovement'}
    }), /*{
      headers: new HttpHeaders({
        'Content-Type': "application/json"
      })
    }*/).subscribe((e:any)=>{
      this.disablesave=false;
      this.returnedmessage = e.message;
     // console.log(e)
     this.mat.open(this.returnedmessage, 'close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000

     }
      )
    })
    
  }

  closeMessage(){
    this.returnedmessage = !this.returnedmessage;
  }

  
onChange( { editor }: ChangeEvent ) {
  const data = editor.getData();
this.pMovement?.get('extraInfo')?.setValue(encodeURIComponent(data))
}
sendOnline(){
  this.disablesave=true;
  let timestamp = new Date().getTime()
  set(ref(db, "movement"+timestamp),{
  ...this.pMovement.value,
  ...{mode: 'createMovement'}
}).then((e:any)=>{
  this.mat.open(e, 'close', {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 5000

   });
   this.disablesave=true;
}).catch((e:any)=>{
  this.mat.open(e, 'close', {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 5000

   });
   this.disablesave=true;
})
}
}
