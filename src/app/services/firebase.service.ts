import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, ref, set, push, get, remove, update, child, Database } from 'firebase/database';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp;
  private db: Database;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
    this.db = getDatabase(this.app);
  }

  // Guardar mentor
async saveMentor(mentor: any) {
  const mentorRef = push(ref(this.db, 'mentors/'));
  await set(mentorRef, mentor);
  return mentorRef.key;
}

// Obtener mentores
async getMentors() {
  const dbRef = ref(this.db, 'mentors/');
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    return Object.entries(snapshot.val()).map(([id, value]: any) => ({ id, ...value }));
  }
  return [];
}


  // Guardar mentorías
  async saveMentorship(mentorship: any) {
    const mentorshipRef = push(ref(this.db, 'mentorships/'));
    await set(mentorshipRef, mentorship);
    return mentorshipRef.key;
  }

  // Obtener todas las mentorías
  async getMentorships() {
    const dbRef = ref(this.db, 'mentorships/');
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(([id, value]: any) => ({ id, ...value }));
    }
    return [];
  }

  // Actualizar una mentoría
  async updateMentorship(id: string, data: any) {
    const mentorshipRef = ref(this.db, `mentorships/${id}`);
    await update(mentorshipRef, data);
  }

  // Eliminar una mentoría
  async deleteMentorship(id: string) {
    const mentorshipRef = ref(this.db, `mentorships/${id}`);
    await remove(mentorshipRef);
  }
}
