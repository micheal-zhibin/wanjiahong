import React, { Component } from 'react';

export default class Indexheader extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="header">
				<a href="#/login" class="menu">
					<i class="iconfont">&#xe615;</i>
				</a>
				<div class="search">
					<i class="iconfont">&#xe6ac;</i>
					<input type="text" onChange={this.props.changesearchmsg}/>
				</div>
				<div class="button" onClick={this.props.gosearch}>搜索</div>
			</div>
		)
	}
}