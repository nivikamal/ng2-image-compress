import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IImage, ResizeOptions, ImageCompressService } from 'ng2-image-compress';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  images: IImage[] = [];

  async onFilesSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const resize = new ResizeOptions();
    resize.Resize_Max_Width = 1024;
    resize.Resize_Max_Height = 1024;
    resize.Resize_Quality = 70;
    resize.Resize_Type = 'jpg';

    const stream$ = await ImageCompressService.filesToCompressedImageSourceEx(input.files, resize);

    const results: IImage[] = [];
    for (let i = 0; i < input.files.length; i++) {
      const item = await firstValueFrom(stream$);
      results.push(item);
    }
    this.images = results;
    input.value = '';
  }
}
