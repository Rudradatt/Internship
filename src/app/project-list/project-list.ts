import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
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

  projects = [
    {
      id: 1,
      projectName: 'Legacy App Migration',
      domain: 'Legacy Modernization',
      serviceManager: 'Rudradatt',
      startDate: '2024-01-01',
      endDate: '2024-06-01',
      selectedSkills: ['.NET', 'Angular']
    },
    {
      id: 2,
      projectName: 'E-Shop Platform',
      domain: 'eCommerce',
      serviceManager: 'Ankit',
      startDate: '2024-02-15',
      endDate: '2024-12-15',
      selectedSkills: ['Java', 'Python']
    },
    {
      id: 1,
      projectName: 'Legacy App Migration',
      domain: 'Legacy Modernization',
      serviceManager: 'Rudradatt',
      startDate: '2024-01-01',
      endDate: '2024-06-01',
      selectedSkills: ['.NET', 'Angular']
    },
    {
      id: 2,
      projectName: 'E-Shop Platform',
      domain: 'eCommerce',
      serviceManager: 'Ankit',
      startDate: '2024-02-15',
      endDate: '2024-12-15',
      selectedSkills: ['Java', 'Python']
    },
    {
      id: 1,
      projectName: 'Legacy App Migration',
      domain: 'Legacy Modernization',
      serviceManager: 'Rudradatt',
      startDate: '2024-01-01',
      endDate: '2024-06-01',
      selectedSkills: ['.NET', 'Angular']
    },
    {
      id: 2,
      projectName: 'E-Shop Platform',
      domain: 'eCommerce',
      serviceManager: 'Ankit',
      startDate: '2024-02-15',
      endDate: '2024-12-15',
      selectedSkills: ['Java', 'Python']
    },
    {
      id: 1,
      projectName: 'Legacy App Migration',
      domain: 'Legacy Modernization',
      serviceManager: 'Rudradatt',
      startDate: '2024-01-01',
      endDate: '2024-06-01',
      selectedSkills: ['.NET', 'Angular']
    },
    {
      id: 2,
      projectName: 'E-Shop Platform',
      domain: 'eCommerce',
      serviceManager: 'Ankit',
      startDate: '2024-02-15',
      endDate: '2024-12-15',
      selectedSkills: ['Java', 'Python']
    }
  ];

  // Logic remains for Delete, Filtering, and Pagination
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projects = this.projects.filter(p => p.id !== id);
    }
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
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}