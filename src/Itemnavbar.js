import React, { Component } from 'react';
import renderHTML from 'react-render-html';

export default class Itemnavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showchose: true,
			activenum: 0,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			activenum: nextProps.activenum,
		})
	}

	render() {
		return (
			<div class="navbar">
				<a onClick={this.props.jumpTag} href="javascript: void(0)" class={this.state.activenum == 0 ? "active" : ""}>商品</a>
				<a onClick={this.props.jumpTag} href="javascript: void(0)" class={this.state.activenum == 1 ? "active" : ""}>评价</a>
				<a onClick={this.props.jumpTag} href="javascript: void(0)" class={this.state.activenum == 2 ? "active" : ""}>详情</a>
				<a onClick={this.props.jumpTag} href="javascript: void(0)" class={this.state.activenum == 3 ? "active" : ""}>推荐</a>
			</div>
		)
	}
}