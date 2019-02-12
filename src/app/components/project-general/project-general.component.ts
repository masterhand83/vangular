import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-general',
  templateUrl: './project-general.component.html',
  styleUrls: ['./project-general.component.css']
})
export class ProjectGeneralComponent implements OnInit {
  current_id: string;
  constructor(private router: Router, private route: ActivatedRoute) { 
    this.current_id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
  getParent(): string {
    return '';
  }
  goTo(dir: string) {
    this.router.navigate([`./${dir}`], { relativeTo: this.route });
  }
}
