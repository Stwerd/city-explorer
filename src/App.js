import './App.css';
import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      location: {}
    }
  }
  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.input);
    try {
      console.log(`submitted form and called handleSubmitCity ${this.state.input}`);

      const getIt = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.input}&format=json`);

      this.setState({ location: getIt.data[0] });
    } catch (error) {
      console.log('error', error);
      console.log('error.message: ', error.message);
    }
  }

  render() {
    return (
      <>
        <main>
          <form onSubmit={this.handleSubmit}>
            <legend>Submit A location!</legend>
            <label>Where would you like to go?</label><br />
            <input onChange={(e) => this.setState({ input: e.target.value })}></input>
            <button>Explore!</button>
          </form>
          {this.state.location.place_id &&
            <h2>The city is: {this.state.location.display_name}</h2>}
        </main>
      </>
    );
  }
}

export default App;
