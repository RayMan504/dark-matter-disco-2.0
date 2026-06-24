import { Component } from '@angular/core';
import { Dancer } from '../dancer/dancer';

@Component({
  selector: 'app-dance-floor',
  imports: [Dancer],
  templateUrl: './dance-floor.html',
  styleUrl: './dance-floor.scss',
})
export class DanceFloor {}
