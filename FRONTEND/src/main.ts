import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app/app.component';

// Agrega el `provideHttpClient(withFetch())` en la configuración de `appConfig`
const appConfigWithHttpClient = {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],
    provideHttpClient(withFetch())
  ]
};

bootstrapApplication(AppComponent, appConfigWithHttpClient)
  .catch((err) => console.error(err));