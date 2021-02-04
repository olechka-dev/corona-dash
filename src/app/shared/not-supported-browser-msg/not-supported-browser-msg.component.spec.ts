import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSupportedBrowserMsgComponent } from './not-supported-browser-msg.component';

describe('NotSupportedBrowserMsgComponent', () => {
  let component: NotSupportedBrowserMsgComponent;
  let fixture: ComponentFixture<NotSupportedBrowserMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotSupportedBrowserMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotSupportedBrowserMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
