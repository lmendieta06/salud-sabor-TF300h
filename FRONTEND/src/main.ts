import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

const appConfigWithHttpClient = {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],
    provideHttpClient()
  ]
};

bootstrapApplication(AppComponent, appConfigWithHttpClient)
  .catch((err) => console.error(err));