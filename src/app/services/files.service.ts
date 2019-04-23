import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from './constants.data';
import { IFile } from '../models/IFile';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileService{
    constructor(private http: HttpClient) { }
    readonly IP = constants.IP;
    getFilesInfo(idproject: string): Observable<IFile[]>{
        return this.http.get<IFile[]>(`http://${this.IP}:3000/api/projects/file/${idproject}`);
    }
    uploadFiles(data: FormData, id: string): Observable<any> {
        return this.http.post(`http://${this.IP}:3000/api/projects/file/${id}`, data);
    }
    download_project(data: FormData, projectId: string): Observable<any>{
        return  this.http.post(`http://${this.IP}:3000/api/pdfs/pdf/${projectId}`, data,{responseType: 'blob'});
    }
}