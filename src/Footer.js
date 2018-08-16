import React, { Component, PropTypes } from 'react';

// dva 的 connect 方法可以将组件和数据关联在一起
import { connect } from 'dva';

class Footer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="footer">
				<a href="#/" class={this.props.tagindex == 1 ? "tag cur" : 'tag'}>
					<i class="iconfont">&#xe61a;</i>
					首页
				</a>
				<a href="#/chatroom" class={this.props.tagindex == 2 ? "tag cur" : 'tag'}>
					<i class="iconfont">&#xe625;</i>
					实时讨论
				</a>
				<a href="#/shopcar" class={this.props.tagindex == 3 ? "tag cur" : 'tag'}>
					<i class="iconfont">&#xe698;</i>
					购物车
				</a>
				<a href="#/myindex" class={this.props.tagindex == 4 ? "tag cur" : 'tag'}>
					<i class="iconfont">&#xe615;</i>
					个人中心
				</a>
			</div>
		)
	}
}

// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return {...state.data};
}

// 关联 model
export default connect(mapStateToProps)(Footer);