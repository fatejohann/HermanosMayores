import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-mentorship-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-mentorship-modal.html',
  styleUrls: ['./create-mentorship-modal.css']
})
export class CreateMentorshipModalComponent {
  mentorship = {
    id: '',
    subject: '',
    mentor: '',
    date: '',
    time: '',
    description: '',
    status: ''
  };

  // Lista de mentores disponibles
  mentors: any[] = [];
  
  // Modo del modal (crear o editar)
  isEditMode = false;

  isVisible = false;

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
    // Limpiar el formulario
    this.mentorship = {
      id: '',
      subject: '',
      mentor: '',
      date: '',
      time: '',
      description: '',
      status: 'pendiente'
    };
  }

  @Output() save = new EventEmitter<any>();

  onSubmit() {
    if (this.isEditMode) {
      // Emitir evento de actualización
      this.save.emit({
        action: 'update',
        mentorship: this.mentorship
      });
    } else {
      // Emitir evento de creación
      this.save.emit({
        action: 'create',
        mentorship: {
          ...this.mentorship,
          id: Date.now().toString() // Generar ID temporal
        }
      });
    }
    this.hide();
  }
}