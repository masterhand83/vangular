import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import * as moment from 'moment';
import { ProjectService } from 'src/app/services/project.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-create-activity-modal',
  templateUrl: './create-activity-modal.component.html',
  styleUrls: ['./create-activity-modal.component.css']
})
export class CreateActivityModalComponent implements OnInit {
  @ViewChild('dateincorrect') private dateincorrect: SwalComponent;
  userType: any;
  current_objectives: string[];
  current_entregable: string[];
  current_id:string;
  constructor(
    private projectService: ProjectService,
    private sess: SessionService
  ) { 
    this.current_objectives = [];
    this.current_entregable = [];
  }

  ngOnInit() {
    this.current_id = this.sess.getFromSession('ActualProject');
  }
  pushNewObjective(obj:string){
    this.current_objectives.push(obj);
  }
  pushNewEntregable(ent:string){
    this.current_entregable.push(ent);
  }
  getToday(){
    return moment().toDate();
  }
  getAhead(){
    return moment().add(1,'day').toDate();
  }
  createActivity(form: NgForm){

    var start=moment(form.value.start).format('YYYY-MM-DD');
    var end=moment(form.value.end).format('YYYY-MM-DD');
    var actualDay=moment().format('YYYY-MM-DD');
    if(start<actualDay || end <actualDay || end<start){

      this.dateincorrect.show();

    }

    else{
      console.log(form.value);
      let val = form.value;
      this.projectService.addActivity({
        name: val.name,
        description: val.description,
        start: val.start,
        end: val.end,
        priority: val.priority,
        objective: this.current_objectives,
        deliverable: this.current_entregable
      },this.current_id).subscribe(res =>{
        console.log(res);
      })
      location.reload();
    }
    
  }
}
