import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Projectmanager } from './projectmanager/projectmanager';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Projectmanager],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('resourcing');
}
