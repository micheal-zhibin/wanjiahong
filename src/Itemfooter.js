import React, { Component } from 'react';

export default class Itemfooter extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="itemfooter">
				<a href="javascript:void(0)" class="tag">
					<i class="iconfont">&#xe625;</i>
					联系客服
				</a>
				<a href="#/shopcar" class="tag">
					<i class="iconfont">&#xe698;</i>
					购物车
				</a>
				<a href="javascript:void(0)" onClick={this.props.addShopCar} class="btn yellow">
					加入购物车
				</a>
				<a href="javascript:void(0)" class="btn red">
					立即购买
				</a>
			</div>
		)
	}
}