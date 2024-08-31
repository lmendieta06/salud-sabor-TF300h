import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { NavegationComponent } from '../../components/navegation/navegation.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../../interfaces/user';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from '../../services/local-storage.service';
import Swal from 'sweetalert2';
interface TokenPayload {
  id: string;
  name: string;
  imagenPerfil: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavegationComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  profileForm: FormGroup;
  loading = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Configuración del formulario reactivo
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      imagenPerfil: [''] // Campo para la imagen de perfil
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.storageService.load('token');
      if (token) {
        try {
          const decoded: TokenPayload = jwtDecode(token);
          this.profileService.getUserProfile().subscribe(user => {
            // Actualiza los valores del formulario con los datos del usuario
            this.profileForm.patchValue({
              nombre: user.nombre,
              correoElectronico: user.correoElectronico,
              telefono: user.telefono,
              direccion: user.direccion,
              imagenPerfil: user.imagenPerfil ? `http://localhost:2000/uploads/${user.imagenPerfil}` : 'assets/default-profile.png'
            });

            this.loading = false;
          }, error => {
            this.error = 'Error al cargar la información del perfil.';
            this.loading = false;
          });
        } catch (err) {
          this.error = 'Error al cargar el token.';
          this.loading = false;
        }
      } else {
        this.error = 'Token no disponible.';
        this.loading = false;
      }
    } else {
      this.error = 'localStorage no está disponible en el servidor.';
      this.loading = false;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Actualiza el valor de imagenPerfil en el formulario con la imagen cargada
        this.profileForm.patchValue({
          imagenPerfil: e.target.result
        });
      };
      reader.readAsDataURL(file); // Convierte la imagen en una URL de datos
    }
  }
// Método para enviar el formulario


    updateProfile(): void {
      if (this.profileForm.valid) {
        const formData = new FormData();
  
        Object.keys(this.profileForm.value).forEach(key => {
          formData.append(key, this.profileForm.get(key)?.value);
        });
        console.log('Valores del formulario:', this.profileForm.value);
        console.log('Valores del formdata:', formData);

        this.profileService.updateUserProfile(formData).subscribe(

          (response) => {
            console.log(response);
            Swal.fire({
              title: 'Éxito',
              text: 'Perfil actualizado con éxito. Debe iniciar sesión para verificar los cambios.',
              icon: 'success',
              confirmButtonText: 'OK'
              
            }).then(() => {

              // Limpiar el formulario
              this.profileForm.reset();
              // Limpiar el archivo seleccionado
              this.storageService.remove('token'); // Eliminar el token para cerrar sesión
              window.location.href = '/login'; // Redirigir al usuario a la página de inicio de sesión
            });
          },
          (error) => {
            console.error('Error al actualizar el perfil', error);
            Swal.fire({
              title: 'Error',
              text: 'Error al actualizar el perfil.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      } else {
        Swal.fire({
          title: 'Formulario no válido',
          text: 'Por favor, complete todos los campos.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      }
    }
  }




