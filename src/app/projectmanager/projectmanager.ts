import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectForm } from '../project-form/project-form';
import { ProjectList } from '../project-list/project-list';

@Component({
  selector: 'app-projectmanager',
  imports: [CommonModule,ProjectForm,ProjectList],
  templateUrl: './projectmanager.html',
  styleUrl: './projectmanager.css',
})
export class Projectmanager {
viewMode: 'list' | 'form' = 'list';
  selectedProject: any = null;
  isReadOnly: boolean = false;

  openCreate() {
    this.selectedProject = null;
    this.isReadOnly = false;
    this.viewMode = 'form';
  }

  openEdit(project: any) {
    this.selectedProject = project;
    this.isReadOnly = false;
    this.viewMode = 'form';
  }

  openView(project: any) {
    this.selectedProject = project;
    this.isReadOnly = true;
    this.viewMode = 'form';
  }

  goBackToList() {
    this.viewMode = 'list';
    this.selectedProject = null;
  }
}

