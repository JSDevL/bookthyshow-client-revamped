export interface Movie {
    _id: String;
    id: String;
    title: String;
    release_date: String;
    poster_path: String;
    backdrop_path: String;
    genre_ids: Number[];
    genres: {
        id: Number,
        name: String
    }[];
    overview: String;
    runtime: Number;
};
