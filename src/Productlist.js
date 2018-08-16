import React, { Component } from 'react';

export default class Productlist extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let _ = this;
		let lilist = _.props.productlist.map(function(v) {
			return <a href={'#/item/' + v.skuid}><img src={'http://localhost:8888/' + v.imagepath} /><div class="name">{v.desc}</div><div class="bottom"><p>￥{v.price}</p><i class="iconfont">&#xe842;</i></div></a>
		})
		return (
			<ul class="productlist">
				{lilist}
			</ul>
		)
	}
}