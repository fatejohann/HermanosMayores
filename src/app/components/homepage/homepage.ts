import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CreateMentorshipModalComponent } from '../create-mentorship-modal/create-mentorship-modal';
import { FirebaseService } from '../../services/firebase.service';
import { DataLoaderService } from '../../services/data-loader.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, CreateMentorshipModalComponent],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class HomepageComponent implements OnInit {
  @ViewChild(CreateMentorshipModalComponent)
  private createMentorshipModal!: CreateMentorshipModalComponent;

  userEmail: string = '';
  upcomingMentorships: any[] = [];
  availableMentors: any[] = [];

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private dataLoaderService: DataLoaderService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Verificar si está logueado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.userEmail = this.authService.getUserEmail();

    // 🔄 Cargar datos desde Firebase
    await this.loadMentorships();
    await this.loadMentors();
  }

  // 🧠 Cargar mentorías desde Firebase
  async loadMentorships() {
    this.upcomingMentorships = await this.firebaseService.getMentorships();
  }

  // 🧠 Cargar mentores desde Firebase
  async loadMentors() {
    this.availableMentors = await this.firebaseService.getMentors();
  }

  // 🚀 Subir datos del JSON local a Firebase (solo para inicializar)
  async uploadInitialData() {
    if (confirm('¿Seguro que deseas subir los datos del JSON a Firebase?')) {
      await this.dataLoaderService.uploadDataToFirebase();
      alert('✅ Datos cargados correctamente.');
      await this.loadMentorships();
      await this.loadMentors();
    }
  }

  // 🔒 Cerrar sesión
  logout(): void {
    this.authService.logout();
  }

  bookMentorship(mentor: any): void {
    alert(`Solicitud de mentoría enviada a ${mentor.name}`);
  }

  viewMentorshipDetails(mentorship: any): void {
    alert(`Detalles de mentoría con ${mentorship.mentor}`);
  }

  addNewMentorship(): void {
    this.createMentorshipModal.isEditMode = false;
    this.createMentorshipModal.mentors = this.availableMentors;
    this.createMentorshipModal.show();
  }

  editMentorship(mentorship: any): void {
    this.createMentorshipModal.isEditMode = true;
    this.createMentorshipModal.mentors = this.availableMentors;
    this.createMentorshipModal.mentorship = { ...mentorship };
    this.createMentorshipModal.show();
  }

  async deleteMentorship(mentorship: any) {
    if (confirm('¿Estás seguro de que deseas eliminar esta mentoría?')) {
      await this.firebaseService.deleteMentorship(mentorship.id);
      this.upcomingMentorships = this.upcomingMentorships.filter(m => m.id !== mentorship.id);
    }
  }

  async onMentorshipSave(event: any) {
    if (event.action === 'create') {
      const id = await this.firebaseService.saveMentorship(event.mentorship);
      this.upcomingMentorships.push({ id, ...event.mentorship });
    } else if (event.action === 'update') {
      await this.firebaseService.updateMentorship(event.mentorship.id, event.mentorship);
      const index = this.upcomingMentorships.findIndex(m => m.id === event.mentorship.id);
      if (index !== -1) {
        this.upcomingMentorships[index] = event.mentorship;
      }
    }
  }
}
