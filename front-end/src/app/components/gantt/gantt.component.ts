import { Component, OnInit } from '@angular/core';
import { IActivity } from 'src/app/rgantt/IActivity';
import { GanttManager } from 'src/app/rgantt/GanttManager';
import { SessionService } from 'src/app/services/session.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {
  activs: IActivity[] = [];
  current_project: string;
  constructor(
    private sess: SessionService,
    private projectService: ProjectService
  ) {
    this.current_project = this.sess.getFromSession('ActualProject');

  }
  getActivities() {
    this.projectService.getActivities(this.current_project).subscribe((response:any[])=>{
      let activs = [];
      for (let act of response){
        activs.push({
          name: act.name,
          start: act.start,
          info: act.id,
          id: act.index,
          end: act.end,
          color: act.color,
          realid: act.id
        });
      }
      const gantt = new GanttManager(activs);
      gantt.initialize();
    });

  }
  ngOnInit() {
    this.getActivities();
  }
}
