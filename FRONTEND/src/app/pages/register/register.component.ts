import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatBotComponent } from '../../components/chat-bot/chat-bot.component';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavegationComponent, FooterComponent, ChatBotComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  selectedFile?: File; // Propiedad para manejar el archivo seleccionado
  isSubmitting: boolean = false; // Nueva propiedad para indicar el estado de envío

  @ViewChild('fileInput') fileInput?: ElementRef; // Referencia al input de archivo

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
  ) {
    // Inicialización de formulario con FormBuilder
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      telefono: [null, Validators.required],
      direccion: ['', Validators.required],
      imagenPerfil: [''] // Este es opcional, no lo marcamos como requerido
    });
  }

  ngOnInit(): void {}

  get nombreControl() {
    return this.registroForm.get('nombre');
  }

  get correoElectronicoControl() {
    return this.registroForm.get('correoElectronico');
  }

  get contrasenaControl() {
    return this.registroForm.get('contrasena');
  }

  get telefonoControl() {
    return this.registroForm.get('telefono');
  }

  get direccionControl() {
    return this.registroForm.get('direccion');
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.isSubmitting = true; // Establece isSubmitting en true

      const formData = new FormData();
      formData.append('nombre', this.registroForm.value.nombre);
      formData.append('correoElectronico', this.registroForm.value.correoElectronico);
      formData.append('contrasena', this.registroForm.value.contrasena);
      formData.append('telefono', this.registroForm.value.telefono);
      formData.append('direccion', this.registroForm.value.direccion);
  
      if (this.selectedFile) {
        formData.append('imagenPerfil', this.selectedFile);
      }

      this.userService.postUser(formData).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Éxito',
            text: 'Usuario registrado con éxito',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Limpiar el formulario después de mostrar el mensaje de éxito
            this.registroForm.reset();
            this.selectedFile = undefined;
            this.isSubmitting = false; // Restablece isSubmitting a false
            setTimeout(() => {
              this.router.navigate(['/login']);
              this.cdRef.detectChanges(); 
            }, 0); // Opcional: Limpiar el archivo seleccionado
            // Limpiar el input de archivo en el DOM
            if (this.fileInput) {
              this.fileInput.nativeElement.value = '';
            }
          });
        },
        error: (error) => {
          this.isSubmitting = false; // Restablece isSubmitting a false al recibir un error
          this.clearFormErrors(); // Limpia los errores del formulario
          // Manejar errores específicos basados en la respuesta del servidor
          const errorMessage = error.error.message || 'Error al registrar usuario';
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Formulario no válido',
        text: 'Por favor, revisa los campos del formulario.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

  private clearFormErrors(): void {
    Object.keys(this.registroForm.controls).forEach(key => {
      const control = this.registroForm.get(key);
      if (control) {
        control.setErrors(null);
      }
    });
  }
}