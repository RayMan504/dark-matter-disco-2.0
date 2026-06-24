import { Injectable } from '@angular/core';
import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision';

@Injectable({
  providedIn: 'root',
})
export class PoseDetectionService {
  private poseLandmarker!: PoseLandmarker;


  // render pose tracker for PIXIJS video element
  async initializePoseLandmarker(): Promise<void> {

    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
    );

    // access .task file from remote path via mediapipe googleapis documentation
    this.poseLandmarker =
      await PoseLandmarker.createFromModelPath(
        vision,
        "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task" // Can be a local or remote path to a .task / .tflite bundle
      );
      // set running mode to VIDEO
      this.poseLandmarker.setOptions({
        runningMode: 'VIDEO',
      })
  }

  getInstance(): PoseLandmarker {
    return this.poseLandmarker;
  }
}
