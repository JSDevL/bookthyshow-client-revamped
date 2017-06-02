export interface Theatre {
    _id?: String;
    name: String;
    location: String;
    city_id: String;
    movies?: {
        movie_id: String
        dates: String[],
        timings: String[]
    }[];
}
;
