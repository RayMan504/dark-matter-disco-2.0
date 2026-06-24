import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CameraService } from '../services/camera';
import { PixiGraphicsService } from '../services/pixi-graphics/pixi-graphics';
import { PoseDetectionService } from '../services/pose-detection/pose-detection';

@Component({
  selector: 'app-dancer',
  imports: [],
  templateUrl: './dancer.html',
  styleUrl: './dancer.scss',
})
export class Dancer implements AfterViewInit {
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;

  constructor(private cameraService: CameraService, private pixiGraphicsService: PixiGraphicsService, private poseDetectionService: PoseDetectionService) {}


  async ngAfterViewInit(): Promise<void> {
      const videoElement = this.videoRef.nativeElement;

      // initialize camera, pixi graphics, and pose detection
      await this.cameraService.initCamera(videoElement);
      await this.pixiGraphicsService.initPixi(videoElement);
      await this.poseDetectionService.initializePoseLandmarker();

      const poseLandmarker = this.poseDetectionService.getInstance();

      // start pose detection and graphics rendering
      this.pixiGraphicsService.startDetection(videoElement, poseLandmarker);
  }
}
