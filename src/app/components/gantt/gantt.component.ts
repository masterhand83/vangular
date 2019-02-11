import { Component, OnInit } from '@angular/core';
import { IActivity } from 'src/app/rgantt/IActivity';
import { GanttManager } from 'src/app/rgantt/GanttManager';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {
  activs: IActivity[] = [
    {
      start: new Date(2019, 1, 20),
      end: new Date(2019, 2, 20),
      color: '#ffffff',
      id: 1,
      name: 'activ',
      realid: 'felkfjeñlj'
    },
    {
      start: new Date(2019, 1, 20),
      end: new Date(2019, 3, 20),
      color: '#ffffff',
      id: 2,
      name: 'activ',
      realid: 'felkfjeñlj'
    }
  ];
  constructor() { }

  ngOnInit() {

    const gantt = new GanttManager(this.activs);
    gantt.initialize();
  }

}
