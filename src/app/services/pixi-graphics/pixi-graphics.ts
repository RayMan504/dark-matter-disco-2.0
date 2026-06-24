import { Injectable } from '@angular/core';
import { Application, Graphics, Sprite } from 'pixi.js';
import { PoseLandmarker } from '@mediapipe/tasks-vision';


@Injectable({
  providedIn: 'root',
})

export class PixiGraphicsService {
  private app!: Application;
  private sprite!: Sprite;
  private graphics!: Graphics;

  // initialize PIXI application
  async initPixi(video: HTMLVideoElement): Promise<void> {
    this.app = new Application();

    await this.app.init({
      width: 640,
      height: 480,
      backgroundAlpha: 0
    })

    // PIXI sprite and  graphics setup
    this.sprite = Sprite.from(video);
    this.graphics = new Graphics();
    this.sprite.width = this.app.screen.width;
    this.sprite.height = this.app.screen.height;
    // this.app.stage.addChild(this.sprite);
    this.app.stage.addChild(this.graphics);

    // Append PIXI canvas to the DOM
    document.body.appendChild(this.app.canvas);
  }

  // attempt to track poses
  public startDetection(video: HTMLVideoElement, poseLandmarker: PoseLandmarker): void {

    this.app.ticker.add(() => {
      // update the sprite texture with the current video frame
      this.sprite.texture.update();

      // get video frame and detect poses
      const result =
        poseLandmarker.detectForVideo(
          video,
          performance.now()
        );

      if (!result.landmarks?.length) {
        return;
      }

      // clear graphics before rendering new landmarks
      this.graphics.clear();

      // bound sprites in order to render within canvas
      const bounds = this.sprite.getBounds();
      for (const lm of result.landmarks[0]) {
        const x = bounds.x + lm.x * bounds.width;
        const y = bounds.y + lm.y * bounds.height;

        // render graphics for each landmark
        this.graphics.fill(0xff0000);
        this.graphics.circle(x, y, 4);
      }
    });
  }
}
