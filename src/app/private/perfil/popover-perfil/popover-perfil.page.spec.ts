import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverPerfilPage } from './popover-perfil.page';

describe('PopoverPerfilPage', () => {
  let component: PopoverPerfilPage;
  let fixture: ComponentFixture<PopoverPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverPerfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
