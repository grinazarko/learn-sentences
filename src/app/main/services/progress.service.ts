import { Injectable } from '@angular/core';
import { Progress } from '../models/progress';
import { LessonsService } from './lessons.service';
import { Lesson } from '../models/lesson';

@Injectable()
export class ProgressService {
  private numberOfResults: number = 24;
  private progresses: any;
  private lessons: Lesson[];

  constructor(private lessonService: LessonsService) {
    this.lessons = this.lessonService.lessons;
    this.setProgresses();
  }

  setProgresses() {
    const localStorageProgress = localStorage.getItem('progress');
    if (localStorageProgress !== 'undefined' && localStorageProgress !== 'null' && localStorageProgress !== null) {
      this.progresses = JSON.parse(localStorageProgress);
    } else {
      this.progresses = {};
    }
    this.lessons.forEach(lesson => {
      if (!this.progresses[lesson.id]) {
        this.progresses[lesson.id] = {
          currentItem: 0,
          progressArray: Array.apply(null, Array(this.numberOfResults)).map(Number.prototype.valueOf, 0)
        }
      }
    });
    localStorage.setItem('progress', JSON.stringify(this.progresses));
  }

  setResultAndGetProgress(lessonNumber: number, result: number): Progress {
    const progress = this.progresses[lessonNumber];
    progress.progressArray[progress.currentItem] = result;
    progress.currentItem += 1;
    if (progress.currentItem === progress.progressArray.length) {
      progress.currentItem = 0;
    }
    localStorage.setItem('progress', JSON.stringify(this.progresses));
    return progress;
  }

  getCurrentProgress(lessonNumber: number): Progress {
    return this.progresses[lessonNumber];
  }

  resetResult(): void {
    localStorage.setItem('progress', null);
    this.setProgresses();
  }

}
