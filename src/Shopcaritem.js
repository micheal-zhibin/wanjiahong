import React, { Component } from 'react';
import renderHTML from 'react-render-html';

export default class Shopcaritem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { shopcarlist, dispatch } = this.props
		let shopcartxtlist = shopcarlist.map(function(v, index) {
			if (v.addnum == 0) {
				return;
			}
			return <div class="shopitem" key={v.skuid}>
					<i class="select iconfont" onClick={() => {dispatch({'type': 'shopcar/choseproduct', 'choseid': v.skuid})}}>{renderHTML(v.ischose == 1 ? '&#xe730;' : '&#xe72f;')}</i>
					<div class="iteminfo">
						<img class="itemimg" src={'/apis/' + v.imagepath} />
						<div class="itemdetail">
							<p class="name">{v.name}</p>
							<p class="desc">{v.desc}</p>
							<div class="productinfo">
								<p class="price">￥{v.price}</p>
								<div class="number">
									<span class={v.addnum > 1 ? 'minus' : 'minus disabled'} onClick={() => {dispatch({'type': 'shopcar/minusproductnum', 'choseid': v.skuid})}}><i class="iconfont">&#xe95e;</i></span>
									<input class="num" type="tel" value={v.addnum} />
									<span class="plus" onClick={() => {dispatch({'type': 'shopcar/addproductnum', 'choseid': v.skuid})}}><i class="iconfont">&#xe931;</i></span>
								</div>
							</div>
						</div>
					</div>
					<div class="closebtn" onClick={() => {dispatch({'type': 'shopcar/deleteproduct', 'choseid': v.skuid})}}>x</div>
				</div>
		})
		return (
			<div class="itemlist">
				{shopcartxtlist}
			</div>
		)
	}
}
