import { NgModule,ModuleWithProviders  } from '@angular/core';
import { ImageUtilityService } from "./ImageUtilityService"
import { ImageCompressService } from "./ng2-image-compress.service"

@NgModule({
  imports: [
  ],
  providers: [ImageUtilityService,ImageCompressService ]
})
export class ImageCompressModule { 

  static forRoot(): ModuleWithProviders {
    return {
        ngModule: ImageCompressModule,
        providers: [ImageCompressService, ImageUtilityService]
    };
}
}
