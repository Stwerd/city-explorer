import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Main.css';
import LocForm from './Form';
import CityCard from './CityCard';
import Movie from './Movie';



class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      location: [],
      description: [],
      map: '',
      movieArr: [],
      error: {
        errorState: false,
        errorMessage: "",
      }
    };
  }

//function passed into the City Card so that I may change the state in Main from there.
  handler = (val) => {
    this.setState({
      input: val
    })
  }


  handleSubmit = async e => {
    e.preventDefault();
    
    // console.log(this.state.input);

    try {

      //from user input, get the cities lat and lon
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.input}&format=json`
      const getIt = await axios.get(url);
      // console.log(getIt.data[0]);

      //store the lat and lon in variables
      let lat = getIt.data[0].lat;
      let lon = getIt.data[0].lon;

      //use lat and lon in a axios call to local server, where in the backend it responses with the current weather forecast about that city
      let forecastURL = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`;
      const getForecast = await axios.get(forecastURL);

      //from the cities name, call the local server to respond with a array of movies about the city that I am in.
      let movieUrl = `${process.env.REACT_APP_SERVER}/movie?title=${this.state.input}`;
      const getMov = await axios.get(movieUrl);
      //store all the information to local storage
      this.setState({
        location: getIt.data[0],
        map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${lat},${lon}&zoom=12`,
        description: getForecast.data,
        movieArr: getMov.data,
        error: {
          errorState: false,
        }
      });
    }

    catch (error) {
      this.setState({
        errorState: true,
        errorMessage: error.message
      })
    }

  };

  render() {
    return (
      <main>
        <LocForm
          handleSubmit={this.handleSubmit}
          handler={this.handler}
        />
        {this.state.location.lat && !this.state.error.errorState ? (
          <CityCard
            location={this.state.location}
            description={this.state.description}
            url={this.state.map}
          />
        ) : (
          <></>
        )}
        
        {this.state.movieArr.length > 0 && !this.state.error.errorState ? (
          <Movie movieArr ={this.state.movieArr}/>
        ) : (
          <></>
        )}
      </main>
    );
  }
}

export default Main;
