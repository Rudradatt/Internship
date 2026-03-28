import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-form',
  standalone: true, // Assuming standalone based on previous context
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm implements OnInit {
  weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  weekHeaders = ['12/01/2025', '12/08/2025', '12/15/2025', '12/22/2025', '12/15/2025', '12/22/2025'];
  dates: string[] = [];
  users: any[] = [];

  selectedCells: any[] = [];
  isSelecting = false;
  currentUser: string | null = null;

  showForm = false;
  cellForm!: FormGroup;

  @ViewChild('leftScroll') leftScroll!: ElementRef;
@ViewChild('rightScroll') rightScroll!: ElementRef;

private isSyncing = false;

syncScroll(source: 'left' | 'right') {
  if (this.isSyncing) return;
  this.isSyncing = true;

  if (source === 'left') {
    // left drives right vertically
    this.rightScroll.nativeElement.scrollTop = this.leftScroll.nativeElement.scrollTop;
  } else {
    // right drives left vertically only
    this.leftScroll.nativeElement.scrollTop = this.rightScroll.nativeElement.scrollTop;
  }

  setTimeout(() => (this.isSyncing = false), 0);
}

  resources = [
    { name: 'Bhavi', project: 'ResourcePlanner', role: 'TA', designation: 'SE', gender: 'Female', date: '01/01/2026' },
    { name: 'Devendra', project: 'Estimate', role: 'FATA', designation: 'Practice Lead', gender: 'Male', date: '02/02/2026' },
    { name: 'Rrudradaat', project: 'Amazon Resilience', role: 'STA', designation: 'Project Manager', gender: 'Male', date: '03/03/2026' },
    { name: 'Rishabh', project: 'Hornels', role: 'CDL', designation: 'Service Manager', gender: 'Male', date: '04/04/2026' },
    { name: 'Aarav', project: 'ResourcePlanner', role: 'TA', designation: 'SE', gender: 'Male', date: '05/01/2026' },
    { name: 'Meera', project: 'Estimate', role: 'FATA', designation: 'Practice Lead', gender: 'Female', date: '06/01/2026' },
    { name: 'Vivaan', project: 'Amazon Resilience', role: 'STA', designation: 'Project Manager', gender: 'Male', date: '07/01/2026' },
    { name: 'Diya', project: 'Hornels', role: 'CDL', designation: 'Service Manager', gender: 'Female', date: '08/01/2026' },
    { name: 'Krishna', project: 'ResourcePlanner', role: 'TA', designation: 'SE', gender: 'Male', date: '09/01/2026' },
    { name: 'Sanya', project: 'Estimate', role: 'FATA', designation: 'Practice Lead', gender: 'Female', date: '10/01/2026' },
    { name: 'Aditya', project: 'Amazon Resilience', role: 'STA', designation: 'Project Manager', gender: 'Male', date: '11/01/2026' },
    { name: 'Rhea', project: 'Hornels', role: 'CDL', designation: 'Service Manager', gender: 'Female', date: '12/01/2026' },
    { name: 'Ayaan', project: 'ResourcePlanner', role: 'TA', designation: 'SE', gender: 'Male', date: '01/02/2026' },
    { name: 'Inaaya', project: 'Estimate', role: 'FATA', designation: 'Practice Lead', gender: 'Female', date: '02/02/2026' },
    { name: 'Shaurya', project: 'Amazon Resilience', role: 'STA', designation: 'Project Manager', gender: 'Male', date: '03/02/2026' },
    { name: 'Kiara', project: 'Hornels', role: 'CDL', designation: 'Service Manager', gender: 'Female', date: '04/02/2026' },
    { name: 'Vivaan', project: 'ResourcePlanner', role: 'TA', designation: 'SE', gender: 'Male', date: '05/02/2026' },
    { name: 'Myra', project: 'Estimate', role: 'FATA', designation: 'Practice Lead', gender: 'Female', date: '06/02/2026' },
    { name: 'Arjun', project: 'Amazon Resilience', role: 'STA', designation: 'Project Manager', gender: 'Male', date: '07/02/2026' },
    { name: 'Sara', project: 'Hornels', role: 'CDL', designation: 'Service Manager', gender: 'Female', date: '08/02/2026' },
    { name: 'Reyansh', project: 'ResourcePlanner', role: 'TA', designation: 'SE', gender: 'Male', date: '09/02/2026' },
    { name: 'Diya', project: 'Estimate', role: 'FATA', designation: 'Practice Lead', gender: 'Female', date: '10/02/2026' },
    { name: 'Krishna', project: 'Amazon Resilience', role: 'STA', designation: 'Project Manager', gender: 'Male', date: '11/02/2026' },
    { name: 'Ananya', project: 'Hornels', role: 'CDL', designation: 'Service Manager', gender: 'Female', date: '12/02/2026' },
    { name: 'Advait', project: 'ResourcePlanner', role: 'TA', designation: 'SE', gender: 'Male', date: '01/03/2026' },
    { name: 'Saanvi', project: 'Estimate', role: 'FATA', designation: 'Practice Lead', gender: 'Female', date: '02/03/2026' },
    { name: 'Dhruv', project: 'Amazon Resilience', role: 'STA', designation: 'Project Manager', gender: 'Male', date: '03/03/2026' },
    { name: 'Aarohi', project: 'Hornels', role: 'CDL', designation: 'Service Manager', gender: 'Female', date: '04/03/2026' },
    { name: 'Veer', project: 'ResourcePlanner', role: 'TA', designation: 'SE', gender: 'Male', date: '05/03/2026' },
    { name: 'Kiara', project: 'Estimate', role: 'FATA', designation: 'Practice Lead', gender: 'Female', date: '06/03/2026' },
  ];

  allocationTypes = [
    { name: 'Billable', short: 'BILL', color: 'rgb(146,208,80)', isLeave: false },
    { name: 'Non-Billable', short: 'NB', color: 'rgb(0,176,80)', isLeave: false },
    { name: 'Potential', short: 'POT', color: 'rgb(255,192,0)', isLeave: false },
    { name: 'Internal', short: 'INT', color: 'rgb(0,176,240)', isLeave: false },
    { name: 'Available', short: 'AVL', color: 'rgb(255,0,0)', isLeave: false },

    { name: 'Holiday', short: 'HOL', color: 'rgb(112,48,160)', isLeave: true },
    { name: 'Sick Leave', short: 'SICK', color: 'rgb(255,0,255)', isLeave: true },
    { name: 'Bank Holiday', short: 'BANK HOL', color: 'rgb(244,177,131)', isLeave: true },
    { name: 'Maternity Leave', short: 'MAT', color: 'rgb(174,170,170)', isLeave: true },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.generateDates();
    this.generateData();

    this.cellForm = this.fb.group({
      allocation1: [''],
      allocation2: [''],
      isHalfDay: [false],
    });
  }

  generateDates() {
    this.dates = ['12/01', '12/02', '12/03', '12/04', '12/05', '12/08', '12/09', '12/10', '12/11', '12/12', '12/15', '12/16', '12/17', '12/18', '12/19', '12/22', '12/23', '12/24', '12/25', '12/26'];
  }

  generateData() {
    const colors: any = {
      Samsung: 'rgb(0,176,80)',
      Emirates: 'rgb(0,176,240)',
      Thor: 'rgb(146,208,80)',
      Available: 'rgb(255,0,0)',
      'Go IBIBO': 'rgb(255,192,0)',
    };

    this.users = [
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
      this.createUser('User 1', 'Samsung', colors),
      this.createUser('User 2', 'Emirates', colors),
      this.createUser('User 3', 'Thor', colors),
      this.createUser('User 4', 'Available', colors),
      this.createUser('User 5', 'Go IBIBO', colors),
    ];
  }

  createUser(name: string, defaultValue: string, colors: any) {
    return {
      name,
      data: this.dates.map((d) => ({
        id: name + '-' + d,
        value: defaultValue,
        color: colors[defaultValue],

        isHalfDay: false,
        firstColor: null,
        secondColor: null,
      })),
    };
  }

  startSelection(event: MouseEvent, user: any, cell: any) {
    if (event.detail === 2) return;

    if (this.isSelecting && user.name !== this.currentUser) return;

    this.isSelecting = true;
    this.currentUser = user.name;

    const index = this.selectedCells.findIndex((c) => c.id === cell.id);

    if (index > -1) {
      this.selectedCells.splice(index, 1);
    } else {
      this.selectedCells.push(cell);
    }
  }

  onHoverSelect(user: any, cell: any) {
    if (!this.isSelecting) return;
    if (user.name !== this.currentUser) return;

    const index = this.selectedCells.findIndex((c) => c.id === cell.id);

    if (index > -1) {
      this.selectedCells.splice(index, 1);
    } else {
      this.selectedCells.push(cell);
    }
  }

  endSelection() {
    this.isSelecting = false;
    this.currentUser = null;
  }

  isSelected(cell: any): boolean {
    return this.selectedCells.some((c) => c.id === cell.id);
  }

  openForm() {
    if (this.selectedCells.length === 0) return;

    this.showForm = true;

    const cell = this.selectedCells[0];

    let allocation1 = null;
    let allocation2 = null;
    let isHalfDay = false;

    if (cell.isHalfDay) {
      allocation1 = this.allocationTypes.find((a) => a.color === cell.firstColor);
      allocation2 = this.allocationTypes.find((a) => a.color === cell.secondColor);
      isHalfDay = true;
    } else {
      allocation1 = this.allocationTypes.find((a) => a.color === cell.color);

      if (!allocation1) {
        allocation1 = this.allocationTypes.find((a) => a.short === cell.value);
      }
    }

    this.cellForm.patchValue({
      allocation1: allocation1 || this.allocationTypes[0],
      allocation2: allocation2 || this.allocationTypes[1],
      isHalfDay: isHalfDay,
    });

    document.body.classList.add('modal-open');
  }

  closeForm() {
    this.showForm = false;
    document.body.classList.remove('modal-open');
  }

  save() {
    const val = this.cellForm.value;

    this.selectedCells.forEach((cell) => {
      if (val.isHalfDay) {
        cell.isHalfDay = true;
        cell.firstColor = val.allocation1.color;
        cell.secondColor = val.allocation2.color;
      } else {
        const selectedType = val.allocation1;

        cell.isHalfDay = false;
        cell.firstColor = null;
        cell.secondColor = null;

        if (selectedType.isLeave) {
          cell.value = selectedType.short;
          cell.color = selectedType.color;
        } else {
          cell.color = selectedType.color;
        }
      }
    });

    this.selectedCells = [];
    this.closeForm();
  }

  getCellStyle(cell: any) {
    if (cell.isHalfDay) {
      return {
        background: `linear-gradient(
        148deg,
        ${cell.firstColor} 50%,
        ${cell.secondColor} 50%
      )`,
      };
    }
    return { background: cell.color };
  }
}
