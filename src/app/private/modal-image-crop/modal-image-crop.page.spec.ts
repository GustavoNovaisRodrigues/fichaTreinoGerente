import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalImageCropPage } from './modal-image-crop.page';

describe('ModalImageCropPage', () => {
  let component: ModalImageCropPage;
  let fixture: ComponentFixture<ModalImageCropPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImageCropPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalImageCropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
