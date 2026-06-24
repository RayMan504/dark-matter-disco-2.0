import { Injectable } from '@angular/core';
import { Application, Graphics, Sprite } from 'pixi.js';

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
    })

    // PIXI sprite and  graphics setup
    this.sprite = Sprite.from(video);
    this.graphics = new Graphics();
    this.sprite.width = this.app.screen.width;
    this.sprite.height = this.app.screen.height;
    this.app.stage.addChild(this.sprite);
    this.app.stage.addChild(this.graphics);

    // Append PIXI canvas to the DOM
    document.body.appendChild(this.app.canvas);
  }
}
