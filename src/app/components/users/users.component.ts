import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service.1';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/IUser';
declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('usercorrect') private usercorrect: SwalComponent;
  @ViewChild('userincorrect') private userincorrect: SwalComponent; 
  @ViewChild('updatecorrect') private updatecorrect: SwalComponent;
  @ViewChild('updateincorrect') private updateincorrect: SwalComponent;
  @ViewChild('delete') private delete: SwalComponent;
  @ViewChild('datatable') table;
  dataTable: any;
  constructor(public usersService: UsersService,private sess:SessionService, private router:Router) {

  }

  name: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  userType: any;
  user: any;
  prueba:boolean=true;

  ngOnInit() {
    this.getUserType();
    if(this.userType2!='1'){
      this.router.navigateByUrl(`/dashboard/projects`);
    }
    else{
      this.getUsers();
    }
    this.dataTable = $(this.table.nativeElement);
    
    
    
    
  }

  addUser(form: NgForm) {



    if (form.value.name != "" && form.value.lastname != "" && form.value.email != "" && form.value.mobile != ""
      && form.value.password != "" && form.value.userType != null &&
      form.value.name != undefined && form.value.lastname != undefined && form.value.email != undefined && form.value.mobile != undefined
      && form.value.password != undefined && form.value.userType != undefined

    ) {
      location.reload();
      this.usersService.postUser(form.value)
        .subscribe(res => {
          form.reset();
          
        });
        this.usercorrect.show();

    }
    else {
      this.userincorrect.show();
    }

  }
  getUsers() {
    
    this.usersService.getUsers()
      .subscribe(res => {
        this.usersService.user=res as IUser[];
        console.log(res);
        setTimeout( ()=>{
            this.dataTable.DataTable({
              scrollY: 500,
              bDestroy:true
            });
        },0)
      });

  }
  updateUser(form: NgForm) {

    if(form.value.email2!="" && form.value.mobile2!="" && form.value.password2!="" &&
    form.value.email2!=undefined && form.value.mobile2!=undefined && form.value.password2!=undefined ){
      if (confirm('¿Estas seguro de actualizar?')) {
        this.usersService.putUser(form.value.id2, form.value.email2, form.value.mobile2, form.value.password2)
          .subscribe(res => {
            location.reload();
            this.getUsers();
            this.updatecorrect.show();
          });
      }
    }
    else{
      this.updateincorrect.show();
    }
    
  }
  deleteUser(_id: string) {
    if (confirm('¿Estas seguro de eliminarlo?')) {
      
      this.usersService.deleteUser(_id)
        .subscribe(res => {
          this.getUsers();
          this.delete.show();
        });
        location.reload();
    }

  }

  name2: string = "";
  id2: string = "";
  email2: string = "";
  mobile2: number;
  password2: string = "";
  SelectedUser(name2: string, id2: string, email2: string, mobile2: number, password2: string) {

    this.id2 = id2;
    this.name2 = name2;
    this.email2 = email2;
    this.mobile2 = mobile2;
    this.password2 = password2;

  }

  reppassword: string = '';
  boton: boolean = true;
  checkPasses() {


    if (this.password !== this.reppassword) {

      this.boton = true;
    } else {

      this.boton = false;
    }
  }

  key: string;

  userType2: string;
  getUserType() {
    this.key = "UserType";
    this.userType2 = this.sess.getFromSession(this.key);
    console.log(this.userType2);

  }
}
