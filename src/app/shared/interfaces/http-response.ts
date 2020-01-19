import { Media } from './media';

export interface HttpResponse<T> {
  images: Media;
  documents: Media;
  videos: Media;
  audios: Media;
}
