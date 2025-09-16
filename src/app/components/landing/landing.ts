import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent {

  features = [
    {
      icon: '🤝',
      title: 'Conexión Directa',
      description: 'Conecta con estudiantes de semestres superiores de tu misma carrera que han pasado por los mismos desafíos.'
    },
    {
      icon: '📚',
      title: 'Apoyo Académico',
      description: 'Recibe orientación personalizada en materias específicas, técnicas de estudio y preparación para exámenes.'
    },
    {
      icon: '💡',
      title: 'Experiencia Real',
      description: 'Aprende de experiencias reales sobre proyectos, trabajos grupales y oportunidades profesionales.'
    },
    {
      icon: '🎯',
      title: 'Orientación Profesional',
      description: 'Obtén consejos sobre especializaciones, prácticas profesionales y el mundo laboral en tu área.'
    },
    {
      icon: '⭐',
      title: 'Comunidad Estudiantil',
      description: 'Forma parte de una red de apoyo donde todos se ayudan mutuamente a crecer académicamente.'
    },
    {
      icon: '🕒',
      title: 'Horarios Flexibles',
      description: 'Agenda sesiones de mentoría en horarios que se adapten a tu rutina académica.'
    }
  ];

  testimonials = [
    {
      name: 'María González',
      program: 'Ingeniería de Sistemas - 7mo semestre',
      text: 'Hermanos Mayores me ayudó a superar Cálculo II. Mi mentor me explicó los conceptos de una manera que nunca había entendido.',
      rating: 5
    },
    {
      name: 'Carlos Rodríguez',
      program: 'Administración - 5to semestre',
      text: 'Gracias a mi mentora pude enfocar mejor mi tesis y entender los procesos de investigación académica.',
      rating: 5
    },
    {
      name: 'Ana López',
      program: 'Psicología - 6to semestre',
      text: 'La experiencia de tener un hermano mayor que me guíe ha sido invaluable para mi crecimiento académico y personal.',
      rating: 5
    }
  ];

  stats = [
    { number: '1,200+', label: 'Estudiantes Conectados' },
    { number: '500+', label: 'Mentores Activos' },
    { number: '95%', label: 'Tasa de Satisfacción' },
    { number: '25', label: 'Carreras Disponibles' }
  ];

  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    // Por ahora redirige al login, después puedes crear la página de registro
    this.router.navigate(['/login']);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}