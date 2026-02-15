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
  // 1. Define the Emitters (Outputs)
  @Output() onCreate = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();

  // 2. Define the Handlers (Renamed to avoid Duplicate Identifier error)
  handleCreate() { 
    this.onCreate.emit(); 
  }

  handleEdit(p: any) { 
    this.onEdit.emit(p); 
  }

  handleView(p: any) { 
    this.onView.emit(p); 
  }

  // Search and Pagination properties
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
        this.loadProjects(); // Refresh the list after delete
      });
    }
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Failed to load projects', err)
    });
  }

  // Logic remains for Delete, Filtering, and Pagination
  

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
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}