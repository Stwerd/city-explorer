import React from 'react';
import Card from 'react-bootstrap/Card';

class CityCard extends React.Component {
  render() {
    console.log(this.props.description);
    let des=this.props.description.data.map((r,idx)=>{
      return <Card.Text key={idx}>{`${r.time}: There was a high of ${r.max }and a low of ${r.low} with ${r.forecast}`}</Card.Text>
    });
    
    return (
      <>
        <Card className = 'displayMap' key={0} style={{ width: '33vw' }}>
          <Card.Body>
            <Card.Text>Welcome to beautiful {this.props.location.display_name}</Card.Text>
            <Card.Img src={this.props.url} />
            <Card.Text>Latitude: {this.props.location.lat}</Card.Text>
            <Card.Text>Longitude: {this.props.location.lon}</Card.Text>
            <Card.Text>Location: {this.props.location.display_name}</Card.Text>
            {des}
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default CityCard;