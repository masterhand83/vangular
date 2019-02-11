import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { ProjectService } from 'src/app/services/project.service';
import { UsersService } from 'src/app/services/users.service.1';
import { IUser } from 'src/app/models/IUser';
declare var $: any;
@Component({
  selector: 'app-project-show-case',
  templateUrl: './project-show-case.component.html',
  styleUrls: ['./project-show-case.component.css']
})
export class ProjectShowCaseComponent implements OnInit {
  // el array de proyectos siempre empieza vacio
  projects: any[] = [];
  residents: IUser[] = [];
  constructor(
    private router: Router,
    private sess: SessionService,
    private project: ProjectService,
    private user: UsersService) {
      this.getProjects();
      this.getResidents();
    }

  ngOnInit() {

  }

  // TODO: arreglar los desvarios de quintero de las id's
  getResidents(){
    this.user.getResidents().subscribe(response =>{
      this.residents.push();
    })
  }
  getProjects() {
    // console.log(this.sess.getFromSession('UserID'));
    this.project.getUserProjects(this.sess.getFromSession('UserID')).subscribe((response: any[]) => {
      // Aqui se obtiene un arreglo de proyectos que permite iterar sobre los demas
      console.log(response);
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

  // TODO: implementar la creacion de proyectos
  createProject(f: NgForm) {
    const data = f.value;

    this.projects.push({
      nombre: ' ...Sin Residente... ',
      proyecto: data.nombre,
      progreso: 6.9
    });
    $('#create-project').modal('hide');
    return false;
  }
  goToProject(projectID: string) {
    this.router.navigateByUrl(`/dashboard/project/${projectID}`);
  }

}
