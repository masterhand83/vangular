import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body,'bg-gradient-primary')
  }

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body,'bg-gradient-primary');
  }

  ngOnInit() {
  }

}
