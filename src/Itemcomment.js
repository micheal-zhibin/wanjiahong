import React, { Component } from 'react';
import renderHTML from 'react-render-html';

export default class Itemcomment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentlist: [],
			seeMore: false,
		}
		this.formatTime = this.formatTime.bind(this)
		this.getMore = this.getMore.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			commentlist: nextProps.commentlist,
		})
	}

	getMore() {
		this.setState({
			seeMore: true,
		})
	}

	formatTime(now) {
		return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
	}

	render() {
		let _ = this,
			len = this.state.commentlist.length;
		let commettxtlist = this.state.commentlist.map(function(v) {
			let now = _.formatTime(new Date(v.createtime * 1000))
			return <li class="comment"><div class="user"><div class="username">{v.username}</div><ul class="rating"><li class="star"><i class="iconfont">{renderHTML(v.star >= 1 ? '&#xe6ea;' : '&#xe6eb;')}</i></li><li class="star"><i class="iconfont">{renderHTML(v.star >= 2 ? '&#xe6ea;' : '&#xe6eb;')}</i></li><li class="star"><i class="iconfont">{renderHTML(v.star >= 3 ? '&#xe6ea;' : '&#xe6eb;')}</i></li><li class="star"><i class="iconfont">{renderHTML(v.star >= 4 ? '&#xe6ea;' : '&#xe6eb;')}</i></li><li class="star"><i class="iconfont">{renderHTML(v.star >= 5 ? '&#xe6ea;' : '&#xe6eb;')}</i></li></ul><div class="date">{now}</div></div><div class="commentbody">{v.content}</div></li>
		}).slice(0, this.state.seeMore ? len : 3)
		let cangetmore = commettxtlist.length <= 3 && len > 3
		let goodcomment = this.state.commentlist.filter(function(v) {
				return v.star >= 4;
			}),
			middlecomment = this.state.commentlist.filter(function(v) {
				return v.star >= 2 && v.star < 4;
			}),
			badcomment = this.state.commentlist.filter(function(v) {
				return v.star < 2;
			}),
			hasimgcomment = this.state.commentlist.filter(function(v) {
				return v.imglist && v.imglist.length > 0;
			});
		return (
			<div class="itemcomment">
				<div class="commenttitle">
					<div class="title">评价</div>
					<div class="good">好评 {parseInt(goodcomment.length / this.state.commentlist.length * 100) + '%'}</div>
					<div class="sum" onClick={this.getMore}>共{this.state.commentlist.length > 100 ? '100+' : this.state.commentlist.length}条{cangetmore && <i class="iconfont">&#xe630;</i>}</div>
				</div>
				<div class="commenttablist">
					<div class="tab">好评({goodcomment.length > 100 ? '100+' : goodcomment.length})</div>
					<div class="tab">中评({middlecomment.length > 100 ? '100+' : middlecomment.length})</div>
					<div class="tab">差评({badcomment.length > 100 ? '100+' : badcomment.length})</div>
					<div class="tab">有图({hasimgcomment.length > 100 ? '100+' : hasimgcomment.length})</div>
				</div>
				<ul class="commentlist">
				    {commettxtlist}
				</ul>
				{cangetmore && <div class="getMore" onClick={this.getMore}>查看全部评价</div>}
			</div>
		)
	}
}