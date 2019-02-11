import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.renderer.removeAttribute(document.body, 'id', 'page-top');
  }

  constructor(
    private renderer: Renderer2,
    private sess: SessionService) {
    this.renderer.setAttribute(document.body, 'id', 'page-top');
  }

  ngOnInit() {
    this.sess.validateSession();
  }

}
