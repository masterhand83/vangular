import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { ProjectService } from 'src/app/services/project.service';
import { UsersService } from 'src/app/services/users.service.1';
import { IUser } from 'src/app/models/IUser';
import { SecurityService } from 'src/app/services/security.service';
import { Observable } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-project-show-case',
  templateUrl: './project-show-case.component.html',
  styleUrls: ['./project-show-case.component.css']
})
export class ProjectShowCaseComponent implements OnInit {
  // Aqui se guarda el id del usuario y sus tipos
  user_id: string;
  user_type: number;
  /**Aqui se guardan todos los proyectos para ser mostrados. Tambien se guardan los residente y proyectistas
   * en caso de crear un proyecto.
   */

  projects: any[];
  residentes: IUser[] = [];
  proyectistas: IUser[] = [];
  constructor(
    private router: Router,
    private sess: SessionService,
    private projectService: ProjectService,
    private user: UsersService,
    private crypto: SecurityService) {
    }

  ngOnInit() {
    this.getUserType();
    this.user_id = this.sess.getFromSession('UserID');
    this.user_type = Number.parseInt(this.sess.getFromSession('UserType'), 10);
    this.getProjects();
    this.getResidents();
    this.getDesigners();
    this.projects = [];

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

  // TODO: comentarle a quintero que solo el primer proyecto creado tiene actividades
  getProjects() {
    this.projectService.getUserProjects(this.user_id).subscribe((response: any[]) => {
      // Aqui se obtiene un arreglo de proyectos que permite iterar sobre los demas
      for (const project of response) {
        // insertamos al array de proyectos cada uno de los proyectos que se reciben
        this.projects.push({
          id: project._id,
          nombre: project.resident,
          proyecto: project.name,
          progreso: project.progress == null ? 0 : project.progress
        });
      }

    });
  }



  // Crea los proyectos
  createProject(f: NgForm) {
    const data = f.value;
    this.projectService.createProject(data.nombre, data.descripcion, this.user_id, data.resident, data.designer).subscribe(response => {
      this.projects = [];
      this.getProjects();
      $('#create-project').modal('hide');
    });
  }

  goToProject(projectID: string,projectname:string) {
    this.sess.createProjectSession(projectID,projectname);
    this.router.navigateByUrl(`/dashboard/project/${projectID}`);
  }

  key: string;

  userType: string;
  getUserType() {
    this.key = "UserType";
    this.userType = this.sess.getFromSession(this.key);
    console.log(this.userType);

  }

}
