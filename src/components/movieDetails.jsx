import React, {Component} from 'react';

class MovieDetails extends Component{

    
   render(){
    console.log('Movie details', this.props);
    const {match, history} = this.props;
       return(
           <div>
                <h1>Movie Details{match.params.id}</h1>
                <button className="btn btn-primary" onClick={()=>history.push('/movies')}>Save</button>
           </div>
           
       )
   }

}

export default MovieDetails;