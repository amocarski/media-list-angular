import { Component, OnInit } from '@angular/core';

import { FilterListService } from './shared/services/filter-list.service';
import { DIRECTION_ICON, EVENT_TYPE, FilterType } from './shared/consts';
import { BroadcastService } from './shared/services/broadcast.service';
import { Media } from './shared/interfaces/media';
import { Filter } from './shared/interfaces/filter';
import { MediaListService } from './shared/services/item-list.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mediaItems: Array<Media>;
  initialList: Array<Media>;
  defaultList = [];
  filterType = FilterType;
  filters = {} as Filter;
  ascending = false;
  DIRECTION_ICON = DIRECTION_ICON;

  constructor(private mediaListService: MediaListService,
              private filterListService: FilterListService,
              private broadcastService: BroadcastService) {
  }

  ngOnInit() {
    this.mediaListService.getMediaItems()
      .subscribe((mediaItems: Array<Media>) => {
        this.mediaItems = mediaItems;
        this.defaultList = [...mediaItems];
        this.initialList =  [...mediaItems];
      });
  }

  onFiltersChanged(filterType: string, filterValue: string) {
    if (this.filters.type && filterValue === this.filterType.All) {
      delete this.filters.type;
    } else {
      this.filters[filterType] = filterValue;
    }
    this.mediaItems = this.filterListService.getFilteredData(this.initialList, this.filters);
  }

  changeOrder() {
    this.ascending = !this.ascending;
    this.filters.ascending = this.ascending;
    this.mediaItems = this.filterListService.getFilteredData(this.initialList, this.filters);
  }

  resetFilters() {
    this.filters = {
      sort: null,
      type: null,
      query: null,
      ascending: true
    };
  }

  clearFilters() {
    this.broadcastService.broadcast(EVENT_TYPE.FILTER_RESET, true);
    this.resetFilters();
    this.ascending = false;
    this.mediaItems = this.filterListService.getFilteredData(this.defaultList, this.filters);
  }
}
