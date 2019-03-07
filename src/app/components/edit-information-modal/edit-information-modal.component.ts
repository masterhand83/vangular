import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { ProjectService } from 'src/app/services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { IUser } from 'src/app/models/IUser';
import { UsersService } from 'src/app/services/users.service.1';
import { SecurityService } from 'src/app/services/security.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { InternalFormsSharedModule } from '../../../../node_modules/@angular/forms/src/directives';
declare var $: any;
@Component({
  selector: 'app-edit-information-modal',
  templateUrl: './edit-information-modal.component.html',
  styleUrls: ['./edit-information-modal.component.css']
})
export class EditInformationModalComponent implements OnInit {
  @ViewChild('updatecorrect') private updatecorrect: SwalComponent;
  @ViewChild('updateincorrect') private updateincorrect: SwalComponent;
  @ViewChild('dateincorrect') private dateincorrect: SwalComponent;
  @Input() actualProject: any;
  actual_project: string;
  $project_info: Observable<any>;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private user: UsersService,
    private crypto: SecurityService,

  ) { }
  residentes: IUser[] = [];
  proyectistas: IUser[] = [];
  resident: string;
  ngOnInit() {
    this.actual_project = this.actualProject;
    this.$project_info = this.projectService.getProject(this.actual_project);
    this.getDesigners();
    this.getResidents();

  }
  editInformation(values: any) {
    console.log(values);

    const localReception = moment(values.fecha_recepcion).format('YYYY-MM-DD');
    const furnitureDate = moment(values.fecha_pedido).format('YYYY-MM-DD');
    const openingDate = moment(values.fecha_apertura).format('YYYY-MM-DD');
    const actualDay = moment().format('YYYY-MM-DD');
    console.log(localReception);
    console.log(actualDay);

    if (localReception < actualDay || furnitureDate < actualDay || openingDate < actualDay) {
      this.dateincorrect.show();
    } else {
      this.projectService.setInformation(this.actual_project, values).subscribe((result) => {
        $('#edit-info-modal').modal('hide');
        setInterval(() => {
          location.reload();
        }, 500);
      });
    }

  }

  // obtiene los residentes
  getResidents() {
    this.user.getResidents().subscribe((response: IUser[]) => {
      // console.log(response);
      for (const element of response) {
        const res = this.crypto.decrypt(element);
        this.residentes.push(<IUser>res);
      }
    });
  }

  getDesigners() {
    this.user.getDesigners().subscribe((response: IUser[]) => {
      for (const element of response) {
        const res = this.crypto.decrypt(element);
        this.proyectistas.push(<IUser>res);
      }
    });
  }

  updateResident(form: NgForm) {
    if (form.value.resident != null) {
    this.projectService.changeResident(this.actual_project, form.value.resident)
      .subscribe(res => {
        console.log(res);
        this.updatecorrect.show();
      });
    } else {
      this.updateincorrect.show();
    }
  }

  updateDesigner(form: NgForm) {
    if (form.value.designer != null) {
    this.projectService.changeDesigner(this.actual_project, form.value.designer)
      .subscribe(res => {
        console.log(res);
        this.updatecorrect.show();

      });
    } else {
      this.updateincorrect.show();
    }
  }
  parseDate(input: string) {
    return input;
  }




}
