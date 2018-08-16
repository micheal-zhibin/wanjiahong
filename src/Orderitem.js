import React, { Component } from 'react';

export default class Orderitem extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div class="myorderitem">
				<div class="orderid">订单号：<span class="idnum">7242123</span></div>
				<div class="orderstatus">
					<div class="status">
						<p class="statusinfo">状态：<span>配送中</span></p>
						<p class="price">总价：<span>￥16000</span></p>
					</div>
					<div class="buyagain">再次购买</div>
				</div>
				<div class="wuliubar">
					<p class="wuliuinfo">你的订单在广州发货成功，准备送往目的地广州番禺</p>
					<p class="time">2018-07-10 07:22:57</p>
				</div>
				<a href="#/item/5" class="orderitem">
					<img class="itemimg" src="//img10.360buyimg.com/n2/jfs/t20488/33/1766674370/406759/690aa99a/5b35b7c4n367ca477.jpg.dpg" />
					<div class="iteminfo">
						<p class="itemname">缅甸花梨五件套缅甸花梨五件套缅甸花梨五件套缅甸花梨五件套</p>
						<p class="itemcount">x1</p>
					</div>
				</a>
			</div>
		)
	}
}