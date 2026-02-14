import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  standalone: true, // Assuming standalone based on previous context
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm implements OnInit {
  private fb = inject(FormBuilder);

  @Input() editProjectData: any = null;
  @Input() isReadOnly: boolean = false;
  @Output() onCancel = new EventEmitter<void>();

cancelForm() {
  this.onCancel.emit();
}

  isEditMode = false;
  selectedSkills: string[] = [];
  isDropdownOpen = false;

  projectForm = this.fb.group({
    domain: ['', Validators.required],
    projectName: ['', Validators.required],
    projectShortName: ['', Validators.required],
    projectType: ['Annuity', Validators.required],
    clientName: ['', Validators.required],
    deliveryLead: ['', Validators.required],
    serviceManager: ['', Validators.required],
    startDate: ['', [Validators.required, this.futureDateValidator()]],
    endDate: ['', Validators.required]
  }, { validators: this.dateRangeValidator });

  ngOnInit() {
    // Check if we are in Edit or View mode
    if (this.editProjectData) {
      this.isEditMode = true;
      this.fillFormForEdit(this.editProjectData);
      
      // Lock the form if it is Read Only mode
      if (this.isReadOnly) {
        this.projectForm.disable();
      }
    }
  }

  // Helper to determine the header title in HTML
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
      endDate: data.endDate
    });

    this.selectedSkills = [...(data.selectedSkills || [])];
  }

  // --- Validators ---

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || this.isReadOnly) return null; // Skip validation if read-only
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
    return this.projectForm.hasError('dateRangeInvalid') &&
      (this.projectForm.get('endDate')?.touched || this.projectForm.get('endDate')?.dirty) || false;
  }

  // --- UI Logic ---

  toggleDropdown() {
    if (!this.isReadOnly) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  toggleSkill(skill: string) {
    if (this.isReadOnly) return;
    const index = this.selectedSkills.indexOf(skill);
    if (index > -1) this.selectedSkills.splice(index, 1);
    else this.selectedSkills.push(skill);
  }

  isSkillSelected(skill: string): boolean {
    return this.selectedSkills.includes(skill);
  }

  onSubmit() {
    if (this.projectForm.valid && !this.isReadOnly) {
      const payload = { 
        ...this.projectForm.getRawValue(), // getRawValue includes disabled fields if needed
        selectedSkills: this.selectedSkills 
      };

      if (this.isEditMode) {
        console.log('Updating Project:', payload);
      } else {
        console.log('Creating Project:', payload);
      }
    } else {
      this.projectForm.markAllAsTouched();
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
