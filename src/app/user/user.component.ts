import { Component, OnInit } from '@angular/core';
import * as DecoupledEditor from '../../build/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { MyUploadAdapter } from '../uploader';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ProgressBarMode } from '@angular/material/progress-bar';

const storage = getStorage();

// Create the file metadata


// Upload file and metadata to the object 'images/mountains.jpg'


@Component({
  selector: 'app-user',
  template: '<div></div>',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

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
  

  progressbar:boolean =false;
  progressmode:ProgressBarMode = "query";
  progressvalue:number=0;
  successfulUpload:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  upload(){
    this.progressbar = true;
    this.successfulUpload = false;
    let files = document.getElementsByTagName("input")[0].files || undefined;
    if(files){
    for(let i = 0; i<files.length; i++){
      let file = files[i];
    const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    this.progressmode = "determinate";
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    this.progressvalue = progress;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    this.progressbar = false;
    this.successfulUpload = true;
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);


  }
}
}

onChange( { editor }: ChangeEvent ) {
  const data = editor.getData();

  console.log( data );
}

}
