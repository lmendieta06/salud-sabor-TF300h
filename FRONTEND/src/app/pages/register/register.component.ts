import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatBotComponent } from '../../components/chat-bot/chat-bot.component';
import { UserService } from '../../services/user.service'; // Asegúrate de que el servicio esté importado correctamente
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavegationComponent, FooterComponent, ChatBotComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  selectedFile?: File; // Propiedad para manejar el archivo seleccionado
  @ViewChild('fileInput') fileInput?: ElementRef; // Referencia al input de archivo

  constructor(private fb: FormBuilder, private userService: UserService) {
    // Inicialización de formulario con FormBuilder
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      telefono: [null, Validators.required],
      direccion: ['', Validators.required],
      imagenPerfil: [''] // Este es opcional, no lo marcamos como requerido
    });
  }

  ngOnInit(): void {
    // Aquí podrías agregar más lógica si es necesario
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
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
            this.selectedFile = undefined; // Opcional: Limpiar el archivo seleccionado
             // Limpiar el input de archivo en el DOM
             if (this.fileInput) {
              this.fileInput.nativeElement.value = '';
            }
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Error al registrar usuario',
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
}