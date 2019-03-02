import { Component, OnInit } from '@angular/core';
import { IActivityConfig } from 'src/app/Rgantt/src/interfaces/IActivity.config';
import { GanttManager } from 'src/app/Rgantt/src/gantt/ganttManager';
import { SessionService } from 'src/app/services/session.service';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3';
import  * as moment from "moment";
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
    private router:Router
  ) {
    this.current_project = this.sess.getFromSession('ActualProject');
    this.objectives = [];
    this.deliverables = [];
  }

  /**
   * Guarda los entregables actuales temporalmente
   * @param entregable el entregable
   */
  pushDeliverables(entregable: any){
    this.deliverables.push(entregable.value)
  }
  getDeliverables(){
    this.deliverables = [];
    document.querySelectorAll('.entregable').forEach(element =>{
      this.deliverables.push((<HTMLInputElement>element).value);
    });
  }

  
  pushObjective(objetivo: any){
    this.objectives.push(objetivo.value);
  }
  getObjectives(){
    this.objectives = [];
    document.querySelectorAll('.objetivo').forEach(element =>{
      this.objectives.push((<HTMLInputElement>element).value);
    });
    console.log(this.objectives);
  }

  getActivities() {
    this.projectService.getActivities(this.current_project).subscribe((response:any[])=>{
      const activs = [];
      
      for (const act of response){

        this.parseDate(act.start);
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
    if(this.userType=='3'){
      this.router.navigateByUrl(`/dashboard/projects`);
    }
    this.getActivities();
    
  }

  EditActivity(form: any) {
    //console.log(f);
    console.log(form);
    this.projectService.putActivity(this.selected_activity,form,this.objectives, this.deliverables).subscribe((response: any)=>{
      console.log(response);
    });
    //this.getActivities();
    location.reload();
  }

  parsePriority(value: number): string{
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

  parseDate(input: string){
    return input;
  }

  
  getUserType() {
    this.key = "UserType";
    this.userType = this.sess.getFromSession(this.key);
    console.log(this.userType);

  }
}
