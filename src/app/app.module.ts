import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import { AppComponent } from './app.component';
import { Route, Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {IndexComponent} from "./index/index.component";
import { RetrieveResolver } from './retrieve.resolver';
import { FffInterceptor } from './fff.interceptor';
import { AnotherInterceptor } from './another.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from './material-module/material-module.module';
import { MovementComponent } from './movement/movement.component';
import {UserComponent} from "./user/user.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScreenComponent } from './screen/screen.component';
import { SummaryComponent } from './summary/summary.component';
import { ProducttablesComponent } from './producttables/producttables.component';
import { ProductmovementComponent } from './productmovement/productmovement.component';
import { ProductfaultsComponent } from './productfaults/productfaults.component';
import { ProductsalesComponent } from './productsales/productsales.component';
import { ProductResolver } from './product.resolver';
import { SalesComponent } from './sales/sales.component';
import { FaultyComponent } from './faulty/faulty.component';
import { DailyCountComponent } from './daily-count/daily-count.component';
import { TouseforcountService } from './touseforcount.service';
import { StatusComponent } from './status/status.component';
import { ExampleFormComponent } from './example-form/example-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
const appRoutes:Routes =[{
  path: 'index',  component: IndexComponent, /*resolve: {
    resdata: RetrieveResolver
  }*/
},
{
  path: 'product-movement', component: MovementComponent
},
{
path: "sales", component: SalesComponent
},
{
  path: 'product-dashboard', component: DashboardComponent,
  resolve: {getall: ProductResolver},
  children:[
    {
      path:'date/:date', component: ScreenComponent,
      children:[
        {
          path: "summary", component: SummaryComponent
        },
        {
          path: "product-status", component: StatusComponent,
  
        },
        {
          path: "product-features", component: ProducttablesComponent,
  
        },
        
        // {
        //   path: '', redirectTo:"summary", pathMatch: "full"
        // }
      ]
    }
  ]
},
{
  path: "faulty", component: FaultyComponent
},{
path: "daily_count", component: DailyCountComponent,
resolve:{tousemodel: TouseforcountService}
},

{
  path: '', redirectTo: "/index", pathMatch: 'full'
},{
path: '**', component: PagenotfoundComponent
}]

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    IndexComponent,
    MovementComponent,
    UserComponent,
    DashboardComponent,
    ScreenComponent,
    SummaryComponent,
    ProducttablesComponent,
    ProductmovementComponent,
    ProductfaultsComponent,
    ProductsalesComponent,
    SalesComponent,
    FaultyComponent,
    DailyCountComponent,
    StatusComponent,
    ExampleFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModuleModule,
    CKEditorModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: FffInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AnotherInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
