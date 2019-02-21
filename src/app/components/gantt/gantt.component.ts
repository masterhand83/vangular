import { Component, OnInit } from '@angular/core';
import { IActivity } from 'src/app/rgantt/IActivity';
import { GanttManager } from 'src/app/rgantt/GanttManager';
import { SessionService } from 'src/app/services/session.service';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { element } from '@angular/core/src/render3';
declare var $: any;
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})

export class GanttComponent implements OnInit {ç
  objectives: any[];
  deliverables: any[];
  activs: IActivity[] = [];
  current_project: string;
  selected_activity: string;
  $activity: Observable<any>;
  constructor(
    private sess: SessionService,
    private projectService: ProjectService
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
      gantt.onclick((e,data) => {
        this.selected_activity = data;
        this.$activity = this.projectService.getActivity(data);
        console.log(data);
        setTimeout(() => {
          $('#activity-info-modal').modal('show');
          this.getObjectives();
          this.getDeliverables();
        }, 500);
      });
    });

  }
  ngOnInit() {
    this.getActivities();
  }

  EditActivity(form: any) {
    //console.log(f);
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
}
