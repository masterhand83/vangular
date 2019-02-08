import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-show-case',
  templateUrl: './project-show-case.component.html',
  styleUrls: ['./project-show-case.component.css']
})
export class ProjectShowCaseComponent implements OnInit {
  readonly users = [
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
  ]
  constructor() { }

  ngOnInit() {
  }

}
