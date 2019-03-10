import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from 'net';
import { SocketService } from 'src/app/services/socket.service';
import { SessionService } from 'src/app/services/session.service';
import { Observable, Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-messages-modal',
  templateUrl: './messages-modal.component.html',
  styleUrls: ['./messages-modal.component.css']
})
export class MessagesModalComponent implements OnInit, OnDestroy {
  userName: string;
  currentProject = '';
  message: string;
  messages: {authorName: string, message: string}[] = [];
  // $messages: Observable<any>;
  Smessages: Subscription;
  constructor(private chatService: SocketService, private sess: SessionService) { }

  ngOnInit() {
    this.userName = this.sess.getFromSession('UserName');
    this.currentProject = this.sess.getFromSession('ActualProject');
    this.chatService.joinProject(this.currentProject);
    this.getMessages();
    this.chatService.streamMessages().subscribe((mess: any) => {
      //console.log(mess);
      this.messages.push({
        authorName: mess.message.authorName,
        message: mess.message.msg
      });
    });


  }
  ngOnDestroy(): void {
    this.Smessages.unsubscribe();
  }
  sendMessage() {
    const name = this.userName;
    const mensaje = isNullOrUndefined(this.message) ? '...mensaje vacio...' : this.message;
    this.chatService.saveMessage(
      this.currentProject,
      mensaje,
      this.userName
    ).subscribe(res => {
      this.chatService.sendMessage({
        authorName: this.userName,
        msg: mensaje
      }, this.currentProject);
      this.message = '';
    });
  }
  getMessages() {
    const $messages = this.chatService.getMessages(this.currentProject);
    this.Smessages = $messages.subscribe((res => {
      this.messages = res;
    }));
  }
}
