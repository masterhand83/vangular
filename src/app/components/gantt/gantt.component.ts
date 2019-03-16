import { Component, OnInit, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { IActivityConfig } from 'src/app/Rgantt/src/interfaces/IActivity.config';
import { GanttManager } from 'src/app/Rgantt/src/gantt/ganttManager';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { SessionService } from 'src/app/services/session.service';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3';
import * as moment from 'moment';
import { NgLocalization } from '@angular/common';
import { asTextData } from '../../../../node_modules/@angular/core/src/view';
declare var $: any;
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})

export class GanttComponent implements OnInit {
  
  @ViewChild('dateincorrect') private dateincorrect: SwalComponent;
  objectives: any[];
  deliverables: any[];
  activs: IActivityConfig[] = [];
  current_project: string;
  selected_activity: string;
  $activity: Observable<any>;
  key: string;
  userType: any;
  key2: string;
  nameproject: any;
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
          start: moment.utc(act.start).utc(false),
          data: act.id,
          index: act.index,
          end: moment.utc(act.end).utc(false),
          color: act.color
        });
      }

      const gantt = new GanttManager();
      gantt.init(activs);
      /*gantt.initialize();*/
      gantt.onActivityClick((data) => {
        //console.log(data);
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
    this.getNameProject();
    if (this.userType == '3') {
      this.router.navigateByUrl(`/dashboard/projects`);
    }
    this.getActivities();

  }

  EditActivity(form: any) {

    var start=moment(form.inicio).format('YYYY-MM-DD');
    var end=moment(form.final).format('YYYY-MM-DD');
    var actualDay=moment().format('YYYY-MM-DD');

    if(end<start){

      this.dateincorrect.show();

    }
    else{
    // console.log(f);
    this.projectService.putActivity(this.selected_activity, form, this.objectives, this.deliverables).subscribe((response: any) => {
      console.log(response);
    });
    // this.getActivities();
    $('#activity-info-modal').modal('hide');
    location.reload();
    }
    
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
    return moment.utc(input.substring(0,input.length-1)).toDate();
  }


  getUserType() {
    this.key = 'UserType';
    this.userType = this.sess.getFromSession(this.key);
    //console.log(this.userType);

  }

  getNameProject() {
    this.key2 = 'NameProject';
    this.nameproject = this.sess.getFromSession(this.key2);
  }

  verifyElements(type: string, id: string,name:string) {
    switch (type) {
      case 'objectives':
        let description='Se han verificado los objetivos en la actividad: '+name+' del proyecto: '+this.nameproject;
        this.projectService.addAlert(this.current_project,description).subscribe(res=>{
        })
        this.projectService.verifyObjectives(id).subscribe(res => {
          console.log(res);
        });
        break;
      case 'deliverables':
        let description2='Se han verificado los objetivos en la actividad: '+name+' del proyecto: '+this.nameproject;
        this.projectService.addAlert(this.current_project,description2).subscribe(res=>{
        })
        this.projectService.verifyDeliverables(id).subscribe(res => {
          console.log(res);
        });
        break;
      default:
        break;
    }
  }

  
  commentActivity(comment: string, id: string, name:string) {
    let alert_description=`Se comento: ${comment} en la actividad: ${name} del proyecto ${this.nameproject}`;
    let author = this.sess.getFromSession('UserName');
    this.projectService.addAlert(this.current_project,alert_description).subscribe(res=>{
    })

    this.projectService.commentActivity({ authorName: author, comment }, id).subscribe(res => {
      console.log(res);
    })
    setTimeout(() => {
      location.reload();
    }, 400);
  }

  setStarted(type:number, id:string, value:boolean,name:string){
    var description='Se inicio actividad: '+name+' del proyecto: '+this.nameproject;
    this.projectService.addAlert(this.current_project,description).subscribe(res=>{
    })
    this.projectService.setActivityStatus(type,id,value).subscribe(response =>{
      console.log(response);
    })
    location.reload();
  }

  endActivity(id:string,name:string){
    var description='Se finalizo actividad: '+name+' del proyecto: '+this.nameproject;
    this.projectService.addAlert(this.current_project,description).subscribe(res=>{
    })
    this.projectService.setActivityStatus(1,id,true).subscribe(response =>{
      console.log(response);
    });
    location.reload();
  }

}
