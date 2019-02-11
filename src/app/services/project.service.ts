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
  createProjects() {
  }
  getUserProjects(user_id: string) {
    // console.log(`http://${this.IP}:3000/api/users/project/${user_id}`);
    return this.http.get(`http://${this.IP}:3000/api/users/project/${user_id}`);
  }
}
