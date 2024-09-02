
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service'; // Asegúrate de importar el servicio correctamente
import Swal from 'sweetalert2';
import { NavegationComponent } from '../navegation/navegation.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule, NavegationComponent, FooterComponent],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent implements OnInit {
  recoverForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.recoverForm.valid) {
      this.isSubmitting = true;

      const email = this.recoverForm.value.email;

      this.userService.recoverPassword(email).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Éxito',
            text: 'Se ha enviado un correo electrónico para restablecer la contraseña.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.recoverForm.reset();
            this.isSubmitting = false;
          });
        },
        error: (error) => {
          this.isSubmitting = false;
          Swal.fire({
            title: 'Error',
            text: error.error.message || 'Error al enviar el correo de recuperación.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
}