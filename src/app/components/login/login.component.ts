import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service.1';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  @ViewChild('nonUser') private nonUser: SwalComponent;
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-gradient-primary');
  }

  constructor(
    private renderer: Renderer2,
    private user: UsersService,
    private security: SecurityService,
    private session: SessionService,
    private router: Router) {
    this.renderer.addClass(document.body, 'bg-gradient-primary');

  }

  ngOnInit() {
    this.session.validateSession();
  }


  login(data: any) {
    this.user.loginUser(data.email, data.password).subscribe((response: any[]) => {
      if  (response.length > 0) {
        const user = this.security.decrypt(response);
        this.session.createSession(user);
        this.router.navigateByUrl('/dashboard');
      } else {
        console.log('error');
        this.nonUser.show();
      }
    });
  }
}
