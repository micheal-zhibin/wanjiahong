import React, { Component } from 'react';

export default class Navbar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="navbar">
				<a href="#/index"><i class="iconfont">&#xe618;</i><div>商铺首页</div></a>
				<a><i class="iconfont">&#xe637;</i><div>供应信息</div></a>
				<a><i class="iconfont">&#xe627;</i><div>人才招聘</div></a>
				<a><i class="iconfont">&#xe6f3;</i><div>博客文章</div></a>
			</div>
		)
	}
}