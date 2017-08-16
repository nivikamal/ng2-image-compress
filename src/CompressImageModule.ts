import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeOptions } from './ResizeOptions';
import { SourceImage } from './CompressImage';
import { ImageCompressService } from './ImageCompressService';
import { ImageUtilityService } from './imageUtilityService';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ResizeOptions,
        SourceImage,
        ImageCompressService, ImageUtilityService
    ],
    exports: [
        ResizeOptions,
        ImageCompressService,
        ImageUtilityService
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
