import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectShowCaseComponent } from './components/project-show-case/project-show-case.component';
import { ProjectGeneralComponent } from './components/project-general/project-general.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { GanttComponent } from './components/gantt/gantt.component';
import { FilesComponent } from './components/files/files.component';
import { AlertsShowCaseComponent } from './components/alerts-show-case/alerts-show-case.component';
import { UsersComponent } from './components/users/users.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '', redirectTo: 'projects', pathMatch: 'full'
      }, {
        path: 'projects', component: ProjectShowCaseComponent,
      }, 
      {
        path: 'project/:id', component: ProjectGeneralComponent,
        children: [
          { path: '', redirectTo: 'general', pathMatch: 'full' },
          { path: 'general', component: GeneralInfoComponent },
          { path: 'gantt', component: GanttComponent },
          { path: 'files', component: FilesComponent },
        ]
      }
      , {
        path: 'alerts', component: AlertsShowCaseComponent
      },
      {
        path: 'users', component: UsersComponent
      },
      {
        path: '**', component: NotFoundComponent
      }

    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
