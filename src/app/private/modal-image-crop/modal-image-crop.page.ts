import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import 'cropperjs/dist/cropper.css';
import Cropper from "cropperjs";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-modal-image-crop',
  templateUrl: './modal-image-crop.page.html',
  styleUrls: ['./modal-image-crop.page.scss'],
})
export class ModalImageCropPage implements OnInit {

  @ViewChild("image", { static: false })
  public stage: ElementRef;

  public imagemCortada: string;
  public imagemParaEditar: string = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" //bg black 1px/1px
  private cropper: Cropper;
  private x: number; private y: number; private width: number; private height: number; private rotate: number; private scaleX: number; private scaleY: number;
  private zoomNumber = 0
  private valorRange = 0

  constructor(private modalController: ModalController) {
    this.imagemCortada = "";
  }

  ngOnInit() {
  }
  carregarTeste() { //TESTE
    console.log('sssssss', this.valorRange);
    this._resetStatusRange()
    this.imagemParaEditar = "../../../assets/img/picture.jpg"
    this.stage.nativeElement.src = this.imagemParaEditar
    if (this.cropper) this.cropper.destroy()
    this._createCropper()
  }


  //==========================================================
  //             Metodos
  //==========================================================  
  fechar() {
    this.modalController.dismiss()
  }



  carregarFoto(ev) {
    const file = ev.target.files[0];
    this._converteFileParaBase64(file).subscribe((base64) => {
      this._resetStatusRange()
      this.imagemParaEditar = base64
      this.stage.nativeElement.src = this.imagemParaEditar
      if (this.cropper) this.cropper.destroy()
      this._createCropper()
    })
  }



  setPreviewDoCorte() {
    if (!this.cropper) return
    const canvas = this.cropper.getCroppedCanvas({
      minWidth: 300,
      minHeight: 300,
      maxWidth: 4096,
      maxHeight: 4096,
      fillColor: '#a154f2'
    });
    this.imagemCortada = canvas.toDataURL("image/png", (100 / 100));
  }






  //==========================================================
  //             CONTROLES DO EDITOR DE IMAGENS (cropper)
  //==========================================================
  resetar() {
    if (!this.cropper) return
    this.cropper.reset()
  }



  zoomRange(ev) {
    if (!this.cropper) return
    if (this.zoomNumber < ev.detail.value) this.cropper.zoom(0.2)
    if (this.zoomNumber > ev.detail.value) this.cropper.zoom(-0.2)
    this.zoomNumber = ev.detail.value
  }



  zoomIn() {
    if (!this.cropper) return
    this._resetStatusRange()
    this.cropper.zoom(1)
  }



  zoomOut() {
    this._resetStatusRange()
    if (!this.cropper) return
    this.cropper.zoom(-1)
  }



  girarDireita() {
    if (!this.cropper) return
    this.cropper.rotate(45)
  }



  girarEsquerda() {
    if (!this.cropper) return
    this.cropper.rotate(-45)
  }



  virarHorizontal() {
    if (!this.cropper) return
    this.scaleX = this.scaleX * -1
    this.cropper.scaleX(this.scaleX)
  }



  virarVertical() {
    if (!this.cropper) return
    this.scaleY = this.scaleY * -1
    this.cropper.scaleY(this.scaleY)
  }



  move(x, y) {
    if (!this.cropper) return
    this.cropper.move(x, y)
  }



  centralizar() {
    if (!this.cropper) return
    const canvas = this.cropper.getCanvasData()
    const stage = this.cropper.getContainerData()
    const x = (stage.width / 2) - (canvas.width / 2)
    const y = (stage.height / 2) - (canvas.height / 2)
    this.cropper.moveTo(x, y)
  }






  //==========================================================
  //             Metodos PRIVADOS
  //==========================================================
  private _createCropper() {
    this.cropper = new Cropper(this.stage.nativeElement, {
      zoomable: true,
      scalable: true,
      dragMode: 'move',
      aspectRatio: 16 / 9,
      minCanvasWidth: 300,
      minCanvasHeight: 300,
      cropBoxMovable: false,
      cropBoxResizable: false,
      // autoCropArea:50,
      // minCropBoxHeight: 150,
      // minCropBoxWidth: 150,
      movable: true,
      crop: (event) => this._setStageStatus(event)
    });
  }



  private _resetStatusRange() {
    this.valorRange = 0
    this.zoomNumber = 0
  }



  private _converteFileParaBase64(file: any) {
    return Observable.create((observer) => {
      const reader: FileReader = new FileReader();
      reader.onloadend = function () {
        observer.next(reader.result);
        observer.complete();
      };
      reader.readAsDataURL(file);
    })
  }



  private _setStageStatus(event) {
    this.x = event.detail.x;
    this.y = event.detail.y;
    this.width = event.detail.width;
    this.height = event.detail.height;
    this.rotate = event.detail.rotate;
    this.scaleX = event.detail.scaleX;
    this.scaleY = event.detail.scaleY;
  }



}

// statusCroop() {
//   console.log('[[]]', this.cropper.getCanvasData());
//   const y = (this.cropper.getCanvasData().height / 2) + (this.cropper.getCanvasData().top)
//   const x = (this.cropper.getCanvasData().width / 2) + (this.cropper.getCanvasData().left)
//   console.log('[[posicao Y]]', y);
//   console.log('[[posicao X]]', x);
// }
