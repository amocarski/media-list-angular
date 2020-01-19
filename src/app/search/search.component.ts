import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EVENT_TYPE } from '../shared/consts';
import { BroadcastService } from '../shared/services/broadcast.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit, OnInit, OnDestroy {

  @Output() filtersChanged = new EventEmitter();
  @ViewChild('searchQueryInput', {static: false}) searchQueryInput: ElementRef;
  query: string;
  subscription$: Subscription;

  constructor(private broadcastService: BroadcastService) {}

  ngOnInit() {
    this.subscription$ = this.broadcastService.on(EVENT_TYPE.FILTER_RESET)
      .subscribe((shouldReset: boolean) => {
        if (shouldReset) {
          this.searchQueryInput.nativeElement.value = '';
        }
      });
  }

  ngAfterViewInit() {
    fromEvent(this.searchQueryInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        tap((query: string) => this.query = query)
      )
      .subscribe(() => this.emitFilters());
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  private emitFilters() {
    this.filtersChanged.emit(this.query);
  }
}
