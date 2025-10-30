import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment';

// Inicializar Firebase
initializeApp(environment.firebaseConfig);

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
