import React, { Component } from 'react';

export default class Userorder extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div class="myorder">
				<div class="order cur">
					<i class="iconfont">&#xe883;</i>待收货
				</div>
				<div class="order">
					<i class="iconfont">&#xe69b;</i>待评价
				</div>
				<div class="order">
					<i class="iconfont">&#xe702;</i>退换/售后
				</div>
				<div class="order">
					<i class="iconfont">&#xe6fc;</i>全部订单
				</div>
				<div class="order">
					<i class="iconfont">&#xe6ea;</i>我的收藏
				</div>
			</div>
		)
	}
}