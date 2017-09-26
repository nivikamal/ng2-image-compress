
# Demo-ng2-image-compress

Build and Test

# *****  Rename   Dot.angular-cli.json  to .angular-cli.json  ****

## Development server
Run 'npm install'

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.




# ng2-image-compress

ng2-image-compress

###### ng2-image-compress service is used to compress jpeg or png files on client side browser. It uses using HTML5 Canvas & File API. The compression algorithm is based on   libraries angular-image-compress, ng-image-compress and J-I-C project on github.
## Installation

To install this library, run:

```bash
$ npm install ng2-image-compress --save
```

## Consuming ng2-image-compress library

You can import ng2-image-compress in your Angular application by running:

```bash
$ npm install ng2-image-compress
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { ImageCompressService,ResizeOptions,ImageUtilityService } from 'ng2-image-compress';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ImageCompressService,ResizeOptions],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

Once your library is imported, you can use its components, directives  in your Angular application:

```xml
<!-- Example  app.component.html -->
<!-- <h2>Here are some links to help you start: </h2>
  <input id="testid" type="file" accept="image/*" multiple  ng2-image-compress  />  -->
<div> 
   <input id="inputImage" type="file" accept="image/*" (change)="onChange($event)" multiple />
  <b *ngIf="showTitle">Original Image List</b>

  <div *ngFor="let item of processedImages">
    <img src="{{item.imageDataUrl}}" height="800" width="1000">
  </div>

  <b *ngIf="showTitle" >Compressed Image List</b>
  <div *ngFor="let item of processedImages">
    <img src="{{item.compressedImage.imageDataUrl}}" height="800" width="1000">
  </div> 
</div>
```

<!-- Example  app.component.ts -->
```typescript

import { Component } from '@angular/core';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from  'ng2-image-compress';

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
    let fileList: FileList;

    let images: Array<IImage> = [];
    
    ImageCompressService.filesToCompressedImageSource(fileInput.target.files).then(observableImages => {
      observableImages.subscribe((image) => {
        images.push(image);
      }, (error) => {
        console.log("Error while converting");
      }, () => {
                this.processedImages = images;      
                this.showTitle = true;          
      });
    });

    // or you can pass File[] 
    let files =    Array.from(fileInput.target.files);

    ImageCompressService.filesArrayToCompressedImageSource(files).then(observableImages => {
      observableImages.subscribe((image) => {
        images.push(image);
      }, (error) => {
        console.log("Error while converting");
      }, () => {
                this.processedImages = images;      
                this.showTitle = true;          
      });
    });
 

  }

}

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Kamal Kumar](mailto:nivikamal@gmail.com)
