import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Category.css';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: [],
            categoryname: '',
            categoryid: this.props.match.params.id
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let beername = e.target.elements.beername.value;
        let categoryid = e.target.elements.categoryid.value;
        let beerstyle = e.target.elements.beerstyle.value;
        let brewery = e.target.elements.brewery.value;
        let location = e.target.elements.location.value;
        let calories = e.target.elements.calories.value;
        fetch('/addbeer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: beername,
                category_id: categoryid,
                style: beerstyle,
                brewery: brewery,
                location: location,
                calories: calories
            })
        })
        .then((res) => {
            this.getBeers();
        });
    }

    getCategoryName() {
        fetch('/getcategory/' + this.state.categoryid)
            .then(res => res.json())
            .then(results => this.setState({categoryname: results[0].name}, () => {
            }))
    }

    getBeers() {
        fetch('/getbeers/' + this.state.categoryid)
            .then(res => res.json())
            .then(results => this.setState({beers: results}, () => {
            }));
    }

    componentDidMount() {
        this.getCategoryName();
        this.getBeers();
    }

    render() {
        return (
            <div>
                <h2>Category: {this.state.categoryname} Beers</h2>
                <ul>
                    {this.state.beers.map(beer => 
                        <li key={beer.id}><Link to={'/beer/' + beer.id}>{beer.name}</Link></li>
                    )}
                </ul>
                <br/>
                <br/>
                <form method='POST' onSubmit={this.handleSubmit}>
                    <label htmlFor='beername'>Beer Name:</label>
                    <input id='beername' type='textbox'/>
                    <br/>
                    <input type='hidden' id='categoryid' value={this.state.categoryid} />
                    <label htmlFor='beerstyle'>Style:</label>
                    <input id='beerstyle' type='textbox'/>
                    <br/>
                    <label htmlFor='brewery'>Brewery:</label>
                    <input id='brewery' type='textbox'/>
                    <br/>
                    <label htmlFor='location'>Location:</label>
                    <input id='location' type='textbox'/>
                    <br/>
                    <label htmlFor='calories'>Calories:</label>
                    <input id='calories' type='textbox'/>
                    <br/>
                    <br/>
                    <button type='submit'>Add Beer</button>
                </form>
            </div>
        );
    }
}

export default Category;
