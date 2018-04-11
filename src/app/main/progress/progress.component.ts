import { Component, OnInit, Input } from '@angular/core';
import { Progress } from '../models/progress';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  @Input() progress: Progress;

  constructor() { }

  ngOnInit() {
  }

}
