export enum MediaType {
  all = 'All Media',
  image = 'Image',
  document = 'Document',
  video = 'Video',
  audio = 'Audio'
}

export enum SortType {
  timestamp = 'Date Uploaded',
  title = 'Alphabetical'
}

export enum FilterType {
  All = 'all',
  Query = 'query',
  Type = 'type',
  Sort = 'sort'
}

export const SORTING_CRITERIA = ['timestamp', 'title'];

export const EVENT_TYPE = {
  FILTER_RESET: 'FILTER_RESET'
};

export const DIRECTION_ICON = {
  ASCENDING: 'arrow_downward',
  DESCENDING: 'arrow_upward'
}
