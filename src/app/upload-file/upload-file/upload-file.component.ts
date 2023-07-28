import { Component } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { environment } from 'src/environments/environment';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterRespose, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  preserveWhitespaces: true
})
export class UploadFileComponent {

  files!: Set<File>;

  progress = 0;

  constructor(private uploadService: UploadFileService) {}

  onChange(event: Event) {
    const selectedFiles = <FileList>(event.target as HTMLInputElement).files;
    let fileNames = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    this.progress = 0;

    console.log(event);
    console.log(selectedFiles);
    console.log(fileNames);
    console.log(this.files);
  //  (document.getElementById('customFileLabel') as HTMLElement).innerHTML = this.fileNames.join(', ');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      // this.uploadService.upload(this.files, 'http://localhost:8000/upload')
      this.uploadService.upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterRespose()
        )
        .subscribe(response => console.log('Upload Concluído'));
        // .subscribe((event: HttpEvent<Object>) => {
        //   console.log(event);

        //   if (event.type == HttpEventType.Response) {
        //     console.log('Upload Concluído');
        //   } else if (event.type == HttpEventType.UploadProgress) {
        //     const percentDone = Math.round((event.loaded * 100) / event.total!);
        //     this.progress = percentDone;
        //   }
        // });
    }
  }

  onDownloadExcel() {
    this.uploadService.download(environment.BASE_URL + '/downloadExcel')
      .subscribe((res:any) => {
        this.uploadService.handleFile(res, 'report.xlsx')
      })
  }

  onDownloadPDF() {
    this.uploadService.download(environment.BASE_URL + '/downloadExcel')
      .subscribe((res:any) => {
        this.uploadService.handleFile(res, 'report.pdf')
      })
  }


}
