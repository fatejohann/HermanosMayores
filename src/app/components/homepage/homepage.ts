import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { NgIf } from '@angular/common';
import { CreateMentorshipModalComponent } from '../create-mentorship-modal/create-mentorship-modal';


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
  
  // Datos simulados para el prototipo
  upcomingMentorships = [
    {
      id: '1',
      mentor: 'Ana García',
      subject: 'Cálculo Diferencial',
      date: '2025-09-16',
      time: '14:00',
      status: 'confirmada',
      description: ''
    },
    {
      id: '2',
      mentor: 'Carlos López',
      subject: 'Programación Web',
      date: '2025-09-18',
      time: '16:30',
      status: 'pendiente',
      description: ''
    }
  ];

  availableMentors = [
    {
      name: 'María Rodriguez',
      subject: 'Matemáticas',
      rating: 4.8,
      experience: 'cuarto ciclo'
    },
    {
      name: 'Juan Pérez',
      subject: 'Física',
      rating: 4.9,
      experience: 'tercer ciclo'
    },
    {
      name: 'Laura Martínez',
      subject: 'Química',
      rating: 4.7,
      experience: 'cuarto ciclo'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar si está logueado, si no redirigir al login
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.userEmail = this.authService.getUserEmail();
  }

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

  deleteMentorship(mentorship: any): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta mentoría?')) {
      this.upcomingMentorships = this.upcomingMentorships.filter(
        m => m.id !== mentorship.id
      );
    }
  }

  onMentorshipSave(event: any): void {
    if (event.action === 'create') {
      this.upcomingMentorships.push(event.mentorship);
    } else if (event.action === 'update') {
      const index = this.upcomingMentorships.findIndex(
        m => m.id === event.mentorship.id
      );
      if (index !== -1) {
        this.upcomingMentorships[index] = event.mentorship;
      }
    }
  }
}