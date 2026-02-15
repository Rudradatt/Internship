import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Projectservice, ProjectDto } from '../projectservice';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
 
  @Output() onCreate = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();

 
  handleCreate() { 
    this.onCreate.emit(); 
  }

  handleEdit(p: ProjectDto) { 
    this.onEdit.emit(p); 
  }

  handleView(p: ProjectDto) { 
    this.onView.emit(p); 
  }


  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private projectService: Projectservice) {}
  projects: ProjectDto[] = [];

  ngOnInit() {
    this.loadProjects();
  }

  onDelete(id: number) {
    if (confirm('Are you sure?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.loadProjects();
      });
    }
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Failed to load projects', err)
    });
  }


  

  get filteredProjects() {
    return this.projects.filter(p => 
      p.projectName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.domain.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedProjects() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredProjects.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredProjects.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
    pages.push(i);
    }
    return pages;

  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}