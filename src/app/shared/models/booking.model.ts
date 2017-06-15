import {Theatre} from './theatre.model';
import {Movie} from './movie.model';

export interface Booking {
    movie: Movie;
    theatre?: Theatre;
    date?: Date;
    timing?: Date;
    selectedSeats?: { row: number, col: number }[];
    seatClass?: String;
}
