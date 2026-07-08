import { Injectable } from '@angular/core';
import { Application, Assets, Graphics, Sprite, Texture } from 'pixi.js';
import { NormalizedLandmark, PoseLandmarker } from '@mediapipe/tasks-vision';

interface Point2D {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})

export class PixiGraphicsService {
  private app!: Application;
  private sprite!: Sprite;
  private graphics!: Graphics;
  private texture!: Texture;

  // initialize PIXI application
  async initPixi(video: HTMLVideoElement): Promise<void> {
    try {
      this.app = new Application();

      await this.app.init({
        width: 800,
        height: 800,
        // resizeTo: window,
        backgroundAlpha: 0
      })

      // PIXI sprite and  graphics setup
      this.sprite = Sprite.from(video);
      this.graphics = new Graphics();
      this.sprite.width = this.app.screen.width;
      this.sprite.height = this.app.screen.height;
      // load skin asset to texture
      // this.texture = await Assets.load('../../assets/robot.png');
      // this.app.stage.addChild(this.sprite);
      this.app.stage.addChild(this.graphics);

      // position canvas in center of page
      this.app.canvas.style.position = 'absolute';
      this.app.canvas.style.top = '50%';
      this.app.canvas.style.left = '50%';
      this.app.canvas.style.transform = 'translate(-50%, -50%)';

      // Append PIXI canvas to the DOM
      document.body.appendChild(this.app.canvas);
    } catch(error) {
      console.error('Error initializing PIXI application:', error);
    }
    
  }

  // attempt to track poses
  public startDetection(video: HTMLVideoElement, poseLandmarker: PoseLandmarker): void {

    this.app.ticker.add(() => {
      // update the sprite texture with the current video frame
      this.sprite.texture.update();

      // get video frame and detect poses
      poseLandmarker.detectForVideo(
        video,
        performance.now(),
        this.onResults.bind(this)
      );

    });
  }

  public onResults(results: any) {
    try {
      if (results.landmarks && results.landmarks.length > 0) {
        // Call the drawSkeleton method with the detected landmarks
        this.drawSkeleton(results.landmarks[0]);
      }
    } catch(error) {
      console.error('Error processing media pipe landmark results:', error);
    }
    
  }

  // Step B: Mirror and translate coordinate structures safely
  private getRawCoords = (landmark: NormalizedLandmark[], index: number): Point2D => ({
    x: landmark[index].x * this.app.screen.width,
    y: landmark[index].y * this.app.screen.height
  });

  // 3. Render loop (Call this whenever new tracking data arrives)
  private drawSkeleton(landmark: NormalizedLandmark[]): void {
    try {
      this.graphics.clear();
      
      // Define landmarks: joints have fixed index values in the Mediapipe Pose model
      const nose = this.getRawCoords(landmark, 0);
      const lShoulder = this.getRawCoords(landmark, 11); 
      const rShoulder = this.getRawCoords(landmark, 12);
      const lElbow = this.getRawCoords(landmark, 13);    
      const rElbow = this.getRawCoords(landmark, 14);
      const lWrist = this.getRawCoords(landmark, 15);    
      const rWrist = this.getRawCoords(landmark, 16);
      const lHip = this.getRawCoords(landmark, 23);      
      const rHip = this.getRawCoords(landmark, 24);
      const lKnee = this.getRawCoords(landmark, 25);     
      const rKnee = this.getRawCoords(landmark, 26);
      const lAnkle = this.getRawCoords(landmark, 27);    
      const rAnkle = this.getRawCoords(landmark, 28);
      const neck = { x: (lShoulder.x + rShoulder.x) / 2, y: (lShoulder.y + rShoulder.y) / 2 };
      const pelvis = { x: (lHip.x + rHip.x) / 2, y: (lHip.y + rHip.y) / 2 };
        
        // --- SEGMENT 1: Torso / Core (Very Thick) ---
      this.graphics.moveTo(neck.x, neck.y).lineTo(pelvis.x, pelvis.y);
      this.graphics.stroke({ width: 90, color: 'red', cap: 'round', join: 'round' });

      // --- SEGMENT 2: Upper Legs (Thick) ---
      this.graphics.moveTo(lHip.x, lHip.y).lineTo(lKnee.x, lKnee.y);
      this.graphics.moveTo(rHip.x, rHip.y).lineTo(rKnee.x, rKnee.y);
      this.graphics.stroke({ width: 70, color: 'red', cap: 'round', join: 'round' });

      // --- SEGMENT 3: Lower Legs & Upper Arms (Medium) ---
      this.graphics.moveTo(lKnee.x, lKnee.y).lineTo(lAnkle.x, lAnkle.y);
      this.graphics.moveTo(rKnee.x, rKnee.y).lineTo(rAnkle.x, rAnkle.y);
      this.graphics.moveTo(lShoulder.x, lShoulder.y).lineTo(lElbow.x, lElbow.y);
      this.graphics.moveTo(rShoulder.x, rShoulder.y).lineTo(rElbow.x, rElbow.y);
      this.graphics.stroke({ width: 50, color: 'red', cap: 'round', join: 'round' });

      // --- SEGMENT 4: Forearms (Thinner) ---
      this.graphics.moveTo(lElbow.x, lElbow.y).lineTo(lWrist.x, lWrist.y);
      this.graphics.moveTo(rElbow.x, rElbow.y).lineTo(rWrist.x, rWrist.y);
      this.graphics.stroke({ width: 35, color: 'red', cap: 'round', join: 'round' });
      
      // --- SEGMENT 5: Head ---
      this.graphics.moveTo(neck.x, neck.y).lineTo(nose.x, nose.y);
      this.graphics.stroke({ 
        width: 80, 
        // texture: this.sprite.texture 
        color: 'red',
        cap: 'round' 
      });
    } catch(error) {
      console.error('Error drawing skeleton:', error);
    }
  }
}
