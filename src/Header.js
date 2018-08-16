import React, { Component } from 'react';
import wjh from "./Utils";

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.gotoMy = this.gotoMy.bind(this)
	}

	gotoMy(e) {
		e.preventDefault()
		let myid = wjh.cookie.get('userid').split(':')[0]
		if (myid && myid > 0) {
			setTimeout(function() {
				location.href = '#/myindex'
			}, 0)
		} else {
			setTimeout(function() {
				location.href = '#/login'
			}, 0)
		}
	}

	render() {
		return (
			<div class="header">
				<a href="javascript:void(0)" onClick={this.gotoMy} class="menu">
					<i class="iconfont">&#xe615;</i>
				</a>
				<div class="search">
					<i class="iconfont">&#xe6ac;</i>
					<input type="text" />
				</div>
			</div>
		)
	}
}