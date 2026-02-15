import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProjectDto {
  id?: number; 
  domain: string;
  projectName: string;
  projectShortName: string;
  projectType: string;
  clientName: string;
  deliveryLeadName: string;
  serviceManagerName: string;
  startDate: string;
  endDate: string;
  selectedTechStacks: string[];
  createdById: number;
}

@Injectable({
  providedIn: 'root',
})
export class Projectservice {
   private http = inject(HttpClient);
  private apiUrl = 'https://localhost:5001/api/projects';


  getDomains(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/domains`);
  }

  getClients(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/clients`);
  }

  getDeliveryLeads(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/delivery-leads`);
  }

  getServiceManagers(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/service-managers`);
  }

  getTechStacks(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tech-stacks`);
  }

 //Read
  getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.apiUrl);
  }

  //Create
  createProject(project: ProjectDto): Observable<ProjectDto> {
    return this.http.post<ProjectDto>(this.apiUrl, project);
  }

  //update
  updateProject(id: number, project: ProjectDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, project);
  }

  //Delete
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
