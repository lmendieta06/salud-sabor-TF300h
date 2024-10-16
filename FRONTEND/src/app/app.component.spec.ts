import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
// Simula navegacion en la aplicacion.
import { Router, NavigationEnd } from '@angular/router';
import { StorageService } from './services/local-storage.service';
// Simula entorno de ejecucion.
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';

// Simula que hay un token o una imagen de perfil, simula StorageService
class MockStorageService {
  load(key: string) {
    if (key === 'token') {
      return 'fake-token';
    }
    if (key === 'userProfile') {
      return JSON.stringify({ imagenPerfil: 'fake-image-url' });
    }
    return null;
  }
}

// Simula el caso de que la navegacion termine, para saber como actuaria en la aplicacion real. Simula router.
class MockRouter {
  events = of(new NavigationEnd(0, 'urlAfter', 'urlBefore'));
}

// Se define que es un grupo de pruebas para AppComponent.
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storageService: MockStorageService;
  let router: MockRouter;

  beforeEach(() => {
    // Se usa para definir que modulos, componentes y servicios se usaran en la prueba.
    TestBed.configureTestingModule({
        // Se usa imports en lugar de declarations porque AppComponent al ser standalone debe ser importado directamente.
      imports: [AppComponent], 
      providers: [
        { provide: StorageService, useClass: MockStorageService },
        { provide: Router, useClass: MockRouter },
        // Simula el entorno del navegador
        { provide: PLATFORM_ID, useValue: 'browser' } 
      ]
    }).compileComponents();

    // Crea una instancia de AppComponent.
    fixture = TestBed.createComponent(AppComponent);
    // Interaccion con el componente.
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router) as unknown as MockRouter;
  });

//   Verifica que se cree correctamente el componente.
  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

//   Verfica que la imagen de perfil de cargue exitosamente
  it('el perfil de usuario se carga correctamente', () => {
    spyOn(console, 'log');
    component.loadUserProfile();
    expect(console.log).toHaveBeenCalledWith('Imagen de perfil:', 'fake-image-url');
  });

//   Debe enviar un mensaje si se recibe un JSON invalido (manejo de errores).
  it('debe manejar el error de que el JSON sea invalido', () => {
    spyOn(storageService, 'load').and.returnValue('invalid-json');
    spyOn(console, 'error');
    component.loadUserProfile();
    expect(console.error).toHaveBeenCalled();
  });

//   Verifica que el token se cargue correctamente
  it('debe cargar el token desde el almacenamiento', () => {
    spyOn(storageService, 'load').and.callThrough();
    spyOn(console, 'log');
    component.ngAfterViewInit();
    expect(storageService.load).toHaveBeenCalledWith('token');
    expect(console.log).toHaveBeenCalledWith('Token encontrado:', 'fake-token');
  });

//   Verifica que se muestre un mensaje en consola si no se encuentra el token
  it('debe manejar el error de que no se encuentre el token', () => {
    spyOn(storageService, 'load').and.returnValue(null);
    spyOn(console, 'log');
    component.ngAfterViewInit();
    expect(console.log).toHaveBeenCalledWith('No hay token disponible.');
  });
});
