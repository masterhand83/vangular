import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-project-general',
  templateUrl: './project-general.component.html',
  styleUrls: ['./project-general.component.css']
})
export class ProjectGeneralComponent implements OnInit {
  current_id: string;
  project_info: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projects: ProjectService,
    private sess: SessionService
    ) {
    this.current_id = this.sess.getFromSession('ActualProject');
  }

  ngOnInit() {
    
  }
  /**
   * Optiente 
   */
  
  goTo(dir: string) {
    this.router.navigate([`./${dir}`], { relativeTo: this.route });
  }
}
