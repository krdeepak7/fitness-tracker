import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject'; 
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as fromTraining from '../training/training.reducer';
import * as Training from './training.actions';
import { Store } from '@ngrx/store';


@Injectable()
export class TrainingService {

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
    ) {}

  fetchAvailableExercises(): void {
    this.store.dispatch(new UI.StartLoading());
    this.db
    .collection('availableExercises')
    .snapshotChanges().pipe(
    map((docArray: any) => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            duration: doc.payload.doc.data().duration,
            calories: doc.payload.doc.data().calories
          };
        });
    })
    )
    .subscribe((exercises: Exercise[]) => {
      // this.availableExercises = exercises;
      // this.exercisesChanged.next([...this.availableExercises])
      this.store.dispatch(new UI.StopLoading())
      this.store.dispatch(new Training.SetAvailableTraining(exercises));
    }, error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading())
      this.uiService.showSnackbar('Fetching Exercises failed,please try again later.', null, 3000);
      // this.exercisesChanged.next(null);
      // console.log(error) 
    });
  }

  startExercise(selectedId: string): void {
    // this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId);
    // this.exerciseChanged.next({...this.runningExercise})
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise(): void {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      this.addDataToDataBase({
        ...exercise,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number): void {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
    this.addDataToDataBase({
      ...exercise,
      duration: exercise.duration * (progress / 100),
      calories: exercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled'
    });
      this.store.dispatch(new Training.StopTraining());
  });
}

  fetchCompletedOrCanceledExercises(): void {
    this.db.collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new Training.SetFinishedTraining(exercises));
    }, error => {
      // console.log(error) 
    });
  }

  private addDataToDataBase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise);
  }

}
