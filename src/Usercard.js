import React, { Component } from 'react';

export default class Usercard extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div class="usercard">
				<div class="fulluserinfo">
					<img class="headpic" src={"/apis/" + this.props.userinfo.imgurl} />
					<div class="userinfo">
						<div class="username">
							{this.props.userinfo.name} <i class="iconfont">&#xe6e5;</i>
						</div>
						<div class="userid">
							用户id：{this.props.userinfo.userid}
						</div>
						<div class="taglist">
							<span class="tag"><i class="iconfont">&#xe61d;</i>砖石</span>
							<span class="tag"><i class="iconfont">&#xe61d;</i>砖石</span>
						</div>
					</div>
					<a href="/#/editmy" class="settings"><i class="iconfont">&#xe69e;</i>账号管理</a>
				</div>
			</div>
		)
	}
}