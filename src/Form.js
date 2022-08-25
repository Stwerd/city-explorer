import React from 'react';

class LocForm extends React.Component {
  render() {
    return (
      <>
        <form onSubmit={this.props.handleSubmit}>
          <legend>Submit A location!</legend>
          <label>Where would you like to go?</label><br />
          <input onChange={(e) => this.props.handler(e.target.value)}></input>
          <button>Explore!</button>
        </form>
      </>
    )
  }
}

export default LocForm;