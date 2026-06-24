import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CameraService } from '../services/camera';

@Component({
  selector: 'app-dancer',
  imports: [],
  templateUrl: './dancer.html',
  styleUrl: './dancer.scss',
})
export class Dancer implements AfterViewInit {
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;

  constructor(private cameraService: CameraService) {}

  async ngAfterViewInit(): Promise<void> {
      const videoElement = this.videoRef.nativeElement;
      await this.cameraService.initCamera(videoElement);
  }
}
