import { NgModule } from '@angular/core';
import { ImageUtilityService } from "./imageutilityservice"
import { ImageCompressService } from "./ng2-image-compress.service"

@NgModule({
  imports: [
  ],
  providers: [ImageUtilityService,ImageCompressService ]
})
export class ImageCompressModule { 


}
