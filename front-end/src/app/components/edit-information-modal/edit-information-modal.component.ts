import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-edit-information-modal',
  templateUrl: './edit-information-modal.component.html',
  styleUrls: ['./edit-information-modal.component.css']
})
export class EditInformationModalComponent implements OnInit {
  @Input() actualProject: any;
  actual_project: string;
  $project_info: Observable<any>;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.actual_project = this.actualProject;
    this.$project_info = this.projectService.getProject(this.actual_project);

  }
  editInformation(values: any) {
    console.log(values);
    this.projectService.setInformation(this.actual_project, values).subscribe((result) => {
      $('#edit-info-modal').modal('hide');
      setInterval(() => {
        location.reload();
      }, 500);
    });
  }
}
