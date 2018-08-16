import React, { Component } from 'react';

export default class Starlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userinfo: {},
			showorderlist: false,
		}
	}

	render() {
		let _ = this;
		let lilist = _.props.starlist.map(function(v) {
			return <div class="staritem">
					<img src={'/apis/' + v.imagepath} />
					<div class="iteminfo">
						<p class="itemname">{v.name}</p>
						<p class="detail">{v.desc}</p>
						<p class="itemprice">￥ {v.price}</p>
					</div>
				</div>
		})
		return (
			<div class="starlist">
				<p class="itemsum">共<span>{this.props.starlist.length}</span>件商品</p>
				{lilist}
			</div>
		)
	}
}