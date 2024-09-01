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
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

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
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private loginService: LoginService,
    private storageService: StorageService,
    private router: Router,
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
          console.log('decoded', decoded);
          this.profileService.getUserProfile().subscribe({
            next: (user) => {
              console.log('user', user.nombre, user.imagenPerfil);
              // Actualiza los valores del formulario con los datos del usuario
              this.profileForm.patchValue({
                nombre: user.nombre,
                correoElectronico: user.correoElectronico,
                telefono: user.telefono,
                direccion: user.direccion,
              });
              this.previewImage = decoded.imagenPerfil ? decoded.imagenPerfil : 'assets/default-profile.png';
              console.log(this.previewImage);
              this.loading = false;
            },
            error: (err) => {
              console.error('Error al cargar la información del perfil', err);
              this.error = 'Error al cargar la información del perfil.';
              this.loading = false;
            }
          });
        } catch (err) {
          console.error('Error al decodificar el token', err);
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
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result; // Vista previa
      };
      reader.readAsDataURL(file); // ruta en base64
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      const formData = new FormData();

      // Añadir los otros campos del formulario
      formData.append('nombre', this.profileForm.get('nombre')?.value);
      formData.append('correoElectronico', this.profileForm.get('correoElectronico')?.value);
      formData.append('telefono', this.profileForm.get('telefono')?.value);
      formData.append('direccion', this.profileForm.get('direccion')?.value);

      // Si hay un archivo seleccionado, añadirlo al FormData
      if (this.selectedFile) {
        formData.append('imagenPerfil', this.selectedFile);
      }

      // Suscribirse al observable de actualización del perfil
      this.profileService.updateUserProfile(formData).subscribe({
        next: (response) => {
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
            this.selectedFile = null;
            this.previewImage = null;

            // Eliminar el token para cerrar sesión
            this.storageService.remove('token');

            // Limpiar cualquier otro dato de la sesión (opcional)
            this.storageService.remove('userData');

            // Notificar al LoginService que la sesión ha terminado
            this.loginService.setAuthStatus(false);

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 100); // Forma correcta de manejar redirección
          });
        },
        error: (err) => {
          console.error('Error al actualizar el perfil', err);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar el perfil.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
}