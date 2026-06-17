import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import randomNames from '../assets/random-usernames';
import { Toolbar } from "./toolbar/toolbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dark-matter-disco-2.0');
  // TODO: setup default values for the app, such as username, stars, and other settings.
  hostUsername: string = randomNames[Math.floor(Math.random() * randomNames.length)];
  username: string | null = randomNames[Math.floor(Math.random() * randomNames.length)];
  userStars: number = 0;
  inviteeUsername: string | null = null;
}
