import { Component, OnInit } from '@angular/core';
import { Sentence } from '../models/sentence';
import { SentecesService } from '../services/senteces.service'
import { ProgressService } from '../services/progress.service';
import { Progress } from '../models/progress';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  currentRight: number;
  goalRight: number;
  lessonNumber: number = 1;
  numberOfBlocks: number = 8;
  wordsForSelect: string[] = [];
  sentence: Sentence;
  progress: Progress;
  builtSentence: string = '';
  wholeSplittedSentence: string[];
  restSplittedSentence: string[];
  status: string;

  constructor(private sentensesService: SentecesService, private progressService: ProgressService) { 
    this.progress = this.progressService.getCurrentProgress(this.lessonNumber);
    this.goalRight = Math.round(this.progress.progressArray.length * 0.95 - 1);
    this.currentRight = this.progress.progressArray.filter(item => item === 1).length;
  }

  ngOnInit() {
    this.sentensesService.getSentence(this.lessonNumber).subscribe(sentence => {
      this.setNewSentence(sentence);
    })
  }

  setNewSentence(sentence: Sentence) {
    this.status = undefined;
    this.builtSentence = '';
    this.sentence = sentence;
    this.wholeSplittedSentence = this.sentence.value.slice(0, -1).toLowerCase().split(' ');
    this.restSplittedSentence = this.wholeSplittedSentence.slice(this.numberOfBlocks, this.wholeSplittedSentence.length);
    this.generateInitialWordsArray();
  }

  generateInitialWordsArray() {
    if (this.wholeSplittedSentence.length === this.numberOfBlocks) {
      this.wordsForSelect = this.wholeSplittedSentence;
    } else if (this.wholeSplittedSentence.length > this.numberOfBlocks) {
      this.wordsForSelect = this.wholeSplittedSentence.slice(0, this.numberOfBlocks);
    } else if (this.wholeSplittedSentence.length < this.numberOfBlocks) {
      let randomRest = [];
      for (let i = 0; i < this.numberOfBlocks - this.wholeSplittedSentence.length; i++) {
        randomRest.push(this.sentensesService.getRandomWord());
      }
      this.wordsForSelect = this.wholeSplittedSentence.concat(randomRest);
    }
    this.wordsForSelect = this.shuffleArray(this.wordsForSelect);
  }

  shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  chooseWord(word) {
    if (this.builtSentence) {
      this.builtSentence = `${this.builtSentence} ${word}`;
    } else {
      this.builtSentence = word[0].toUpperCase() + word.slice(1);
    }

    if (this.restSplittedSentence.length) {
      this.wordsForSelect[this.wordsForSelect.indexOf(word)] = this.restSplittedSentence.shift();
    } else {
      this.wordsForSelect[this.wordsForSelect.indexOf(word)] = this.sentensesService.getRandomWord();
    }
    if (this.builtSentence.split(' ').length === this.wholeSplittedSentence.length) {
      this.builtSentence = this.builtSentence + this.sentence.value.slice(-1);
      this.checkIfRight();
    } 
  }

  checkIfRight() {
    if (this.builtSentence === this.sentence.value) {
      this.status = 'right';
      this.progress = this.progressService.setResultAndGetProgress(this.lessonNumber, 1);
      if (this.currentRight === this.goalRight) {
        alert('Good job! You can go start lesson!')
      }
    } else {
      this.status = 'wrong';
      this.progress = this.progressService.setResultAndGetProgress(this.lessonNumber, -1);
    }
    this.currentRight = this.progress.progressArray.filter(item => item === 1).length;
  }

  getNextSentence() {
    if (this.status === 'wrong') {
      this.setNewSentence(this.sentence);
    } else if (this.status === 'right') {
      this.sentensesService.getSentence(this.lessonNumber).subscribe(sentence => {
        this.setNewSentence(sentence);
      })
    }
  }
}
