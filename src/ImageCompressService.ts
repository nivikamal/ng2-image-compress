import { Component } from '@angular/core';
import { ResizeOptions } from "./ResizeOptions"
import { SourceImage, IImage } from "./CompressImage";
import { ImageUtilityService } from "./imageUtilityService";
import { Observable } from "rxjs/Observable"
import { Observer } from "rxjs/Observer"

export class ImageCompressService {

    /**
     * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
     * @param {Image} sourceImgObj The source Image Object
     * @param {Integer} quality The output quality of Image Object
     * @return {Image} result_image_obj The compressed Image Object
     */

    private static jicCompress(sourceImgObj, options: ResizeOptions) {
        var outputFormat = options.Resize_Type;
        var quality = options.Resize_Quality || 50;
        var mimeType = 'image/jpeg';
        if (outputFormat !== undefined && outputFormat === 'png') {
            mimeType = 'image/png';
        }


        var maxHeight = options.Resize_Max_Height || 300;
        var maxWidth = options.Resize_Max_Width || 250;

        console.log('MAX Width n Height');
        console.log(options.Resize_Max_Height);
        console.log(options.Resize_Max_Width);
        console.log('Quality');
        console.log(quality);

        var height = sourceImgObj.height;
        var width = sourceImgObj.width;

        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > maxWidth) {
                height = Math.round(height *= maxWidth / width);
                width = maxWidth;
            }
        }
        else {
            if (height > maxHeight) {
                width = Math.round(width *= maxHeight / height);
                height = maxHeight;
            }
        }
        console.log('CVS Width n Height');
        console.log(width);
        console.log(height);
        console.log('Quality');
        console.log(quality);

        var cvs = document.createElement('canvas');
        cvs.width = width;
        cvs.height = height;
        var ctx = cvs.getContext('2d').drawImage(sourceImgObj, 0, 0, width, height);
        var newImageData = cvs.toDataURL(mimeType, quality / 100);
        var resultImageObj = new Image();
        resultImageObj.src = newImageData;
        return resultImageObj.src;
    }

    // private resizeImage(origImage, options: ResizeOptions) {
    //     var maxHeight = options.Resize_Max_Height || 300;
    //     var maxWidth = options.Resize_Max_Width || 250;
    //     var quality = (options.Resize_Quality / 100.0) || 0.7;
    //     var type = options.Resize_Type || 'image/jpg';

    //     var canvas = this.getResizeArea();

    //     var height = origImage.height;
    //     var width = origImage.width;

    //     // calculate the width and height, constraining the proportions
    //     if (width > height) {
    //         if (width > maxWidth) {
    //             height = Math.round(height *= maxWidth / width);
    //             width = maxWidth;
    //         }
    //     }
    //     else {
    //         if (height > maxHeight) {
    //             width = Math.round(width *= maxHeight / height);
    //             height = maxHeight;
    //         }
    //     }

    //     canvas.width = width;
    //     canvas.height = height;

    //     //draw image on canvas
    //     var ctx = canvas.getContext('2d');
    //     ctx.drawImage(origImage, 0, 0, width, height);

    //     // get the data from canvas as 70% jpg (or specified type).
    //     return canvas.toDataURL(type, quality);
    // }

    // private getResizeArea(): HTMLCanvasElement {
    //     let resizeAreaId = 'fileupload-resize-area';
    //     let resizeArea = <HTMLCanvasElement>document.getElementById(resizeAreaId);
    //     if (!resizeArea) {
    //         resizeArea = document.createElement('canvas');
    //         resizeArea.id = resizeAreaId;
    //         resizeArea.style.visibility = 'hidden';
    //         document.body.appendChild(resizeArea);
    //     }
    //     return resizeArea;
    // };

    public static compressImage(sourceImage: IImage, options: ResizeOptions, callback) {
        let that = this;
        ImageUtilityService.createImage(sourceImage.imageDataUrl, function (image) {
            var dataURLcompressed = that.jicCompress(image, options);
            sourceImage.compressedImage = {
                fileName: sourceImage.fileName,
                imageObjectUrl: "",
                imageDataUrl: dataURLcompressed,
                type: dataURLcompressed.match(/:(.+\/.+);/)[1],
                compressedImage: null
            };
            callback(sourceImage);
        });
    }

    public static filesToCompressedImageSourceEx(fileList: FileList, option: ResizeOptions): Promise<Observable<IImage>> {

        return new Promise<Observable<IImage>>((resolve, reject) => {
            let count = fileList.length;
            let observer = ImageUtilityService.filesToSourceImages(fileList);
            let images: Array<IImage> = [];
            observer.subscribe((image) => {
                images.push(image);
                if (option == null) {
                    option = new ResizeOptions();
                }
                ImageCompressService.compressImage(image, option, (imageRef) => {
                    if (--count == 0) {
                        resolve(Observable.from(images));
                    }
                });
            }, (error) => {
                reject("Error while compressing images");
            })
        });
    }

    public static filesToCompressedImageSource(fileList: FileList): Promise<Observable<IImage>> {


        return new Promise<Observable<IImage>>((resolve, reject) => {
            let count = fileList.length;
            let observer = ImageUtilityService.filesToSourceImages(fileList);
            let images: Array<IImage> = [];
            observer.subscribe((image) => {
                images.push(image);

                ImageCompressService.compressImage(image, new ResizeOptions(), (imageRef) => {
                    if (--count == 0) {
                        resolve(Observable.from(images));
                    }
                });
            }, (error) => {
                reject("Error while compressing images");
            })
        });
    }

    public static filesArrayToCompressedImageSourceEx(fileList: File[], option: ResizeOptions): Promise<Observable<IImage>> {

        return new Promise<Observable<IImage>>((resolve, reject) => {
            let count = fileList.length;
            let observer = ImageUtilityService.filesArrayToSourceImages(fileList);
            let images: Array<IImage> = [];
            observer.subscribe((image) => {
                images.push(image);
                if (option == null) {
                    option = new ResizeOptions();
                }
                ImageCompressService.compressImage(image, option, (imageRef) => {
                    if (--count == 0) {
                        resolve(Observable.from(images));
                    }
                });
            }, (error) => {
                reject("Error while compressing images");
            })
        });
    }
    public static filesArrayToCompressedImageSource(fileList: File[]): Promise<Observable<IImage>> {

        return new Promise<Observable<IImage>>((resolve, reject) => {
            let count = fileList.length;
            let observer = ImageUtilityService.filesArrayToSourceImages(fileList);
            let images: Array<IImage> = [];
            observer.subscribe((image) => {
                images.push(image);
                ImageCompressService.compressImage(image, new ResizeOptions(), (imageRef) => {
                    if (--count == 0) {
                        resolve(Observable.from(images));
                    }
                });
            }, (error) => {
                reject("Error while compressing images");
            })
        });
    }

    public static IImageListToCompressedImageSource(images: IImage[]): Promise<IImage[]> {

        return new Promise<IImage[]>((resolve, reject) => {
            let count = images.length;
            images.forEach(image => {
                ImageCompressService.compressImage(image, new ResizeOptions(), (imageRef) => {
                    console.log(image);
                    if (--count == 0) {
                        resolve(images);
                    }
                });
            });

        });
    }

    public static IImageListToCompressedImageSourceEx(images: IImage[], resizeOption: ResizeOptions): Promise<IImage[]> {
        return new Promise<IImage[]>((resolve, reject) => {
            let count = images.length;
            images.forEach(image => {
                if (resizeOption == null) {
                    resizeOption = new ResizeOptions();
                }
                ImageCompressService.compressImage(image, resizeOption, (imageRef) => {
                    console.log(image);
                    if (--count == 0) {
                        resolve(images);
                    }
                });
            });

        });
    }

}
