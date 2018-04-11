import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MainRoutingModule } from './main-routing.module';
import { TrainingComponent } from './training/training.component';
import { SentecesService } from './services/senteces.service';
import { ProgressComponent } from './progress/progress.component';
import { ProgressService } from './services/progress.service';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularFontAwesomeModule, 
    HttpClientModule
  ],
  declarations: [TrainingComponent, ProgressComponent],
  providers: [
    SentecesService,
    ProgressService
  ]
})
export class MainModule { }
