import React, { Component } from 'react';
import './css/App.scss';
import axios from 'axios';
import Usercard from './Usercard';
import Footer from './Footer';
import Userorder from './Userorder';
import Orderitem from './Orderitem';
import Starlist from './Starlist';

export default class Myindex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userinfo: {},
			showorderlist: false,
			starlist: [],
		}
		this.logout = this.logout.bind(this)
	}

	componentWillMount() {
		$(window).off()
		var _ = this;
		axios.get('/apis/user/getUserInfo/', {})
		.then(function(result) {
			if (result.data.ret == 2) {
				setTimeout(function() {
					location.href = '/#/login'
				}, 0)
			} else if (result.data.ret == 0) {
				_.setState({
					userinfo: result.data.userinfo,
				})
			}
		}).then(function() {
			return axios.get('/apis/product/getStarList/', {})
		}).then(function(result) {
			_.setState({
				starlist: result.data.starlist,
			})
		})
	}

	logout(e) {
		let _ = this;
		axios.get('/apis/logout/').then(function (response) {
		    if (response.data.ret == 0) {
		    	_.backIndex()
		    }
		})
	}

	backIndex() {
		location.href=''
	}

	render() {
		return (
			<div class="myindex">
				<Usercard userinfo={this.state.userinfo} />
				<div class="gap" />
				<Userorder />
				{ this.state.showorderlist && <div class="notfinishorderlist">
									<Orderitem />
								</div>}
				<Starlist starlist={this.state.starlist} />
				<Footer tagindex="4" />
				<div onClick={this.logout} class="button">注销登录</div>
			</div>
		)
	}
}