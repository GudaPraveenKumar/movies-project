import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './commons/pagination';
import { paginate } from "../utils/paginate";
import Filter from './commons/filter';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable'; 
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        sortColumn: {path: 'title', order: 'asc'}
        }

    componentDidMount(){
        const genres = [{_id:'',name: 'All Genres'}, ...getGenres()];
        this.setState({
            movies: getMovies(),
            genres
        })
    }

    getPageData = () =>{
        const { 
            pageSize, 
            currentPage, 
            selectedGenre, 
            movies: allMovies, 
            sortColumn } = this.state; // Renaming movies to allMovies

        const filteredMovies = selectedGenre && selectedGenre._id?
            allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sortedMovies, currentPage, pageSize);

        return {totalCount: filteredMovies.length, data: movies}
    }

    render() {

        const { length: count } = this.state.movies; // Renaming length to count
        const { pageSize, currentPage, sortColumn } = this.state; // Renaming movies to allMovies
        if(count === 0) return <p>There are no movies in the database</p>

        const {totalCount, data: movies} = this.getPageData();

        return (
            <main className="container m-4">
             <p>Showing {totalCount} movies in the database.</p>
                <div className="row">
                    <div className="col-3">
                        <Filter 
                        items={this.state.genres} 
                        onItemSelect={this.handleGenreSelect}
                        selectedItem = {this.state.selectedGenre}
                       />
                    </div>

                    <div className="col">
                        <MoviesTable 
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDeleteMovie}
                        onSort={this.handleSort}/>
                    </div>
                </div>

                <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange} />

            </main>)
    }


    handleDeleteMovie = movieObj => {
        console.log('movie obj =', movieObj);
        // deleteMovie(movieObj._id);
        // this.setState({movies: this.state.movies});
        const movies = this.state.movies.filter(m => m._id !== movieObj._id);
        // this.setState({movies: movies})
        this.setState({ movies });
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
       
        this.setState({selectedGenre: genre, currentPage: 1})
    }

    handleSort = sortColumn =>{
        this.setState({sortColumn})
    }

}

export default Movies;