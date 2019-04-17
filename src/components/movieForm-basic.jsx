import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './commons/form';
import { getGenres } from '../services/fakeGenreService';

class MovieFormBasic extends Component {

    title = React.createRef();
    // in the html add attribute ref={this.title} this also used for accessing the DOM
    // and then you can access the value = this.title.current.value;

    state = {
        data: {
            title: "",
            genre: {},
            numberInStock: "",
            dailyRentalRate: ""
        },
        errors: {},
        genres: []
    }

    componentDidMount = () => {
        let id = this.props.match.params.id
        if (id === 'new') {
            console.log('its a new movie');
        } else {
            this.fetchMovieDetails(id)
        }

        // const genres = getGenres();
        // console.log('genres =', genres, this.state);

        // this.setState({genres});
    }

    fetchMovieDetails(movieId) {
        console.log('old movie =', movieId);
    }

    schema = {
        title: Joi.string().required(),
        genre: Joi.object().required(),
        numberInstock: Joi.string().required(),
        dailyRentalRate: Joi.number().min(0.10).max(100).required()
    }

    validateForm = () => {
        const options = { abortEarly: false }
        const result = Joi.validate(this.state.data, this.schema, options);
        console.log('result =', result);

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;

        return errors;

        // This is basic implementation
        // const errors = {};
        // if(this.state.data.title.trim() === '')
        //     errors.title = "Title is required";

        // if(this.state.data.numberInStock.trim() === '')
        //     errors.numberInStock = "NumberInStock is required";

        // if(this.state.data.dailyRentalRate.trim() === '')
        //     errors.dailyRentalRate = "Rate is required";

        // return Object.keys(errors).length === 0?null : errors;
    }

    validateProperty = (input) => {

        const obj = { [input.name]: input.value }
        const schema = { [input.name]: this.schema[input.name] }
        const { error } = Joi.validate(obj, schema);

        if (!error) return null;
        return error.details[0].message;

        // This is basic implementation 
        // if(input.name == 'title'){
        //     if(input.value.trim() === '') return 'Title is required';
        // }
        // if(input.name === 'rate'){
        //     if(input.value.trim() === '') return 'Rate is required';
        // }

    }


    handleChange = e => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(e.currentTarget);

        if (errorMessage) errors[e.currentTarget.name] = errorMessage;
        else delete errors[e.currentTarget.name];

        const data = { ...this.state.data };
        data[e.currentTarget.name] = e.currentTarget.value;

        this.setState({ data, errors });
    }

    handleSubmit = e => {
        // this.doSubmit();
        e.preventDefault();
        const errors = this.validateForm();
        this.setState({ errors: errors || {} });
        if (errors) return;
    }



    render() {
        // console.log('Movie route details', this.props);
        // const {match, history} = this.props;
        const { data, errors } = this.state;
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input value={data.title} onChange={this.handleChange}
                            type="text" className="form-control" name="title" id="title" />
                        {/** If errors are present then display */}
                        {errors.title && <div className="alert alert-danger">{errors.title}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <select value={data.genre} className="form-control" onChange={this.handleChange} id="genre" name="genre">
                            {getGenres().map(genre => <option key={genre._id}>{genre.name}</option>)}
                        </select>
                        {/** If errors are present then display */}
                        {errors.genre && <div className="alert alert-danger">{errors.genre}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="numberInStock">Number In Stock</label>
                        <input value={data.numberInStock} type="text" className="form-control" onChange={this.handleChange}
                            id="numberInStock" name="numberInStock" />
                        {/** If errors are present then display */}
                        {errors.numberInStock && <div className="alert alert-danger">{errors.numberInStock}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="dailyRentalRate">Rate</label>
                        <input value={data.dailyRentalRate} type="text" className="form-control" onChange={this.handleChange}
                            id="dailyRentalRate" name="dailyRentalRate" />
                        {/** If errors are present then display */}
                        {errors.dailyRentalRate && <div className="alert alert-danger">{errors.dailyRentalRate}</div>}
                    </div>

                    <button disabled={this.validateForm()} className="btn btn-primary">Register</button>
                </form>
            </div>
        )
    }

}

export default MovieFormBasic;