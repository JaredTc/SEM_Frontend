import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',

  }
  constructor( private userService: UserService,
    private snack:MatSnackBar) { }

  ngOnInit(): void {
  }
  formSubmit(){
    console.log(this.user);
    if(this.user.username == ''  || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido','Aceptar',{
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario Guardado','Usuario Registrado con exito en el sistema', 'success');

      },(error) =>{
        console.log(error);
          this.snack.open('Ha Ocurrido un error en el sistema','Aceptar',{
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      }
    )
  }

}
