import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-general',
  templateUrl: './project-general.component.html',
  styleUrls: ['./project-general.component.css']
})
export class ProjectGeneralComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  getParent(): string {
    return '';
  }
  goTo(dir: string) {
    this.router.navigate([`./${dir}`], { relativeTo: this.route });
  }
}
