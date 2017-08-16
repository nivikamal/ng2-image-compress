import { ResizeOptions } from './ResizeOptions';
import { IImage } from './CompressImage';
import { ImageUtilityService } from './imageUtilityService';
import { Observable } from 'rxjs';

export class ImageCompressService {

    /* *
     * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
     * @param {Image} sourceImgObj The source Image Object
     * @param {Integer} quality The output quality of Image Object
     * @return {Image} result_image_obj The compressed Image Object
     */

    private static jicCompress(sourceImgObj, options: ResizeOptions) {
        let outputFormat = options.Resize_Type;
        let quality = options.Resize_Quality || 70;
        let mimeType = 'image/jpeg';
        if (outputFormat !== undefined && outputFormat === 'png') {
            mimeType = 'image/png';
        }


        let maxHeight = options.Resize_Max_Height || 300;
        let maxWidth = options.Resize_Max_Width || 250;

        let height = sourceImgObj.height;
        let width = sourceImgObj.width;

        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > maxWidth) {
                height = Math.round(height *= maxWidth / width);
                width = maxWidth;
            }
        }else {
            if (height > maxHeight) {
                width = Math.round(width *= maxHeight / height);
                height = maxHeight;
            }
        }

        let cvs = document.createElement('canvas');
        cvs.width = width;
        cvs.height = height;
        cvs.getContext('2d').drawImage(sourceImgObj, 0, 0, width, height);
        let newImageData = cvs.toDataURL(mimeType, quality / 100);
        let resultImageObj = new Image();
        resultImageObj.src = newImageData;
        return resultImageObj.src;
    }
    public static compressImage(sourceImage: IImage, options: ResizeOptions, callback) {
        let that = this;
        ImageUtilityService.createImage(sourceImage.imageDataUrl, function (image) {
            let dataURLcompressed = that.jicCompress(image, options);
            sourceImage.compressedImage = {
                imageObjectUrl: '',
                imageDataUrl: dataURLcompressed,
                type: dataURLcompressed.match(/:(.+\/.+);/)[1],
                compressedImage: null
            };
            callback(sourceImage);
        });
    }

    public static filesToCompressedImageSource(fileList: FileList): Promise<Observable<IImage>> {

        return new Promise<Observable<IImage>>((resolve, reject) => {
            let count = fileList.length;
            let observer = ImageUtilityService.filesToSourceImages(fileList);
            let images: Array<IImage> = [];
            observer.subscribe((image) => {
                images.push(image);
                ImageCompressService.compressImage(image, new ResizeOptions(), () => {
                    if (--count === 0) {
                        resolve(Observable.from(images));
                    }
                });
            }, () => {
                reject('Error while compressing images');
            });
        });
    }
}
