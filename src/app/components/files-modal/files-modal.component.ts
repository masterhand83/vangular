import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from 'src/app/services/session.service';
import { FileService } from 'src/app/services/files.service';

@Component({
  selector: 'app-files-modal',
  templateUrl: './files-modal.component.html',
  styleUrls: ['./files-modal.component.css']
})
export class FilesModalComponent implements OnInit {
  uploadedFiles: any[] = [];
  onChange: Function;

  constructor(private sess: SessionService,
    private files: FileService) { }

  ngOnInit() {
  }
  fileChange(element){
    this.uploadedFiles = element.target.files;
    
  }
  upload(){
    
    let formData = new FormData();
    
      formData.set('file', this.uploadedFiles[0]);
      formData.set('author', this.sess.getFromSession('UserName'));
      this.files.uploadFiles(formData, this.sess.getFromSession('ActualProject'))
      .subscribe(res =>{
        console.log(res);
        let current_project = this.sess.getFromSession('ActualProject');
        this.files.getFilesInfo(current_project);
      });
  }

  
}
