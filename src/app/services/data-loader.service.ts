import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from './firebase.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {}

  // Cargar JSON local
  async loadJSONData() {
    const data: any = await firstValueFrom(this.http.get('assets/data/mentorships.json'));
    return data;
  }

  // Subir datos del JSON a Firebase
  async uploadDataToFirebase() {
    const data = await this.loadJSONData();

    // Subir mentorías
    if (data.mentorships && data.mentorships.length > 0) {
      for (const mentorship of data.mentorships) {
        await this.firebaseService.saveMentorship(mentorship);
      }
      console.log('✅ Mentorías cargadas correctamente en Firebase');
    }

    // Subir mentores
    if (data.mentors && data.mentors.length > 0) {
      for (const mentor of data.mentors) {
        await this.firebaseService.saveMentor(mentor);
      }
      console.log('✅ Mentores cargados correctamente en Firebase');
    }
  }
}
