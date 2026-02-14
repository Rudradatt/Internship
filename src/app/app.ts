import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectForm } from './project-form/project-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ProjectForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('resourcing');
}
