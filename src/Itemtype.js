import React, { Component } from 'react';

export default class Itemtype extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemnum: 1,
			productitem: {},
		}
		this.clicktab = this.clicktab.bind(this)
		this.minusnum = this.minusnum.bind(this)
		this.plusnum = this.plusnum.bind(this)
	}

	clicktab(e) {
		if ($(e.target).is('span')) {
			$(e.target).addClass('active').siblings().removeClass('active')
		}
	}

	minusnum() {
		if (this.state.itemnum <= 1) {
			return false;
		}
		this.setState((prev, prop) => ({
			itemnum: prev.itemnum - 1
		}))
	}

	plusnum() {
		this.setState((prev, prop) => ({
			itemnum: prev.itemnum + 1
		}))
	}

	componentWillReceiveProps(nextProps) {
        this.setState({
        	productitem: nextProps.product
        });
    }

	render() {
		let _ = this;
		let typelist = []
		if (this.state.productitem.tablist) {
			typelist = this.state.productitem.tablist.map(function(v) {
				return <span class="tab">{v.tabname}</span>
			})
		}
		return (
			<div class="itemtype">
				<div class="itemcolor">
					<div class="title">颜色</div>
					<div onClick={this.clicktab} class="tablist">
						{typelist}
					</div>
				</div>
				<div class="itemnum">
					<div class="title">数量</div>
					<div class="number">
						<span onClick={this.minusnum} class={this.state.itemnum <= 1 ? 'minus disabled' : 'minus'}><i class="iconfont">&#xe95e;</i></span>
						<input class="num" type="tel" value={this.state.itemnum} />
						<span onClick={this.plusnum} class="plus"><i class="iconfont">&#xe931;</i></span>
					</div>
				</div>
			</div>
		)
	}
}