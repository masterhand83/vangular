import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectShowCaseComponent } from './components/project-show-case/project-show-case.component';
import { ProjectGeneralComponent } from './components/project-general/project-general.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { GanttComponent } from './components/gantt/gantt.component';
import { FilesComponent } from './components/files/files.component';
import { EditInformationModalComponent } from './components/edit-information-modal/edit-information-modal.component';
import { CreateActivityModalComponent } from './components/create-activity-modal/create-activity-modal.component';
import { FilesModalComponent } from './components/files-modal/files-modal.component';
import { MessagesModalComponent } from './components/messages-modal/messages-modal.component';
import { AlertsShowCaseComponent } from './components/alerts-show-case/alerts-show-case.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from './services/socket.service';
import {  FileNamePipe } from './pipes/fileimage.pipe';
import { FileSizePipe } from './pipes/filesize.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProjectShowCaseComponent,
    ProjectGeneralComponent,
    GeneralInfoComponent,
    GanttComponent,
    FilesComponent,
    EditInformationModalComponent,
    CreateActivityModalComponent,
    FilesModalComponent,
    MessagesModalComponent,
    AlertsShowCaseComponent,
    NotFoundComponent,
    UsersComponent,
    FileNamePipe,
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule
  ],
  providers: [CookieService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
