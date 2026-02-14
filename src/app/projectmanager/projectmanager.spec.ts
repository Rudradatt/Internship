import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projectmanager } from './projectmanager';

describe('Projectmanager', () => {
  let component: Projectmanager;
  let fixture: ComponentFixture<Projectmanager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projectmanager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Projectmanager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
