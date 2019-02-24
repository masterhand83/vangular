import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { UsersService } from '../../services/users.service.1';
import { Router } from '@angular/router';
import { IAlerts } from '../../models/IAlerts';
@Component({
  selector: 'app-alerts-show-case',
  templateUrl: './alerts-show-case.component.html',
  styleUrls: ['./alerts-show-case.component.css']
})
export class AlertsShowCaseComponent implements OnInit {

  constructor(private sess: SessionService, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.getUserType();
    this.getAlerts();
  }

  getAlerts() {

    this.usersService.getAlertUser(this.userID)
      .subscribe(res => {
        this.usersService.alerts = res as IAlerts[];
      });

  }
  deleteAlert(_id: string) {
    this.usersService.deleteAlertUser(_id)
      .subscribe(res => {
    });


  }

  key: string;

  userID: string;
  getUserType() {
    this.key = "UserID";
    this.userID = this.sess.getFromSession(this.key);
    console.log(this.userID);


  }
  goToProject(projectID: string) {
    this.sess.createProjectSession(projectID);
    this.router.navigateByUrl(`/dashboard/project/${projectID}`);
  }

}
