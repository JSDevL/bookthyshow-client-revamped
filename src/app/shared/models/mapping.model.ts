import {Theatre} from './theatre.model';
import {Movie} from './movie.model';

export interface Mapping {
    _id?: String;
    theatre: Theatre;
    movie: Movie;
    timings: Date[];
    dates: Date[];
}
;
