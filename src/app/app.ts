import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// TODO:: import demo usernames

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dark-matter-disco-2.0');
  // TODO: setup default values for the app, such as username, stars, and other settings.
  hostUsername: string | null = "Host 1"; 
  inviteeUsername: string | null = "inviteee 1"; 
}
