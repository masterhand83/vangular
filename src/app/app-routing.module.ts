import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectShowCaseComponent } from './components/project-show-case/project-show-case.component';
import { ProjectGeneralComponent } from './components/project-general/project-general.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '', redirectTo: 'projects',pathMatch: 'full'
      },{
        path: 'projects',component: ProjectShowCaseComponent,
        children: [
          {
            path: 'project/:id',
            component: ProjectGeneralComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
