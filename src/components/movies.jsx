import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {toast} from 'react-toastify';
import Pagination from './commons/pagination';
import { paginate } from "../utils/paginate";
import Filter from './commons/filter';
import { getGenres } from '../services/genreService';
import MoviesTable from './moviesTable';
import { getMovies, deleteMovie } from '../services/movieService';
import SearchBox from './searchBox';


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: '',
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' },
    }

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ _id: '', name: 'All Genres' }, ...data];

        const { data:movies} = await getMovies();
        this.setState({
            movies,
            genres
        })
    }

    getPageData = () => {
        const {
            pageSize,
            currentPage,
            selectedGenre,
            movies: allMovies,
            sortColumn,
            searchQuery } = this.state; // Renaming movies to allMovies

        // const filteredMovies = selectedGenre && selectedGenre._id?
        //     allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        let filteredMovies = allMovies;
        if (searchQuery) {
            filteredMovies = allMovies.filter(m => {
                return m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            });
        } else if (selectedGenre && selectedGenre._id) {
            filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id)
        }

        const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sortedMovies, currentPage, pageSize);

        return { totalCount: filteredMovies.length, data: movies }
    }

    handleNewMovie = () => {
        console.log('debba', this.props);
        this.props.history.push('/movies/new');
    }

    render() {

        const { length: count } = this.state.movies; // Renaming length to count
        const { pageSize, currentPage, sortColumn } = this.state; // Renaming movies to allMovies
        if (count === 0) return <p>There are no movies in the database</p>

        const { totalCount, data: movies } = this.getPageData();

        return (
            <main className="container m-4">
                <p>Showing {totalCount} movies in the database.</p>

                <div className="row">
                    <div className="col-3">
                        <Filter
                            items={this.state.genres}
                            onItemSelect={this.handleGenreSelect}
                            selectedItem={this.state.selectedGenre}
                        />
                    </div>

                    <div className="col">
                        <Link to="/movies/new" className="btn btn-primary"
                            style={{ marginBottom: 20 }}>New Movie</Link>
                        <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} />
                        {/* <button onClick={this.handleNewMovie} className="btn btn-primary">New Movie</button> */}
                        <MoviesTable
                            movies={movies}
                            sortColumn={sortColumn}
                            onLike={this.handleLike}
                            onDelete={this.handleDeleteMovie}
                            onSort={this.handleSort} />

                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange} />
                    </div>

                </div>

            </main>)
    }


    handleDeleteMovie = async movieObj => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movieObj._id);
        this.setState({ movies });

        try{
            await deleteMovie(movieObj._id);
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                toast.error('This movie has already been deleted');
            }
            this.setState({movies: originalMovies});
        }
        
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        // movies[index] = { ...movie };
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 })
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
    }



}

export default Movies;