import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../../interfaces/user';
import { isPlatformBrowser,CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from '../../services/local-storage.service'; // Importa el servicio de almacenamiento

interface TokenPayload {
  id: string;
  name: string;
  imagenPerfil: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
    private storageService: StorageService, // Usa el servicio de almacenamiento
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      imagenPerfil: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.storageService.load('token'); // Usa el servicio para acceder a localStorage
      if (token) {
        try {
          const decoded: TokenPayload = jwtDecode(token);
          this.profileService.getUserProfile().subscribe(user => {
            this.profileForm.patchValue({
              nombre: user.nombre,
              correoElectronico: user.correoElectronico,
              telefono: user.telefono,
              direccion: user.direccion,
              imagenPerfil: user.imagenPerfil || 'assets/default-profile.png' //
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
        this.profileForm.patchValue({
          imagenPerfil: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }



  
}
