import { Component } from '@angular/core';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from "ng2-image-compress";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
  
})
export class AppComponent {
  title = 'app';
  selectedImage: any;
  processedImages: any = [];
  showTitle: boolean = false;

  constructor(private imgCompressService: ImageCompressService) {

  }
  onChange(fileInput: any) {
    

    let images: Array<IImage> = [];

    
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
    

     // or you can use methods from      
     // ImageCompressService.filesToCompressedImageSource(fileInput.target.files)
    // ImageCompressService.filesArrayToCompressedImageSource()

    // let files = Array.from(fileInput.target.files);
    // ImageCompressService.filesArrayToCompressedImageSource(files).then(observableImages => {
    //   observableImages.subscribe((image) => {
    //     images.push(image);
    //   }, (error) => {
    //     console.log("Error while converting");
    //   }, () => {
           
    //             this.processedImages = images;      
    //             this.showTitle = true;          
    //   });
    // });
 
  }

}
