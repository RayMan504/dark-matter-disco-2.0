import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CameraService } from '../services/camera';
import { PixiGraphicsService } from '../services/pixi-graphics/pixi-graphics';

@Component({
  selector: 'app-dancer',
  imports: [],
  templateUrl: './dancer.html',
  styleUrl: './dancer.scss',
})
export class Dancer implements AfterViewInit {
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;

  constructor(private cameraService: CameraService, private pixiGraphicsService: PixiGraphicsService) {}


  async ngAfterViewInit(): Promise<void> {
      const videoElement = this.videoRef.nativeElement;
      await this.cameraService.initCamera(videoElement);
      await this.pixiGraphicsService.initPixi(videoElement);
  }
}
