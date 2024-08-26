import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertTodoDialogComponent } from './upsert-todo-dialog.component';

describe('UpsertTodoDialogComponent', () => {
  let component: UpsertTodoDialogComponent;
  let fixture: ComponentFixture<UpsertTodoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertTodoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
