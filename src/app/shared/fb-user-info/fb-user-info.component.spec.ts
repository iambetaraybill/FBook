import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbUserInfoComponent } from './fb-user-info.component';

describe('FbUserInfoComponent', () => {
  let component: FbUserInfoComponent;
  let fixture: ComponentFixture<FbUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbUserInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
