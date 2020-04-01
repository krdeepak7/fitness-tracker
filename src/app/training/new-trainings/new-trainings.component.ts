import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-trainings',
  templateUrl: './new-trainings.component.html',
  styleUrls: ['./new-trainings.component.css']
})

export class NewTrainingsComponent implements OnInit {
  
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  
  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise)
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises()
  }

}
