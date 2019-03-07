import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
  constructor(private router: Router,
    private route: ActivatedRoute,
    private projects: ProjectService,
    private sess: SessionService
    ) {

  }
  $project: Observable<any>;
  current_id: any = 'id';
  project_info: any = {info: null};
  @ViewChild('deleteok') private deleteok: SwalComponent;
  @ViewChild('askdelete') private askdelete: SwalComponent;

  key: string;
  userType: any;
  ngOnDestroy(): void {

  }

  getProject() {
   // console.log(this.current_id);
    return this.projects.getProject(this.current_id);
  }
  ngOnInit() {
    this.current_id = this.sess.getFromSession('ActualProject');
      this.getProject();
      this.$project = this.getProject();
      // console.log(this.$project);

    this.getUserType();

  }

  askDelete() {
    this.askdelete.show();
  }

  deleteProject() {

      this.projects.deleteProject(this.current_id)
        .subscribe(res => {
          this.sess.deleteProjectSession();
          this.router.navigate([('dashboard/projects')]);
          this.deleteok.show();
        });

  }
  getUserType() {
    this.key = 'UserType';
    this.userType = this.sess.getFromSession(this.key);
    // console.log(this.userType);

  }


}
