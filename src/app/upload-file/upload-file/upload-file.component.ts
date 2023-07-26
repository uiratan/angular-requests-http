import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {

  fileNames: any[] = [];

  onChange(event: Event) {
    const selectedFiles = <FileList>(event.target as HTMLInputElement).files;

    for (let i = 0; i < selectedFiles.length; i++) {
      this.fileNames.push(selectedFiles[i].name);
    }

    (document.getElementById('customFileLabel') as HTMLElement).innerHTML = this.fileNames.join(', ');
  }

}
