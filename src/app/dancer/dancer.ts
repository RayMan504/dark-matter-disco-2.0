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
      try {
        const videoElement = this.videoRef.nativeElement;

        // initialize camera, pixi graphics, and pose detection
        await this.cameraService.initCamera(videoElement);
        await this.pixiGraphicsService.initPixi(videoElement);
        await this.poseDetectionService.initializePoseLandmarker();

        // start pose detection and graphics rendering
        this.pixiGraphicsService.startDetection(videoElement, this.poseDetectionService.getInstance());
      } catch(error) {
        console.error('Error in ngAfterViewInit:', error);
      }
      
  }
}
