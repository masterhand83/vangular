import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from './constants.data';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly IP = constants.IP;
  constructor(
    private http: HttpClient
  ) { }
  createProject(name: string,description: string, idUser1: string,idUser2: string, idUser3: string){
      return this.http.post(`http://${this.IP}:3000/api/projects/project`, {
        name: name,
        description: description,
        idUser1: idUser1,
        idUser2: idUser2,
        idUser3: idUser3
      });
  }
  getUserProjects(user_id: string) {
    // console.log(`http://${this.IP}:3000/api/users/project/${user_id}`);
    return this.http.get(`http://${this.IP}:3000/api/users/project/${user_id}`);
  }
}
