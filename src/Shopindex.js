import React, { Component } from 'react';
import Productlist from './Productlist';
import Indexheader from './Indexheader';
import Shopnavbar from './Shopnavbar';
import axios from 'axios';
import renderHTML from 'react-render-html';

export default class Shopindex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showchose: false,
			pricetype: 0,
			productitemlist: [],
			choseindex: -1,
			searchmsg: '',
		};
		this.chosesort = this.chosesort.bind(this)
		this.changenav = this.changenav.bind(this)
		this.search = this.search.bind(this)
		this.changesearchmsg = this.changesearchmsg.bind(this)
	}

	search(e) {
		var _ = this;
		if (_.state.searchmsg) {
			axios.get('http://localhost:8888/search/?msg=' + _.state.searchmsg).then(function(result) {
				_.setState({
					productitemlist: result.data.productlist.sort(function(a, b) {
						if (a.createtime < b.createtime) {
							return 1
						} else {
							return -1
						}
					})
				})
			})
		}
	}

	changesearchmsg(e) {
		let msg = $(e.target)[0].value
		this.setState((prev, prop) => ({
			searchmsg: msg
		}))
	}

	chosesort(e) {
		let _ = this;
		e.preventDefault()
		if(this.state.showchose && e.target.tagName.toLowerCase() == 'li') {
			$($('.shopindex .navbar').find('a')[1]).addClass('active').siblings().removeClass('active')
			if($(e.target).index() == 0) {
				this.setState((prev, prop) => ({
					productitemlist: prev.productitemlist.sort(function(a, b) {
						if (a.price < b.price) {
							return 1
						} else {
							return -1
						}
					}),
					choseindex: 0
				}))
			} else {
				this.setState((prev, prop) => ({
					productitemlist: prev.productitemlist.sort(function(a, b) {
						if (a.price > b.price) {
							return 1
						} else {
							return -1
						}
					}),
					choseindex: 1
				}))
			}
			
		}
		this.setState((prev, prop) => ({
			showchose: !prev.showchose
		}))
	}

	changenav(e) {
		e.preventDefault()
		$(e.target).addClass('active').siblings().removeClass('active')
		if($(e.target).index() == 0) {
			this.setState((prev, prop) => ({
				productitemlist: prev.productitemlist.sort(function(a, b) {
					if (a.createtime < b.createtime) {
						return 1
					} else {
						return -1
					}
				}),
				choseindex: -1
			}))
		} else if($(e.target).index() == 2) {
			this.setState((prev, prop) => ({
				productitemlist: prev.productitemlist.sort(function(a, b) {
					if (a.salesamount < b.salesamount) {
						return 1
					} else {
						return -1
					}
				}),
				choseindex: -1
			}))
		} else if($(e.target).index() == 3) {
			this.setState((prev, prop) => ({
				productitemlist: prev.productitemlist.sort(function(a, b) {
					if (a.commentamount < b.commentamount) {
						return 1
					} else {
						return -1
					}
				}),
				choseindex: -1
			}))
		}
	}

	componentWillMount() {
		var _ = this;
		axios.get('http://localhost:8888/product/show/?index=0&length=100').then(function(result) {
			_.setState({
				productitemlist: result.data.productlist.sort(function(a, b) {
					if (a.createtime < b.createtime) {
						return 1
					} else {
						return -1
					}
				})
			})
		})
	}

	render() {
		return (
			<div class="shopindex">
				<Indexheader changesearchmsg={this.changesearchmsg} gosearch={this.search} />
				<div class="navbar">
					<a onClick={this.changenav} href="javascript: void(0)" class="active">最新上架</a>
					<a onClick={this.chosesort} href="javascript: void(0)">{renderHTML(this.state.showchose ? '价格<i class="iconfont">&#xe62d</i>' : '价格<i class="iconfont">&#xe630</i>')}</a>
					<a onClick={this.changenav} href="javascript: void(0)">销量最多</a>
					<a onClick={this.changenav} href="javascript: void(0)">评价最多</a>
				</div>
				<div class="productbox">
					<Productlist productlist={this.state.productitemlist} />
				</div>
				{ this.state.showchose && <div class="chosearea" onClick={this.chosesort}><ul><li onClick={this.changeType1} class={this.state.choseindex == 0 ? "cur" : ""}>价格最高</li><li class={this.state.choseindex == 1 ? "cur" : ""}>价格最低</li></ul></div> }
			</div>
		)
	}
}