import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EVENT_TYPE, FilterType, MediaType, SortType } from '../shared/consts';
import { Subscription } from 'rxjs';
import { BroadcastService } from '../shared/services/broadcast.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  @Output() filtersChanged = new EventEmitter();
  @Input() type: string;
  mediaTypes = MediaType;
  sortTypes = SortType;
  filterType = FilterType;
  filtersOptions = [];
  filterName: any;
  subscription$: Subscription;
  selected: string;
  filterTitle = '';

  constructor(private broadcastService: BroadcastService) {
  }

  ngOnInit() {
    this.eventListener();
    // TODO refactor to be more programmatically
    if (this.type === this.filterType.Type) {
      this.filtersOptions = Object.keys(this.mediaTypes);
      this.filterName = this.mediaTypes;
      this.filterTitle = 'Filter';
    } else if (this.type === this.filterType.Sort) {
      this.filtersOptions = Object.keys(this.sortTypes);
      this.filterName = this.sortTypes;
      this.filterTitle = 'Sort';
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  eventListener() {
    this.subscription$ = this.broadcastService.on(EVENT_TYPE.FILTER_RESET)
      .subscribe((shouldReset: boolean) => {
        if (shouldReset) {
          this.selected = '';
        }
      });
  }

  onFiltersChanged(type: string) {
    this.filtersChanged.emit(type);
  }

}
