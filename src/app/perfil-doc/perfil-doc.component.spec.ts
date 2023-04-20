import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDocComponent } from './perfil-doc.component';

describe('PerfilDocComponent', () => {
  let component: PerfilDocComponent;
  let fixture: ComponentFixture<PerfilDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
