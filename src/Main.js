import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Main.css';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      location: [],
      description: [],
      map: ''
    };
  }
  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.input);
    try {

      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.input}&format=json`
      const getIt = await axios.get(url);

      let forecastURL = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.input}`;
      const getForecast = await axios.get(forecastURL);

      this.setState({
        location: getIt.data,
        description: getForecast.data
      });
    } catch (error) {
      console.log('error', error);
      console.log('error.message: ', error.message);
    }
  };
  render() {
    let ForecastDisplay = this.state.description.map((r, idx) => {
      return <>
        <Card.Text>{r.date} {r.desc}</Card.Text>
      </>
    });

    let city = this.state.location.map((r, idx) => {
      return <Card key={idx} style={{ width: '33vw' }}>
        <Card.Body>
          <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${r.lat},${r.lon}&zoom=12`} />
          <Card.Text>Latitude: {r.lat}</Card.Text>
          <Card.Text>Longitude: {r.lon}</Card.Text>
          <Card.Text>Location: {r.display_name}</Card.Text>
          {ForecastDisplay}
        </Card.Body>
      </Card>;
    });

    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <legend>Submit A location!</legend>
          <label>Where would you like to go?</label><br />
          <input onChange={(e) => this.setState({ input: e.target.value })}></input>
          <button>Explore!</button>
        </form>
        <div id='maps'>{city[0]}</div>
      </main>
    );
  }
}

export default Main;
