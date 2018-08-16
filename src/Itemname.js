import React, { Component } from 'react';
import renderHTML from 'react-render-html';

export default class Itemname extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isdown: true,
			isstar: false,
		}
		this.changeupdown = this.changeupdown.bind(this)
	}

	changeupdown() {
		this.setState((prev, prop) => ({
			isdown: !prev.isdown
		}))
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			isstar: nextProps.isstar,
		})
	}

	render() {
		return (
			<div class="iteminfo">
				<div class="itemname">
					<div class="name"><span>{this.props.product.producttype}</span> {this.props.product.name}</div>
					<div class="collect" onClick={this.props.toggleStar}>
						<i class={!this.state.isstar ? 'iconfont' : 'iconfont star'}>{renderHTML(this.state.isstar ? '&#xe6ea;' : '&#xe6eb;')}</i>
						<p>{renderHTML(this.state.isstar ? '已收藏' : '收藏')}</p>
					</div>
				</div>
				<p class="sellinfo">{this.props.product.desc}</p>
				<div class="itemprice">
					<div class="price">￥<span>{this.props.product.price}</span></div>
					<div class="remind">
						降价提醒
					</div>
				</div>
				<div class="promoteinfo">
					<p class="title">促销</p>
					<div class="aside">
						<div class="nav">
							<div class="item downlist" onClick={this.changeupdown} style={!this.state.isdown ? {display: 'none'} : {display: 'flex'}}>
								<p>可享受以下优惠</p>
								<i class="iconfont">&#xe62d;</i>
							</div>
							<div class="item uplist" onClick={this.changeupdown} style={this.state.isdown ? {display: 'none'} : {display: 'flex'}}>
								<span>赠品</span>
								<span>限制</span>
								<span>赠品</span>
								<i class="iconfont">&#xe630;</i>
							</div>
							<div class="item" style={!this.state.isdown ? {display: 'none'} : {display: 'block'}}>
								<span>赠品</span> 赠送下方商品
								<ul class="imglist">
									<img src="https://img13.360buyimg.com/n4/jfs/t19966/175/1122202080/316204/aebc5359/5b14e2adN1288e9ac.png" />
									<img src="https://img13.360buyimg.com/n4/jfs/t19966/175/1122202080/316204/aebc5359/5b14e2adN1288e9ac.png" />
									<img src="https://img13.360buyimg.com/n4/jfs/t19966/175/1122202080/316204/aebc5359/5b14e2adN1288e9ac.png" />
								</ul>
							</div>
							<div class="item" style={!this.state.isdown ? {display: 'none'} : {display: 'block'}}><span>限制</span> 此价格不参与其他促销</div>
							<div class="item" style={!this.state.isdown ? {display: 'none'} : {display: 'block'}}><span>赠品</span> 送送送送</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}