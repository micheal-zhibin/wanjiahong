import React, { Component } from 'react';
import './css/App.scss';
import Header from './Header';
import Banner from './Banner';
import Navbar from './Navbar';
import Productlist from './Productlist';
import Infobox from './Infobox';
import Footer from './Footer';
import axios from 'axios';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 1,
			productitemlist: [],
		}
	}

	add () {
		this.setState({
			count: this.state.count + 1
		})
		console.error($(document))
	}

	componentWillMount() {
		$(window).off()
		var _ = this;
		axios.get('/apis/product/show/?index=0&length=100').then(function(result) {
			_.setState({
				productitemlist: result.data.productlist
			})
		})
	}

	render() {
		return (
			<div class="index">
				<div class="indexheader">
					<Header />
				</div>
				<Banner />
				<Navbar />
				<Infobox />
				<div class="productbox">
					<Productlist productlist={this.state.productitemlist} />
				</div>
				<Footer tagindex="1" />
			</div>
		)
	}
}