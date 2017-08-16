export interface IImage {
    imageObjectUrl: string;
    imageDataUrl: string;
    type: string;
    compressedImage: IImage;
}

export class SourceImage implements IImage {
    public imageObjectUrl: string;
    public imageDataUrl: string;
    public type: string;
    public compressedImage: IImage;
}
