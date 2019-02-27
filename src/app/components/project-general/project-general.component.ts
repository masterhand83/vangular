import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-project-general',
  templateUrl: './project-general.component.html',
  styleUrls: ['./project-general.component.css']
})
export class ProjectGeneralComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.sess.deleteProjectSession();
  }
  current_id: string;
  project_info: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sess: SessionService
    ) {
    this.current_id = this.sess.getFromSession('ActualProject');
  }

  ngOnInit() {
    this.getUserType();
    
  }
  /**
   * Optiente 
   */
  
  goTo(dir: string) {
    this.router.navigate([`./${dir}`], { relativeTo: this.route });
  }

 

  key: string;
  userType: string;
  getUserType() {
    this.key = "UserType";
    this.userType = this.sess.getFromSession(this.key);
    console.log(this.userType);

  }

 
}
