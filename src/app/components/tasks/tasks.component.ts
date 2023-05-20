import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

// importamos el modelo de ITask
import { ITask, LEVELS } from 'src/app/models/task.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {

  todoTasks: ITask[] = [
    {
      title: 'Animaciones en Angular',
      description: 'Aprender animaciones en Angular',
      completed: false,
      level: LEVELS.INFO
    },
    {
      title: 'Angular CLI',
      description: 'Aprender comandos y configuraciones de Angular',
      completed: false,
      level: LEVELS.URGENT
    },
    {
      title: 'Build',
      description: 'Aprender a generar builds con Angular CLI',
      completed: false,
      level: LEVELS.BLOCKING
    },
    {
      title: 'Deploy',
      description: 'Aprender a desplegar bundles en Firebase',
      completed: false,
      level: LEVELS.BLOCKING
    }
  ];

  doneTasks: ITask[] = [
    {
      title: 'Configurar IDE',
      description: 'Configurar e instalar plugins en Visual Studio Code',
      completed: true,
      level: LEVELS.BLOCKING
    },
    {
      title: 'Instalar Angular CLI',
      description: 'Instalar con NPM el Angular CLI de forma global',
      completed: true,
      level: LEVELS.BLOCKING
    },
    {
      title: 'Hola Mundo',
      description: 'Crear con Angular CLI un proyecto inicial',
      completed: true,
      level: LEVELS.URGENT
    }
  ];

  drop(event: CdkDragDrop<ITask[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Actualizamos el valor completed de la tarea
      event.previousContainer.data[event.previousIndex].completed = !event.previousContainer.data[event.previousIndex].completed;

      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }
}
