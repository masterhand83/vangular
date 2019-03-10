import { Injectable } from '@angular/core';
import { constants } from './constants.data';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  savemessage_var: Observable<any> = null;
  message_obs: Observable<any> = null;
  readonly url = `http://${constants.IP}:3000`;
  private socket;
  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  public sendMessage(message, project) {
    this.socket.emit('new-message', {msg: message, room: project});
  }

  public joinProject(projectID: string) {
    this.socket.emit('join-project', projectID);
  }

  public saveMessage(projectID: string, msg: string, author: string) {
    return  this.http.post(`${this.url}/api/projects/message/${projectID}`, {
      authorName: author,
      message: msg
    });
  }

  public getMessages(projectID: string) {
    return this.http.get<{authorName: string, message: string}[]>(`${this.url}/api/projects/message/${projectID}`);
  }


  public streamMessages = () => {
    return new Observable(observer => {
      const {next, error} = observer;
      this.socket.on('new-message', message => {
        observer.next(message);
      });
    });
  }
}
