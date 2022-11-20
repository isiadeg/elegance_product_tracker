import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private stt: StatusService, 
    private route: ActivatedRoute) { }
 statusdata?: any[];
 productStatusArray:any[]=[];
 tagArray:any=[];
 allmodel:any[]=[]; 
 modelSummary:any={

 }
 columnsInTable:string[]=['tag', 'status', 'date'];
 ngOnInit(): void {
  this.route.parent?.paramMap.subscribe(j=>{
    console.log(j.get('date'));
    let tousedate =j.get('date');
  this.route.parent?.parent?.data.subscribe(e=>{

   
    e['getall'][0].forEach((f:any)=>{
      
    //  console.log(tousedate);
    
      if(f?.dateBrought === tousedate){






        console.log(this.modelSummary);
        if(!(Object.keys(this.modelSummary).includes(f?.model))){
          console.log(f.status.toLowerCase());
          this.modelSummary[f?.model]={
            sold: f.status=='sold'?1:0,
            onshelf: f.status=='On Shelf'?1:0,
            withsomeone: this.withi(f.status)
          }
          
        }else{
          console.log('yes');
          this.modelSummary[f?.model].
            sold=f.status=='sold'? this.modelSummary[f?.model].
            sold+1:this.modelSummary[f?.model].
            sold,
  
            this.modelSummary[f?.model].
            onshelf=f.status=='On Shelf'? this.modelSummary[f?.model].
            onshelf+1:this.modelSummary[f?.model].
            onshelf,
           // onshelf: f.status='On Shelf'?1:0,
           this.modelSummary[f?.model].
            withsomeone=this.someonecalc(f);
            //withsomeone: f.status.toLowerCase().includes("with")?1:0,
          
        }
        console.log(this.modelSummary);









       console.log(f?.tag);
        if(!this.tagArray.includes(f?.tag)){
         // console.log(`${f?.tag} => ${f?.status} `);
          this.productStatusArray.push({
            tag:f?.tag,
            status: f?.status,
            statusDate: f?.date,
            dateBrought: f?.dateBrought,
          })
          this.tagArray.push(f?.tag);
         // console.log(this.tagArray);
        } 
        console.log(this.productStatusArray);
        // this.productStatusArray = this.productStatusArray.sort((a, b):number=>{
        //   console.log(a.tag)
        //   return  parseInt(a.tag.substr(2))- parseInt(b.tag.substr(2))
        // });
        // this.productStatusArray = this.productStatusArray.sort();
      }
      
    })
    Object.keys(this.modelSummary).forEach((vv:any)=>{
      let anarray = [...this.modelSummary[vv]['withsomeone']];
     // console.log(anarray)
      if(anarray?.length > 0){
        while(anarray?.length > 0){
         
        let poped = anarray.shift();
        let sum = 1;
        while(anarray.indexOf(poped) > -1){
          anarray.splice(anarray.indexOf(poped), 1);
          sum++;
          console.log(`sum is -> ${sum}`);
        }
        this.modelSummary[vv]['people'] = this.modelSummary[vv]['people']?[...this.modelSummary[vv]['people'], {person:poped,
        number:sum}]:[{person:poped,
          number:sum}]
        }
      }
      console.log(this.modelSummary);
      this.allmodel = Object.keys(this.modelSummary);
      this.stt.status = this.productStatusArray;
    });

    
  })

});




}

withi(what:string): any{
  console.log(what);
  if(what.includes("with")){
    return [what]
  }else{
    return [];
  }
}

someonecalc(f:any)
{return f.status.toLowerCase().includes("with")?
             [...this.modelSummary[f?.model].
            withsomeone, f.status]:this.modelSummary[f?.model].
            withsomeone;
}



}
