import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { FileService } from 'src/app/services/files.service';
import { IFile } from 'src/app/models/IFile';
declare var $:any;
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  loading:string;
  
  constructor(private sess:SessionService, private fileService: FileService) { }
  $files: Observable<IFile[]>;
  current_project: string;
  readonly dir: string = location.hostname+':3000';
  ngOnInit() {
    this.current_project = this.sess.getFromSession('ActualProject');
    this.$files = this.fileService.getFilesInfo(this.current_project);
  }

  openOptions(id){
    $('#'+id).collapse('toggle');
  }
  deleteFile(_id:string){
    this.fileService.deleteFile(_id).subscribe(res=>{
      location.reload();
    });
  }
}
