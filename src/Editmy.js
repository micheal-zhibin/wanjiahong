import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from './store/editmy.js';
import axios from 'axios';

const Editmy = (props) => ({

	componentWillMount() {
		let _ = this;
	},

	convertPhoneNum(num) {
		if (num) {
			return num.substr(0, 3) + '***' + num.substr(-3, 3)
		}
		return ''
	},

	updatephonenum() {
		let newphonenum = $('.editmy .edit_phonenum input').val();
		if (newphonenum.length == 0) {
			alert("请先输入手机号码");
			return false;
		}
		if (!(/^1[34578]\d{9}$/.test(newphonenum))) {
			alert("手机号码有误，请重填");
			return false;
		}
		let _ = this;
		$('.editmy .edit_phonenum input')[0].value = '';
		_.props.dispatch({
			type: 'editmy/updatePhonenum',
			newphonenum: newphonenum
		})
	},

	updatepwd() {
		let oldpwd = $('.editmy .edit_oldpwd input').val(),
			newpwd = $('.editmy .edit_newpwd input').val();
		if (oldpwd.length == 0) {
			alert("请先输入现在的密码");
			return false;
		}
		if (oldpwd.length == 0) {
			alert("请先输入新的密码");
			return false;
		}
		let _ = this;
		$('.editmy .edit_oldpwd input')[0].value = '';
		$('.editmy .edit_newpwd input')[0].value = '';
		_.props.dispatch({
			type: 'editmy/updatepwd',
			oldpwd: oldpwd,
			newpwd: newpwd,
		})
	},

	render() {
		return (
			<div class="editmy">
				<div class="top_text choseitem">当前登录账号</div>
				<div class="myinfo choseitem">
					<img class="myimg" src={"/apis/" + this.props.userinfo.imgurl} />
					<div class="mydetail">
						<div class="myid">用户id: {this.props.userinfo.userid}</div>
						<div class="myemail">邮箱: {this.props.userinfo.email}</div>
					</div>
				</div>
				<div class="phonenum choseitem">
					<p class="explain_txt">修改绑定手机号码</p>
					<p class="right_area">{this.convertPhoneNum(this.props.userinfo.phonenum)}<i class="iconfont">&#xe601;</i></p>
				</div>
				<div class="edit_phonenum edit_area">
					<label>新的手机号码：</label>
					<input type="text" placeholder="请输入新的手机号码" />
					<button class="submit_btn" onClick={this.updatephonenum.bind(this)}>修改</button>
				</div>
				<div class="password choseitem">
					<p class="explain_txt">修改登录密码</p>
					<p class="right_area"><i class="iconfont">&#xe601;</i></p>
				</div>
				<div class="edit_oldpwd edit_area">
					<label>现在的登录密码：</label>
					<input type="password" placeholder="请输入现在的登陆密码" />
				</div>
				<div class="edit_newpwd edit_area">
					<label>新的登录密码：</label>
					<input type="password" placeholder="请输入新的登陆密码" />
					<button class="submit_btn" onClick={this.updatepwd.bind(this)}>修改</button>
				</div>
			</div>
		)
	}
})

const Editmyapp = connect(mapStateToProps)(Editmy)

export default Editmyapp;