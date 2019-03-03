import { Component, OnInit, NgZone } from '@angular/core';
import { IActivityConfig } from 'src/app/Rgantt/src/interfaces/IActivity.config';
import { GanttManager } from 'src/app/Rgantt/src/gantt/ganttManager';
import { SessionService } from 'src/app/services/session.service';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3';
import * as moment from 'moment';
import { NgLocalization } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})

export class GanttComponent implements OnInit {
  objectives: any[];
  deliverables: any[];
  activs: IActivityConfig[] = [];
  current_project: string;
  selected_activity: string;
  $activity: Observable<any>;
  key: string;
  userType: any;
  constructor(
    private sess: SessionService,
    private projectService: ProjectService,
    private router: Router,
    private zone: NgZone
  ) {
    this.current_project = this.sess.getFromSession('ActualProject');
    this.objectives = [];
    this.deliverables = [];
  }

  /**
   * Guarda los entregables actuales temporalmente
   * @param entregable el entregable
   */
  pushDeliverables(entregable: any) {
    this.deliverables.push(entregable.value);
  }
  getDeliverables() {
    this.deliverables = [];
    document.querySelectorAll('.entregable').forEach(element => {
      this.deliverables.push((<HTMLInputElement>element).value);
    });
  }


  pushObjective(objetivo: any) {
    this.objectives.push(objetivo.value);
  }
  getObjectives() {
    this.objectives = [];
    document.querySelectorAll('.objetivo').forEach(element => {
      this.objectives.push((<HTMLInputElement>element).value);
    });
    console.log(this.objectives);
  }

  getActivities() {
    this.projectService.getActivities(this.current_project).subscribe((response: any[]) => {
      const activs = [];

      for (const act of response) {

        //this.parseDate(act.start);
        activs.push({
          name: act.name,
          start: act.start,
          data: act.id,
          index: act.index,
          end: act.end,
          color: act.color
        });
      }

      const gantt = new GanttManager();
      gantt.init(activs);
      /*gantt.initialize();*/
      gantt.onActivityClick((data) => {
        console.log(data);
        this.selected_activity = data;
        this.$activity = this.projectService.getActivity(data);
        setTimeout(() => {
          $('#activity-info-modal').modal('show');
          this.getObjectives();
          this.getDeliverables();
        }, 400);
      });
    });

  }
  ngOnInit() {
    this.getUserType();
    if (this.userType == '3') {
      this.router.navigateByUrl(`/dashboard/projects`);
    }
    this.getActivities();
    $('[data-toggle="tooltip"]').tooltip();

  }

  EditActivity(form: any) {
    // console.log(f);
    this.projectService.putActivity(this.selected_activity, form, this.objectives, this.deliverables).subscribe((response: any) => {
      console.log(response);
    });
    // this.getActivities();
    $('#activity-info-modal').modal('hide');
    location.reload();
    /*this.zone.runOutsideAngular(()=>{
      location.reload();
    });*/
  }

  parsePriority(value: number): string {
    switch (value) {
      case 0:
        return 'alta';
        break;
      case 1:
        return 'media';
        break;
      case 2:
        return 'baja';
        break;
      default:
        break;
    }
  }

  parseDate(input: string) {
    return input;
  }


  getUserType() {
    this.key = 'UserType';
    this.userType = this.sess.getFromSession(this.key);
    console.log(this.userType);

  }

  verifyElements(type: string, id: string) {
    switch (type) {
      case 'objectives':
        this.projectService.verifyObjectives(id).subscribe(res => {
          console.log(res);
        });
        break;
      case 'deliverables':
        this.projectService.verifyDeliverables(id).subscribe(res => {
          console.log(res);
        });
        break;
      default:
        break;
    }
  }

  // TODO: Mencionarle a quintero que se necesita el nombre del usuario que se logueó...
  commentActivity(comment: string, id: string) {
    this.projectService.commentActivity({ authorName: 'Anonimo', comment }, id).subscribe(res => {
      console.log(res);
    })
    setTimeout(() => {
      location.reload();
    }, 400);
  }

  setStarted(type:number, id:string, value:boolean){
    this.projectService.setActivityStatus(type,id,value).subscribe(response =>{
      console.log(response);
    })
    location.reload();
  }
}