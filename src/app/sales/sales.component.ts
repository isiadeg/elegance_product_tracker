import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import * as DecoupledEditor from '../../build/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { MyUploadAdapter } from '../uploader';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  salesform!: FormGroup;
  productTagArray: any[] = [
    'OD1', 'OD2', 'OD3', 'OD4','OD5', 'OD6', 'OD7', 'OD8', 'OD9',
    'OD10', 'OL1', 'OL2', 'OL3', 'OHF1',
    'OHF2', 'OHF3'
  ]
  productTagObs!: Observable<any>;
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
              private http: HttpClient) { }

  ngOnInit(): void {
    this.salesform = this.fb.group({
      date: ['', [Validators.required]],
      productTag: ['', [Validators.required]],
      buyer:'',
      location: '',
      extraInfo: ''
    })
    this.salesform?.get('productTag')?.valueChanges.pipe(
      startWith(''),
      map(e=>{
        return this.filteri(e, this.productTagArray);
      })
    ).subscribe(r=>{
      let toemit = new BehaviorSubject<any>(0);
      this.productTagObs = toemit.asObservable();
      toemit.next(r);
    })

  }

  filteri(e:any, array:any[]):any[]{
    return array.filter(f=>{
      if(f.trim().toLowerCase().includes(e.trim().toLowerCase())){
        return true;
      }else{
        return false;
      }
    })

  }

  save(){
    this.http.post('http://localhost/elegance/api.php', 
    JSON.stringify({...this.salesform.value, 
                    mode: "createsales"}))
    .subscribe(e=>{
      console.log(e);
    })
  }


  onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
  this.salesform?.get('extraInfo')?.setValue(data)
  }
}
