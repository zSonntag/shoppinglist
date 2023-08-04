import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdAddEditComponent } from './prod-add-edit.component';

describe('ProdAddEditComponent', () => {
  let component: ProdAddEditComponent;
  let fixture: ComponentFixture<ProdAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdAddEditComponent]
    });
    fixture = TestBed.createComponent(ProdAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
