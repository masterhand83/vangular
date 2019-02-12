import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('logoutModal') private logout_modal: SwalComponent;
  ngOnDestroy(): void {
    this.renderer.removeAttribute(document.body, 'id', 'page-top');
  }

  constructor(
    private renderer: Renderer2,
    private sess: SessionService) {
    this.sess.validateSession();
    this.renderer.setAttribute(document.body, 'id', 'page-top');
  }

  ngOnInit() {

  }
  askLogout() {
    this.logout_modal.show();
  }
  logout() {
    this.sess.deleteSession();
  }
}
