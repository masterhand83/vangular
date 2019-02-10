import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-project-show-case',
  templateUrl: './project-show-case.component.html',
  styleUrls: ['./project-show-case.component.css']
})
export class ProjectShowCaseComponent implements OnInit {
  users = [
    {
      proyecto: 'masterhand',
      nombre: 'Jesus',
      progreso: 25
    },
    {
      proyecto: 'angular',
      nombre: 'ronaldihno',
      progreso: 50
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }
  createProject(f: NgForm) {
    const data = f.value;

    this.users.push({
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
