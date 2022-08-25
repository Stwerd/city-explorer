import React from 'react';
import Card from 'react-bootstrap/Card';
import './Movies.css';

export default class Movie extends React.Component {
  render() {
    let movieDisplay = this.props.movieArr.map(r => {
      return <Card className = 'butt'>
        <Card.Body>
          <Card.Text>Title: {r.title}</Card.Text>
          <Card.Img src={r.url} />
          <Card.Text className ='desc'>Description: {r.desc}</Card.Text>
          <Card.Text>`Votes: {r.total_votes} Average Score: {r.average_votes}`</Card.Text>
          <Card.Text>{r.popularity}, It came out in {r.release_date}</Card.Text>
        </Card.Body>
      </Card>
    })
    return (
      <>
        {movieDisplay}
      </>
    )
  }
}