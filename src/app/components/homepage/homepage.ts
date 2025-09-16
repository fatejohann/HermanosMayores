import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class HomepageComponent implements OnInit {
  userEmail: string = '';
  
  // Datos simulados para el prototipo
  upcomingMentorships = [
    {
      mentor: 'Ana García',
      subject: 'Cálculo Diferencial',
      date: '2025-09-16',
      time: '14:00',
      status: 'confirmada'
    },
    {
      mentor: 'Carlos López',
      subject: 'Programación Web',
      date: '2025-09-18',
      time: '16:30',
      status: 'pendiente'
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
}