import { Component, inject } from '@angular/core';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatBotComponent } from '../../components/chat-bot/chat-bot.component';
import { RouterLink } from '@angular/router';
import { Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../../interfaces/credentials';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavegationComponent, FooterComponent, ChatBotComponent,RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
// inyeccion de servicio
  loginService = inject(LoginService);


  @Input() toggleRegister: () => void = () => {};



   // Conectar nuestro formulario con nuestro grupo y añadir validaciones
   credentialForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

 // Estado para manejar el envío del formu
 isSubmitting = false;

  // Get para acceder a los controles del formulario en la plantilla email y pass
 get emailControl() {
  return this.credentialForm.get('email');
}
get passwordControl() {
  return this.credentialForm.get('password');
}


  // Método para obtener las credenciales del formulario
    
     getCredentials(): Credentials | null {
      const { email, password } = this.credentialForm.value;
      return email && password ? { email, password } : null;
    }
   

  // Método para controlar el submit del formulario
  handleSubmint() {
    if (this.credentialForm.invalid) return;

    this.isSubmitting = true;
    const credenciales = this.getCredentials();
    if (credenciales) {
      this.loginService.login(credenciales).subscribe({
        next: (res: any) => {
          if (res) {
            localStorage.setItem('token', res.tokenGenerado);
            this.loginService.redirect();
            Swal.fire({
              icon: 'success',
              title: 'Login exitoso',
              text: 'Has iniciado sesión correctamente',
              timer: 2000,
              showConfirmButton: false
            });
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.mensaje || 'Ha ocurrido un error al iniciar sesión',
            timer: 3000,
            showConfirmButton: false
          });
          this.credentialForm.reset();
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.isSubmitting = false;
    }
  }
}



