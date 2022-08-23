import React from 'react';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Main.css';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      location: [],
      map: ''
    }
  }
  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.input);
    try {
      console.log(`submitted form and called handleSubmitCity ${this.state.input}`);

      const getIt = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.input}&format=json`);

      this.setState({
        location: getIt.data,
      });
      console.log(getIt.data);
    } catch (error) {
      console.log('error', error);
      console.log('error.message: ', error.message);
    }
  }
  render() {
    let city = this.state.location.map((r, idx) => {
      return <Card key={idx} style={{ width: '18vw' }}>
        <Card.Body>
          <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${r.lat},${r.lon}&zoom=13`}/>
          <Card.Text>Latitude: {r.lat}</Card.Text>
          <Card.Text>Longitude: {r.lon}</Card.Text>
          <Card.Text>Location: {r.display_name}</Card.Text>
        </Card.Body>
      </Card>
    });

    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <legend>Submit A location!</legend>
          <label>Where would you like to go?</label><br />
          <input onChange={(e) => this.setState({ input: e.target.value })}></input>
          <button>Explore!</button>
        </form>
        <div id='maps'>{city}</div>
      </main>
    );
  }
}

export default Main;
