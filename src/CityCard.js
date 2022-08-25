import React from 'react';
import Card from 'react-bootstrap/Card';

class CityCard extends React.Component {
  render() {
    let des=this.props.description;
    return (
      <>
        <Card key={0} style={{ width: '33vw' }}>
          <Card.Body>
            <Card.Text>Welcome to beautiful {this.props.location.display_name}</Card.Text>
            <Card.Img src={this.props.url} />
            <Card.Text>Latitude: {this.props.location.lat}</Card.Text>
            <Card.Text>Longitude: {this.props.location.lon}</Card.Text>
            <Card.Text>Location: {this.props.location.display_name}</Card.Text>
            <Card.Text>{`${des.date}: It is currently ${des.temp} and appears to be ${des.desc}`}</Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default CityCard;