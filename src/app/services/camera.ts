import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  // method to initialize camera: takes a video element as parameter and returns a promise
  async initCamera(video: HTMLVideoElement): Promise<void> {
    //  get latest media stream
    const stream  = await navigator.mediaDevices.getUserMedia({ video: true });
    //  append media stream to video element
    video.srcObject = stream;
    //  play video
    await video.play();
  }
}