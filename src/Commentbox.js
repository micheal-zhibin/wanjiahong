import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import axios from 'axios';

export default class Commentbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			star: 5,
			imglist: [],
		}
		this.getStar = this.getStar.bind(this)
		this.getContent = this.getContent.bind(this)
		this.addimg = this.addimg.bind(this)
		this.submitComment = this.submitComment.bind(this)
	}

	getStar(e) {
		this.setState({
			star: $(e.target).parent().index() + 1
		})
	}

	getContent(e) {
		this.setState({
			content: $(e.target).val()
		})
	}

	submitComment(e) {
		let _ = this;
		var params = new URLSearchParams();
		params.append('skuid', _.props.skuid);
		params.append('content', _.state.content);
		params.append('stars', _.state.star);
		params.append('imglist', _.state.imglist);
		axios.post('http://localhost:8888/product/addcomment/', params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			withCredentials: true,
		}).then(({ data }) => {
			_.setState({
				star: 5,
				content: '',
				imglist: []
			})
			if (data.ret == 0) {
				alert('评论成功')
			} else {
				alert('网络繁忙，评论失败')
			}
		})
	}

	addimg(e) {
		let _ = this;
		let reads = new FileReader();
		let f = e.target.files[0];
		reads.readAsDataURL(f);
		reads.onload = function(e) {
			let result = this.result,
				newlist = _.state.imglist
			if (newlist.length >= 3) {
				newlist.shift()
				newlist.push(result)
			} else {
				newlist.push(result)
			}
			_.setState({
				imglist: newlist
			})
		};
	}

	render() {
		let uploadimglist = this.state.imglist.map(function(v) {
			return <img class="uploadimg" src={v} />
		})
		return (
			<div class="commentbox">
				<div class="ratingbox">
					<p>商品评价：</p>
					<ul class="rating">
						<li class="star" onClick={this.getStar}><i class="iconfont">{renderHTML(this.state.star >= 1 ? '&#xe6ea;' : '&#xe6eb;')}</i></li>
						<li class="star" onClick={this.getStar}><i class="iconfont">{renderHTML(this.state.star >= 2 ? '&#xe6ea;' : '&#xe6eb;')}</i></li>
						<li class="star" onClick={this.getStar}><i class="iconfont">{renderHTML(this.state.star >= 3 ? '&#xe6ea;' : '&#xe6eb;')}</i></li>
						<li class="star" onClick={this.getStar}><i class="iconfont">{renderHTML(this.state.star >= 4 ? '&#xe6ea;' : '&#xe6eb;')}</i></li>
						<li class="star" onClick={this.getStar}><i class="iconfont">{renderHTML(this.state.star >= 5 ? '&#xe6ea;' : '&#xe6eb;')}</i></li>
					</ul>
				</div>
				<div class="contentbox">
					<textarea onChange={this.getContent} value={this.state.content} placeholder="分享体验心得，给万千想买的人一个参考~长度在6-500字之间"></textarea>
				</div>
				<div class="imgbox">
					<p>添加图片（最多三张）</p>
					<div class="imglist">
						{uploadimglist}
						<div class="addimgbtn">
							<a class="addimg"><i class="iconfont">&#xe931;</i></a>
							<input class="upload_addimginput" accept="image/png, image/jpeg, image/gif, image/jpg" id="inputImg" type="file" onChange={this.addimg} />
						</div>
					</div>
				</div>
				<div class="submitbtn" onClick={this.submitComment}>提交评价</div>
			</div>
		)
	}
}