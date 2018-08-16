import React, { Component } from 'react';

export default class Infobox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="infobox">
				<h1>公司介绍</h1>
				<p class="maininfo">
					浙江万家红红木家具厂位于浦江县城仅三公里，距离义乌福田市场半小时路程,交通便利。 万家红是一家专业生产和销售红木家具的企业，现生产厂房占地面积5000多平方米，拥有员工一百余名。本厂生产设备先进，技术力量雄厚，采用美国最新干燥设备，产品质量稳定，深受客户的好评。 本厂生产的“万家红”红木家具系列，全部以纯正的进口红木原料，经科学烘干处理，产品具有鲜明的个性和独特的品质，精心为你营造了一个高雅，古典的中国家庭。本厂竭诚欢迎国内外新老客户光临惠顾。
				</p>
				<a href="#/info" class="more">查看更多</a>
			</div>
		)
	}
}