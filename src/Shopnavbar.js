import React, { Component } from 'react';
import renderHTML from 'react-render-html';

export default class Shopnavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showchose: true
		};
		this.changenav = this.changenav.bind(this)
	}

	changenav(e) {
		e.preventDefault()
		this.prop.changeType0()
		$(e.target).addClass('active').siblings().removeClass('active')
	}

	render() {
		return (
			<div class="navbar">
				<a onClick={this.changenav} href="javascript: void(0)" class="active">最新上架</a>
				<a onClick={this.props.chosesort} href="javascript: void(0)">{renderHTML(this.props.showchose ? '价格<i class="iconfont">&#xe62d</i>' : '价格<i class="iconfont">&#xe630</i>')}</a>
				<a onClick={this.changenav} href="javascript: void(0)">销量最多</a>
				<a onClick={this.changenav} href="javascript: void(0)">评价最多</a>
			</div>
		)
	}
}