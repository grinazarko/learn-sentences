import { Injectable } from '@angular/core';
import { Progress } from '../models/progress';

@Injectable()
export class ProgressService {
  private numberOfResults = 24;
  private progresses: any;

  constructor() {
    const localStorageProgress = localStorage.getItem('progress');
    if (localStorageProgress !== 'undefined' && localStorageProgress !== 'null') {
      this.progresses = JSON.parse(localStorageProgress);
    } else {
      this.progresses = {
        1:
        {
          currentItem: 0,
          progressArray: Array.apply(null, Array(this.numberOfResults)).map(Number.prototype.valueOf, 0)
        },
        2:
        {
          currentItem: 0,
          progressArray: Array.apply(null, Array(this.numberOfResults)).map(Number.prototype.valueOf, 0)
        }
      };
      localStorage.setItem('progress', JSON.stringify(this.progresses));
    }
  }

  setResultAndGetProgress(lessonNumber, result): Progress {
    const progress = this.progresses[lessonNumber];
    progress.progressArray[progress.currentItem] = result;
    progress.currentItem += 1;
    if (progress.currentItem === progress.progressArray.length) {
      progress.currentItem = 0;
    }
    localStorage.setItem('progress', JSON.stringify(this.progresses));
    return progress;
  }

  getCurrentProgress(lessonNumber): Progress {
    return this.progresses[lessonNumber];
  }

  resetResult() {
    localStorage.setItem('progress', null);
  }

}
