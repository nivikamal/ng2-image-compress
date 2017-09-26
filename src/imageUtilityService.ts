import { SourceImage, IImage } from "./CompressImage";
import { ResizeOptions } from "./ResizeOptions";
import { ImageCompressService } from "./ImageCompressService"
import { Observable, Observer } from "rxjs"

export class ImageUtilityService {

    public static createImage(url, callback) {
        var image = new Image();
        image.onload = () => {
            callback(image);
        };
        image.src = url;
    }

    public static fileToDataURL(file): Promise<any> {
        return new Promise<any>((resolve) => {
            let reader = new FileReader();
            reader.onload = function (e: any) {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    }

    public static filesToSourceImages(fileList: FileList): Observable<IImage> {

        return Observable.create((observer: Observer<IImage>) => {
            let total = fileList.length;
            Array.from(fileList).forEach(fileItem => {
                let imageResult: IImage = new SourceImage();
                console.log(fileItem.name);
                
                imageResult.fileName = fileItem.name;
                imageResult.type = fileItem.type;
                imageResult.imageObjectUrl = URL.createObjectURL(fileItem);
                ImageUtilityService.fileToDataURL(fileItem).then((result) => {
                    imageResult.imageDataUrl = result;
                    observer.next(imageResult);
                    if (--total === 0)
                        observer.complete();
                });
            });
        });
    }

    public static filesArrayToSourceImages(fileList: File[]): Observable<IImage> {

        return Observable.create((observer: Observer<IImage>) => {
            let total = fileList.length;
            fileList.forEach(fileItem => {
                let imageResult: IImage = new SourceImage();
                console.log(fileItem.name);
                // imageResult.fileName = fileItem.name;
                imageResult.imageObjectUrl = URL.createObjectURL(fileItem);
                ImageUtilityService.fileToDataURL(fileItem).then((result) => {
                    imageResult.imageDataUrl = result;
                    observer.next(imageResult);
                    if (--total === 0)
                        observer.complete();
                });
            });
        });
    }
}