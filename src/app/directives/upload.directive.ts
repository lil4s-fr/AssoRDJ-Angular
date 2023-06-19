import { style } from '@angular/animations';
import { Directive, Output, EventEmitter, HostBinding, HostListener, HostBindingDecorator } from '@angular/core';

@Directive({
  selector: '[appUpload]'
})

export class UploadDirective {

  // OnFileDropped sera l’événement que notre directive exposera a notre component
  //lancé quand le fichier est déposé sur l'Host
  @Output() onFileDropped = new EventEmitter<any>();
  // par défaut une couleur (blanc) et une opacité complète
  @HostBinding('style.background-color') public background = '#fff';
  @HostBinding('style.opacity') public opacity = '1';

  //Dragover, l'utilisateur glisse quelque chose sur notre élément Host element
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }

  //Dragleave, l'utilisateur glisse quelque chose hors de notre élément Host
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation(); //evite la propagation
    this.background = '#fff'
    this.opacity = '1'
  }

  // réaction à la dépose du fichier
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }
}
