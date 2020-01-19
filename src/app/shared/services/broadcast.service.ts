import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventBroadcast } from '../interfaces/event-broadcast';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  eventSubject$ = new Subject();

  constructor() {}

  broadcast(action: string, data: any) {
    this.eventSubject$.next({ action, data });
  }

  on<T>(action: string): Observable<T> {
    return this.eventSubject$.asObservable()
      .pipe(
        filter((e: EventBroadcast) => e.action === action),
        map((e: any) => e.data)
      );
  }
}
