import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson';

@Injectable()
export class LessonsService {
  constructor() { 
  }

  lessons: Lesson[] = [
    {"id": 1, "title": "Present simple", "description": "It is very simple to build sentences in present simmple tense"},
  ]
}   
