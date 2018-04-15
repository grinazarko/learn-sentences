import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training/training.component';
import { LessonsComponent } from './lessons/lessons.component';

const routes: Routes = [
  { path: 'lesson/:id', component: TrainingComponent },
  { path: 'lessons', component: LessonsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
