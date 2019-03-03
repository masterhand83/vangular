import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private renderer: Renderer2,
    private sess: SessionService) {
    this.sess.validateSession();
    this.renderer.setAttribute(document.body, 'id', 'page-top');
  }
  @ViewChild('logoutModal') private logout_modal: SwalComponent;

  key: string;

  userType: any;
  ngOnDestroy(): void {
    this.renderer.removeAttribute(document.body, 'id', 'page-top');
  }

  ngOnInit() {
    this.getUserType();
  }
  askLogout() {
    this.logout_modal.show();
  }
  logout() {
    this.sess.deleteSession();
  }
  getUserType() {
    this.key = "UserType";
    this.userType = this.sess.getFromSession(this.key);
    console.log(this.userType);

  }
}
