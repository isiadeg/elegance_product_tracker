import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//import { Observable } from '@firebase/util';
import { BehaviorSubject, map, startWith, Observable } from 'rxjs';


@Component({
  selector: 'app-daily-count',
  templateUrl: './daily-count.component.html',
  styleUrls: ['./daily-count.component.css']
})
export class DailyCountComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private fb:FormBuilder, private http: HttpClient) { }
  touse:any;
  tousearray?:Observable<any>;
  datei:any
  
  dailyform!:FormGroup;
  get collectionsi():FormArray{
    return this.dailyform.get('collections') as FormArray
  }
  ngOnInit(): void {
   
    this.route.data.subscribe(e =>{
      this.touse = e['tousemodel']
    })
    console.log(this.touse);
    this.dailyform = this.fb.group({
      collections: this.fb.array([this.firstcollection()])
    });
    this.collectionsi.controls.forEach((C, index)=>{
      console.log(index)
      C.get('model')?.valueChanges.pipe(
        startWith(''),
        map(d=>{
          let ta = this.touse;
        return ta.filter((e:any)=>{
            if(e.toLowerCase().trim() .includes(d.toLowerCase().trim())){
              return true;
            }else{
              return false;
            }
          })
        })
      ).subscribe(f=>{
        let g = new BehaviorSubject<any>(0);
        this.tousearray = g.asObservable();
        g.next(f)
      }
        
      )
    })
  }
  firstcollection():FormGroup<any>{
    return this.fb.group({
      model: '',
      number: '',
      date: ''
    })
  }

  addToCollection()
  {
   this.collectionsi.push(this.firstcollection()); 
   this.collectionsi.controls[this.collectionsi.controls.length-1].get('date')?.setValue(
    this.collectionsi.controls[this.collectionsi.controls.length-2].get('date')?.value
   )
   this.collectionsi.controls.forEach((C, index)=>{
    console.log(index)
    C.get('model')?.valueChanges.pipe(
      startWith(''),
      map(d=>{
        let ta = this.touse;
      return ta.filter((e:any)=>{
          if(e.toLowerCase().trim() .includes(d.toLowerCase().trim())){
            return true;
          }else{
            return false;
          }
        })
      })
    ).subscribe(f=>{
      let g = new BehaviorSubject<any>(0);
      this.tousearray = g.asObservable();
      g.next(f)
    }
      
    )
  })
  }
  removeFromCollection(index:any){
    this.collectionsi.removeAt(index);

  }
  cons(){
    console.log(this.dailyform.value.collections);
  }
  save(){
    this.http.post("http://localhost/elegance/api.php", JSON.stringify({...this.dailyform.value, mode: "create_dailycount"})).subscribe(e=>{
      console.log(e);
    });
  }
}
