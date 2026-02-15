import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Projectservice, ProjectDto } from '../projectservice';
@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm implements OnInit {

  @Input() editProjectData: any = null;
  @Input() isReadOnly: boolean = false;
  @Output() onCancel = new EventEmitter<void>();

  isEditMode = false;
  selectedSkills: string[] = [];
  isDropdownOpen = false;

  projectForm!: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private projectService: Projectservice
  ) {
    this.projectForm = this.fb.group(
      {
        domain: ['', Validators.required],
        projectName: ['', Validators.required],
        projectShortName: ['', Validators.required],
        projectType: ['Annuity', Validators.required],
        clientName: ['', Validators.required],
        deliveryLead: ['', Validators.required],
        serviceManager: ['', Validators.required],
        startDate: ['', [Validators.required, this.futureDateValidator()]],
        endDate: ['', Validators.required],
      },
      { validators: this.dateRangeValidator }
    );
  }

  ngOnInit() {
    if (this.editProjectData) {
      this.isEditMode = true;
      this.fillFormForEdit(this.editProjectData);

      if (this.isReadOnly) {
        this.projectForm.disable();
      }
    }
  }

  cancelForm() {
    this.onCancel.emit();
  }

  get formTitle(): string {
    if (this.isReadOnly) return 'View Project Details';
    return this.isEditMode ? 'Edit Project' : 'Create New Project';
  }

  fillFormForEdit(data: any) {
    this.projectForm.patchValue({
      domain: data.domain,
      projectName: data.projectName,
      projectShortName: data.projectShortName,
      projectType: data.projectType,
      clientName: data.clientName,
      deliveryLead: data.deliveryLead,
      serviceManager: data.serviceManager,
      startDate: data.startDate,
      endDate: data.endDate,
    });

    this.selectedSkills = (data.selectedSkills || []).slice();
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || this.isReadOnly) return null;
      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return inputDate < today ? { pastDate: true } : null;
    };
  }

  dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    if (!start || !end) return null;
    return new Date(end) <= new Date(start) ? { dateRangeInvalid: true } : null;
  }

  get isDateRangeInvalid(): boolean {
  return Boolean(
    this.projectForm.hasError('dateRangeInvalid') &&
    (this.projectForm.get('endDate')?.touched ||
     this.projectForm.get('endDate')?.dirty)
  );
}

  toggleDropdown() {
    if (!this.isReadOnly) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  toggleSkill(skill: string) {
    if (this.isReadOnly) return;
    const index = this.selectedSkills.indexOf(skill);
    index > -1
      ? this.selectedSkills.splice(index, 1)
      : this.selectedSkills.push(skill);
  }

  isSkillSelected(skill: string): boolean {
    return this.selectedSkills.includes(skill);
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const formValues = this.projectForm.getRawValue();

    const payload: ProjectDto = {
      domain: formValues.domain!,
      projectName: formValues.projectName!,
      projectShortName: formValues.projectShortName!,
      projectType: formValues.projectType!,
      clientName: formValues.clientName!,
      deliveryLeadName: formValues.deliveryLead!,
      serviceManagerName: formValues.serviceManager!,
      startDate: formValues.startDate!,
      endDate: formValues.endDate!,
      selectedTechStacks: this.selectedSkills,
      createdById: 1,
    };

    if (this.isEditMode && this.editProjectData?.id) {
      this.projectService.updateProject(this.editProjectData.id, {
        ...payload,
        id: this.editProjectData.id,
      }).subscribe(() => this.onCancel.emit());
    } else {
      this.projectService.createProject(payload)
        .subscribe(() => this.onCancel.emit());
    }
  }
}


// import { Component, inject, Input, OnInit } from '@angular/core';

// import { CommonModule } from '@angular/common';

// import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
// @Component({
//   selector: 'app-project-form',
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './project-form.html',
//   styleUrl: './project-form.css',
// })
// export class ProjectForm implements OnInit{
//   private fb = inject(FormBuilder);



//   @Input() editProjectData: any = null; 
//   @Input() isReadOnly: boolean = false;
//   
//   isEditMode = false;
//   selectedSkills: string[] = [];



//   projectForm = this.fb.group({

//     domain: ['', Validators.required],

//     projectName: ['', Validators.required],

//     projectShortName: ['', Validators.required],

//     projectType: ['Annuity', Validators.required],

//     clientName: ['', Validators.required],

//     deliveryLead: ['', Validators.required],

//     serviceManager: ['', Validators.required],

//     startDate: ['', [Validators.required, this.futureDateValidator()]], 

//     endDate: ['', Validators.required]

//   }, { validators: this.dateRangeValidator });



//  

//   futureDateValidator(): ValidatorFn {

//     return (control: AbstractControl): ValidationErrors | null => {

//       if (!control.value) return null; 

//       const inputDate = new Date(control.value);

//       const today = new Date();

//       today.setHours(0, 0, 0, 0); 

//       return inputDate < today ? { pastDate: true } : null;

//     };

//   }



//   dateRangeValidator(group: AbstractControl): ValidationErrors | null {

//     const start = group.get('startDate')?.value;

//     const end = group.get('endDate')?.value;

//     if (!start || !end) return null;

//     return new Date(end) <= new Date(start) ? { dateRangeInvalid: true } : null;

//   }



//   get isDateRangeInvalid(): boolean {

//     return this.projectForm.hasError('dateRangeInvalid') && 

//            (this.projectForm.get('endDate')?.touched || this.projectForm.get('endDate')?.dirty) || false;

//   }



//   isDropdownOpen = false;

//   toggleDropdown() {

//     this.isDropdownOpen = !this.isDropdownOpen;

//   }



//   toggleSkill(skill: string) {

//     const index = this.selectedSkills.indexOf(skill);

//     if (index > -1) this.selectedSkills.splice(index, 1);

//     else this.selectedSkills.push(skill);

//   }



//   isSkillSelected(skill: string): boolean {

//     return this.selectedSkills.includes(skill);

//   }

//   ngOnInit() {
//     // 2. Check if we are in Edit Mode
//     if (this.editProjectData) {
//       this.isEditMode = true;
//       this.fillFormForEdit(this.editProjectData);
//     if (this.isReadOnly) {
//       this.projectForm.disable();  
//     }
//   }

//   fillFormForEdit(data: any) {
//     // 3. Patch the form values
//     this.projectForm.patchValue({
//       domain: data.domain,
//       projectName: data.projectName,
//       projectShortName: data.projectShortName,
//       projectType: data.projectType,
//       clientName: data.clientName,
//       deliveryLead: data.deliveryLead,
//       serviceManager: data.serviceManager,
//       startDate: data.startDate,
//       endDate: data.endDate
//     });

//     // 4. Handle skills separately since they are in a custom array
//     this.selectedSkills = [...(data.selectedSkills || [])];
//   }




//   onSubmit() {
//     if (this.projectForm.valid) {
//       const payload = { ...this.projectForm.value, selectedSkills: this.selectedSkills };
//       
//       if (this.isEditMode) {
//         console.log('Updating Project:', payload);
//         // Call your update service here
//       } else {
//         console.log('Creating Project:', payload);
//         // Call your create service here
//       }
//     } else {
//       this.projectForm.markAllAsTouched();
//     }
//   }
// }
