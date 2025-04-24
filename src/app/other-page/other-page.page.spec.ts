import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtherPagePage } from './other-page.page';

describe('OtherPagePage', () => {
  let component: OtherPagePage;
  let fixture: ComponentFixture<OtherPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
