import { Component } from '@angular/core';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from "ng2-image-compress";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng2-imagecompress-app';
  
  selectedImage: any;
  processedImages: any = [];
  showTitle: boolean = false;

  onChange(fileInput: any) {
    let files = [];

    let images: Array<IImage> = [];

    files =    Array.from(fileInput.target.files);
    let _files: File[];
    let count = fileInput.target.files.length;
    let observer = ImageUtilityService.filesToSourceImages(fileInput.target.files);     
    observer.subscribe((image) => {
        images.push(image);         
    },null,()=>{
      console.log(images)      
      ImageCompressService.IImageListToCompressedImageSource(images).then(imagesResult=>{
        this.processedImages = imagesResult;  
      })
    }); 
  
}
}