import React, { Component } from 'react';

export default class Itemdetail extends Component {
	constructor(props) {
		super(props);
		this.clicktab = this.clicktab.bind(this)
	}

	clicktab(e) {
		if ($(e.target).is('span')) {
			$(e.target).addClass('active').siblings().removeClass('active')
		}
	}

	render() {
		return (
			<div class="detail">
				<div onClick={this.clicktab} class="nav">
					<span class="active">商品介绍</span>
					<span>规格参数</span>
					<span>售后保障</span>
				</div>
				<div class=""></div>
			</div>
		)
	}
}