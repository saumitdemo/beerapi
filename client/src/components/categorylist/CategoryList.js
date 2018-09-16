import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './CategoryList.css';

class CategoryList extends Component {
    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let categoryname = e.target.elements.categoryname.value;
        fetch('/addcategory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: categoryname
            })
        })
        .then((res) => {
            this.getCategories();
        });
    }

    getCategories() {
        fetch('/getcategories')
            .then(res => res.json())
            .then(results => this.setState({categories: results}, () => console.log(results)));
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        return (
            <div>
                <h2>Categories:</h2>
                <ul>
                    {this.state.categories.map(category => 
                        <li key={category.id}><Link to={'/category/' + category.id}>{category.name}</Link></li>
                    )}
                </ul>
                <br/>
                <br/>
                <form method='POST' onSubmit={this.handleSubmit}>
                    <label htmlFor='categoryname'>Category Name:</label>
                    <input id='categoryname' type='textbox'/>
                    <br/>
                    <br/>
                    <button type='submit'>Add Category</button>
                </form>
            </div>
        );
    }
}

export default CategoryList;
