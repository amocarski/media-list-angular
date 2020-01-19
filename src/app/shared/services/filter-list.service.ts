import { Injectable } from '@angular/core';
import { FilterType, SORTING_CRITERIA } from '../consts';
import { Filter } from '../interfaces/filter';
import { Media } from '../interfaces/media';

@Injectable({
  providedIn: 'root'
})
export class FilterListService {

  filters: Filter;
  filterType = FilterType;

  getFilteredData(data: Array<Media>, filters: Filter): Array<Media> {
    this.filters = filters;

    this.sortData(data);

    return data.filter(
      (item: Media) => this.listItemTest(item)
    );
  }

  private sortData(data: Array<Media>) {
    const direction = this.filters.ascending ? 1 : -1;
    let sortKey = '';
    const sortCriteria = SORTING_CRITERIA.indexOf(this.filters.sort);

    if (sortCriteria !== -1) {
      sortKey = SORTING_CRITERIA[sortCriteria];
    }
    data.sort((a, b) => {
      if (a[sortKey] > b[sortKey]) {
        return -1 * direction;
      }
      if (b[sortKey] > a[sortKey]) {
        return 1 * direction;
      }
    });
  }

  private listItemTest(item: Media): boolean {
    let valid = true;

    valid = valid && this.filterByQuery(item);
    valid = valid && this.filterByType(item);

    return valid;
  }

  private filterByQuery(item: Media): boolean {
    return (!this.filters.query || item.title.startsWith(this.filters.query) || (item.type === this.filters.query));
  }

  private filterByType(item: Media): boolean {
    return (!this.filters.type || item.type === this.filters.type);
  }
}
