import React, { Component } from 'react';
import './Beer.css';

class Beer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        beername: '',
        style: '',
        brewery: '',
        location: '',
        calories: 0,
        beerid: this.props.match.params.id
    }
  }

  getBeerName() {
    fetch('/getbeer/' + this.state.beerid)
        .then(res => res.json())
        .then(results => this.setState(
          {
            beername: results[0].name, 
            style: results[0].style, 
            brewery: results[0].brewery,
            location: results[0].location,
            calories: results[0].calories
          }, () => {
        }))
  }

  componentDidMount() {
      this.getBeerName();
  }

  render() {
    return (
      <div>
          <h2>Beer: {this.state.beername}</h2>
          <table>
            <tbody>
              <tr>
                <td>Style:</td><td>{this.state.style}</td>
              </tr>
              <tr>
                <td>Brewery:</td><td>{this.state.brewery}</td>
              </tr>
              <tr>
                <td>Location:</td><td>{this.state.location}</td>
              </tr>
              <tr>
                <td>Calories:</td><td>{this.state.calories}</td>
              </tr>
            </tbody>
          </table>
      </div>
    );
  }
}

export default Beer;
