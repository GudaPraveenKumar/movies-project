import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import Like from './commons/like';

class Movies extends Component {
    state = {
        movies: getMovies()
    }

    render() {

        return (
            <main className="container">
                {this.renderMoviesTable()}
            </main>)
    }

    displayMessage() {
        const { length: count } = this.state.movies;

        if (count === 0) return <p>There are no movies in the database. </p>

        return <div>Displaying {count} from Database</div>
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

    renderMoviesTable() {
        return (
            <React.Fragment>
                {this.displayMessage()}

                <table className="table m-2">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Like</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.movies.map(movie => {
                            return (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td><Like onClick={() => this.handleLike(movie)} liked={movie.liked} /></td>
                                    <td><button onClick={() => this.handleDeleteMovie(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </React.Fragment>
        );
    };


}

export default Movies;