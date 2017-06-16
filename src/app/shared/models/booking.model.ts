import {Theatre} from './theatre.model';
import {Movie} from './movie.model';

export interface Booking {
    _id?: String;
    movie: Movie;
    theatre?: Theatre;
    date?: Date;
    timing?: Date;
    selectedSeats?: { row: number, col: number }[];
    seatClass?: String;
    paymentDetails?: {
        name: String;
        email: String;
        card_no: String;
        expiry_month: String;
        expiry_year: String;
        CVV: String;
    };
}
