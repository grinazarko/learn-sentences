import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { ProgressService } from '../services/progress.service';
import { Lesson } from '../models/lesson';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[];

  constructor(private lessonsService: LessonsService, 
    private progressService: ProgressService,
    private router: Router) { }

  ngOnInit() {
    this.lessons = this.lessonsService.lessons;
  }

  resetProgress(): void {
    this.progressService.resetResult();
  }

  openLesson(lesson: Lesson): void {
    this.router.navigate(['/lesson', lesson.id])
  }
}
