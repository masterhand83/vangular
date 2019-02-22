import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
  $project: Observable<any>;
  current_id: any = 'id';
  project_info: any = {info: null};

  constructor(private router: Router,
    private route: ActivatedRoute,
    private projects: ProjectService,
    private sess: SessionService
    ) {

  }
  ngOnDestroy(): void {
    this.sess.deleteProjectSession();
  }

  getProject() {
   // console.log(this.current_id);
    return this.projects.getProject(this.current_id);
  }
  ngOnInit() {
    this.current_id = this.sess.getFromSession('ActualProject');
      this.getProject();
      this.$project = this.getProject();
      console.log(this.$project);
  }

}
