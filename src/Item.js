import React, { Component } from 'react';
import Itemnavbar from './Itemnavbar';
import Itembanner from './Itembanner';
import Itemname from './Itemname';
import Commentbox from './Commentbox';
import Itemtype from './Itemtype';
import Itemcomment from './Itemcomment';
import Commend from './Commend';
import Itemdetail from './Itemdetail';
import Itemfooter from './Itemfooter';
import axios from 'axios';

export default class Item extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: {},
			commentlist: {},
			isstar: false,
			activenum: 0,
		}
		this.toggleStar = this.toggleStar.bind(this)
		this.jumpTag = this.jumpTag.bind(this)
		this.addShopCar = this.addShopCar.bind(this)
	}

	componentWillMount() {
		let _ = this;
		Promise.all([axios.get('/apis/product/showid/', {
			params: {
				skuid: _.props.match.params.id
			}
		}), axios.get('/apis/product/getcomment/', {
			params: {
				skuid: _.props.match.params.id
			}
		}), axios.get('/apis/product/isstar/', {
			params: {
				skuid: _.props.match.params.id
			}
		})]).then(function(result) {
			_.setState({
				product: result[0].data.product,
				commentlist: result[1].data.commentlist.sort(function(a, b) {
					return a.createtime < b.createtime
				}),
				isstar: result[2].data.isstar == 0 ? false : true,
			})
		})
	}

	componentDidMount() {
		let _ = this;
		let scrollTimeout = null;
		$(window).off().on('scroll', function() {
			clearTimeout(scrollTimeout)
			scrollTimeout = setTimeout(function() {
				if ($(window).scrollTop() < $('.itemcomment').offset().top) {
					_.setState({
						activenum: 0,
					})
				} else if($(window).scrollTop() < $('.detail').offset().top && $(window).scrollTop() >= $('.itemcomment').offset().top) {
					_.setState({
						activenum: 1,
					})
				} else if($(window).scrollTop() < $('.commend').offset().top && $(window).scrollTop() >= $('.detail').offset().top) {
					_.setState({
						activenum: 2,
					})
				} else if($(window).scrollTop() >= $('.commend').offset().top) {
					_.setState({
						activenum: 3,
					})
				}
			}, 0)
		})
	}

	jumpTag(e) {
		let _ = this;
		_.setState({
			activenum: $(e.target).index(),
		})
		if ($(e.target).index() == 0) {
			$(window).scrollTop(0)
		} else if ($(e.target).index() == 1) {
			$(window).scrollTop($('.itemcomment').offset().top)
		} else if ($(e.target).index() == 2) {
			$(window).scrollTop($('.detail').offset().top)
		} else if ($(e.target).index() == 3) {
			$(window).scrollTop($('.commend').offset().top)
		}
	}

	toggleStar() {
		let _ = this;
		axios.get('/apis/product/toggleStar/', {
			params: {
				skuid: _.props.match.params.id
			}
		}).then(function(result) {
			_.setState({
				isstar: result.data.isstar == 0 ? false : true,
			})
		})
	}

	addShopCar() {
		let _ = this;
		axios.get('/apis/product/addShopCar/', {
			params: {
				skuid: _.props.match.params.id
			}
		}).then(function(result) {
			console.log(result.data)
		})
	}

	render() {
		return (
			<div class="good">
				<Itemnavbar jumpTag={this.jumpTag} activenum={this.state.activenum} product={this.state.product} />
				<Itembanner product={this.state.product} />
				<Itemname toggleStar={this.toggleStar} isstar={this.state.isstar} product={this.state.product} />
				<div class="gap"></div>
				<Itemtype product={this.state.product} />
				<div class="gap"></div>
				<Itemcomment commentlist={this.state.commentlist} />
				<Commentbox skuid={this.props.match.params.id} />
				<div class="gap"></div>
				<Itemdetail product={this.state.product} />
				<div class="gap"></div>
				<Commend product={this.state.product} />
				<Itemfooter addShopCar={this.addShopCar} />
			</div>
		)
	}
}