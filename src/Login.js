import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// class Counter extends Component {
// 	render() {
// 		const { value, onIncreaseClick } = this.props
// 		return (
// 			<div>
// 				<span>{value}</span>
// 				<button onClick={onIncreaseClick}>Increase</button>
// 			</div>
// 		)
// 	}
// }

// function mapStateToProps(state) {
// 	return {
// 		value: state.count
// 	}
// }

// function mapDispatchToProps(dispatch) {
// 	return {
// 		onIncreaseClick: () => dispatch(increaseAction)
// 	}
// }

// const increaseAction = { type: 'increase' }

// const CounterApp = connect(mapStateToProps, mapDispatchToProps)(Counter)

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			isnull: true,
		}
		this.handleUsername = this.handleUsername.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleUsername(e) {
		this.setState({
			username: e.target.value,
			isnull: (e.target.value == '' || this.state.password == ''),
		})
	}

	handlePassword(e) {
		this.setState({
			password: e.target.value,
			isnull: (e.target.value == '' || this.state.username == ''),
		})
	}

	handleSubmit(e) {
		let _ = this;
		if ($(e.target).hasClass('active')) {
			var params = new URLSearchParams();
			params.append('user', _.state.username,);
			params.append('pwd', _.state.password);
			axios.post('/apis/login/', params, {
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function (response) {
			    if (response.data.code == 0) {
			    	_.backIndex()
			    } else {
			    	alert('账号或密码输入错误，请重新输入')
			    }
			})
		}
	}

	logout(e) {
		axios.get('http://localhost:8080/logout/').then(function (response) {
		    if (response.data.code == 0) {
		    	_.backIndex()
		    }
		})
	}

	backIndex() {
		location.href=''
	}

	render() {
		return (
			<div class="loginindex">
				<div class="head">
					<i onClick={this.backIndex} class="iconfont">&#xe600;</i>
					<h1>用户登录</h1>
				</div>
				<div class="topnav">
					<div><span class="cur">账号密码登录</span></div>
					<div><span>马上注册</span></div>
				</div>
				<div class="inputgroup">
					<div>
						<label>账号</label>
						<input type="text" value={this.state.username} onChange={this.handleUsername} placeholder="用户名"></input>
					</div>
					<div>
						<label>密码</label>
						<input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="请输入密码"></input>
					</div>
				</div>
				<div onClick={this.handleSubmit} class={this.state.isnull ? 'button' : 'button active'}>登 录</div>
			</div>
		)
	}
}