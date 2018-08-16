import React, { Component } from 'react';
import renderHTML from 'react-render-html';

export default class Chatroom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chatlist: [{
				type: 'middle',
				imagepath: 'statics/images/132.jpeg',
				content: '成功加入聊天室'
			}],
			inputval: '',
		}
		this.handleClick = this.handleClick.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount() {
		let _ = this;
		_.socket = new WebSocket("ws://" + window.location.host + "/wsapp/echo_once/");
		_.socket.onopen = function() {
			console.log('WebSocket open'); //成功连接上Websocket
			_.socket.send(JSON.stringify({
				type: 'start'
			})); //发送数据到服务端
			_.hreatbeat = setInterval(function() {
				_.socket.send(JSON.stringify({
					type: 'heartbeat'
				}))
			}, 30000)
		};
		_.socket.onmessage = function(e) {
			const retmsg = JSON.parse(e.data)
			console.log(retmsg)
			if (retmsg.type == 'middle' || retmsg.type == 'left' || retmsg.type == 'right') {
				let chatitem = {
					type: retmsg.type,
					content: retmsg.content,
					imagepath: retmsg.imagepath,
				}
				_.setState({
					chatlist: _.state.chatlist.concat(chatitem)
				})
			}
		};
		_.socket.onclose = function(e) {
			console.log(e)
		}
		_.socket.onerror = function(e) {
			alert('网络异常，返回首页')
			location.href = '#/'
		}
	}

	componentWillUnmount() {
		clearInterval(this.hreatbeat)
	}

	handleClick(e) {
		this.socket.send(JSON.stringify({
			type: 'speak',
			content: this.state.inputval,
		}))
		this.setState({
			inputval: ''
		})
	}

	handleChange(e) {
		this.setState({
			inputval: e.target.value
		})
	}

	render() {
		let _ = this;
		let lilist = _.state.chatlist.map(function(v) {
			return <div class={v.type + ' chatitem'}>
						<img class="userimg" src={"/apis/" + v.imagepath} />
						<div class="content">{v.content}</div>
					</div>
		})
		return (
			<div class="chatroom">
				<div class="topbar">
					<a href="#/" class="backtop">&lt;首页</a>
					<div class="chatroomname">实时讨论室</div>
				</div>
				<div class="chatarea">
					{lilist}
				</div>
				<div class="inputarea">
					<input onChange={this.handleChange} class="textinput" type="text" value={this.state.inputval}/>
					<i class="iconfont">&#xe64a;</i>
					<button onClick={this.handleClick} class="sendmsg">发送</button>
				</div>
			</div>
		)
	}
}
