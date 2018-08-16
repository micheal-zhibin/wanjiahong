import React, { Component } from 'react';
import Footer from './Footer';
import Productlist from './Productlist';
import Shopcaritem from './Shopcaritem';
import axios from 'axios';
import dva, { connect } from 'dva';
import { mapStateToProps } from './store/shopcar.js';
import renderHTML from 'react-render-html';

const Shopcar = (props) => ({
	componentWillMount() {
		$(window).off()
	},

	componentWillUnmount() {
		if (this.props.shopcarlist.length == 0) {
			return false;
		}
		this.props.dispatch({
			type: 'shopcar/updateshopcar',
		})
	},

	render() {
		let _ = this;
		return (
			<div class="shopcar">
				<div class="addressheader">
					<div class="address">
						<i class="iconfont">&#xe8ff;</i>
						<span class="addressinfo">深圳市宝安区裕安一路菁英趣庭3栋20c</span>
					</div>
					<div class="editbtn">编辑商品</div>
				</div>
				<div class="noproduct">你暂时还没有添加过商品，快去逛逛添加吧~</div>
				<Shopcaritem shopcarlist={this.props.shopcarlist} dispatch={this.props.dispatch} />
				<div class="gap">可能你还想要</div>
				<div class="productbox">
					<Productlist productlist={this.props.productitemlist} />
				</div>
				<div class="sumbottom">
					<div class="choseall">
						<i class="iconfont" onClick={() => {this.props.dispatch({type: 'shopcar/choseall'})}}>{renderHTML(this.props.allchose == 1 ? '&#xe730;' : '&#xe72f;')}</i>全选
					</div>
					<div class="sumnum">
						<p class="finalnum">总计：<span>￥{this.props.totalprice}</span></p>
						<p class="orignalnum">总额<span class="fullnum">￥0</span>立减<span class="salenum">￥0</span></p>
					</div>
					<div class="gotopay">
						去结算<span>(0件)</span>
					</div>
				</div>
			</div>
		)
	}
})

const Shopcarapp = connect(mapStateToProps)(Shopcar)

export default Shopcarapp;
