import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  { ImageCompressModule  } from "ng2-image-compress";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ImageCompressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
