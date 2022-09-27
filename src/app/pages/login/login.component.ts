import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData ={
    "username": '',
    "password": ''
  }

  constructor(private snack:MatSnackBar, 
    private loginService:LoginService,
    private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        
        console.log(data)
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user:any) => {
            this.loginService.setUser(user);
          

            if ( this.loginService.getUserRole() == "ADMIN" ) {
              window.location.href = '/admin';
              // this.router.navigate(['admin']);
              this.loginService.loginStatusSubjec.next(true);
            } else if (  this.loginService.getUserRole() == "NORMAL"  ) {
              window.location.href = '/user';
              this.loginService.loginStatusSubjec.next(true);
            }
            else{
              this.loginService.closeSession();
            }
          }
        );
      },(error) => {
        console.log(error)
        this.snack.open('Detalles invalidos, vuelva a intentar', 'Aceptar',{duration:3000 })
      }
    );
}

  
}