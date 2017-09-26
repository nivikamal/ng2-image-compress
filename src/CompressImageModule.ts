import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeOptions } from './ResizeOptions';
import { SourceImage } from './CompressImage';
import { ImageCompressService } from './ImageCompressService';
import { ImageUtilityService } from './imageUtilityService';

@NgModule({
    imports: [
        CommonModule
    ]
})
export class ImageCompressModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ImageCompressModule,
            providers: [ImageCompressService, ImageUtilityService]
        };
    }
}
