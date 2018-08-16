import React, { Component } from 'react';

export default class Itembanner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imglist: [
				'https://img20.360buyimg.com/mcoss/jfs/t20455/303/262220820/80942/2900c22b/5b07d24fNbd1f3651.jpg',
				'https://img11.360buyimg.com/mcoss/jfs/t19219/196/2569730449/81728/522e9f50/5b05373bNa6b3098e.jpg',
				'https://img11.360buyimg.com/mcoss/jfs/t19723/175/2657911933/77195/155c9cc6/5b053757Nef1d1072.jpg',
				'https://img20.360buyimg.com/mcoss/jfs/t20452/60/253968453/63678/eb3a13eb/5b07d54aN3d5ac722.jpg',
				'https://img1.360buyimg.com/da/s750x366_jfs/t20437/181/275823323/251381/742e317d/5b07daa5Ne4569be4.jpg!cc_750x366.dpg'
			],
			currentPage: 0,
			leftval: 0,
			formarleft: 0,
		}
		this.changePic = this.changePic.bind(this)
		this.startSlide = this.startSlide.bind(this)
		this.moveSlide = this.moveSlide.bind(this)
		this.endSlide = this.endSlide.bind(this)
	}

	changePic(left) {
		let _ = this,
			imgwidth = $('#imgs').width();
		if (!left) {
			_.setState((prev, prop) => ({
				currentPage: prev.currentPage >= (prev.imglist.length - 1) ? (prev.imglist.length - 1) : (prev.currentPage + 1)
			}))
			clearInterval(_.animateinterval)
			_.animateinterval = setInterval(function() {
				_.setState((prev, prop) => {
					let newleftval = 0;
					if (prev.leftval <= (prev.imglist.length - 1) * -1 * imgwidth) {
						newleftval = (prev.imglist.length - 1) * -1 * imgwidth
					} else if (prev.leftval - imgwidth / 10 <= (Math.abs(parseInt(prev.leftval / imgwidth)) + 1) * imgwidth * -1) {
						newleftval = (Math.abs(parseInt(prev.leftval / imgwidth)) + 1) * imgwidth * -1
					} else {
						newleftval = prev.leftval - imgwidth / 10
					}
					return {
						leftval: newleftval
					}
				}, () => {
					if (_.state.leftval % imgwidth == 0) {
						clearInterval(_.animateinterval)
						_.animateinterval = null
					}
				})
			}, 10)
		}
		if (left) {
			_.setState((prev, prop) => ({
				currentPage: prev.currentPage <= 0 ? 0 : (prev.currentPage - 1)
			}))
			clearInterval(_.animateinterval)
			clearInterval(_.animateinterval)
			_.animateinterval = setInterval(function() {
				_.setState((prev, prop) => {
					let newleftval = 0;
					if (prev.leftval >= 0) {
						newleftval = 0
					} else if (prev.leftval + imgwidth / 10 >= Math.abs(parseInt(prev.leftval / imgwidth)) * imgwidth * -1) {
						newleftval = Math.abs(parseInt(prev.leftval / imgwidth)) * imgwidth * -1
					} else {
						newleftval = prev.leftval + imgwidth / 10
					}
					console.log(newleftval)
					return {
						leftval: newleftval
					}
				}, () => {
					if (_.state.leftval % imgwidth == 0) {
						clearInterval(_.animateinterval)
						_.animateinterval = null
					}
				})
			}, 10)
		}
	}

	startSlide(e){
		this.setState({
			startx: parseInt(e.changedTouches[0].pageX)
		});
	}

	moveSlide(e){
		let _ = this,
			rangeX = parseInt(e.changedTouches[0].pageX) - this.state.startx,
			imgwidth = $('#imgs').width();

		_.setState((prev, prop) => ({
			leftval: (prev.leftval - prev.formarleft + rangeX) > imgwidth * 3 / 8 ? imgwidth * 3 / 8 : (prev.leftval - prev.formarleft + rangeX) < (prev.imglist.length - 1 + 3 / 8) * -1 * imgwidth ? (prev.imglist.length - 1 + 3 / 8) * -1 * imgwidth : (prev.leftval - prev.formarleft + rangeX),
			formarleft: rangeX
		}))
	}

	endSlide(e){
		let _ = this,
			rangeX = parseInt(e.changedTouches[0].pageX) - this.state.startx,
			imgwidth = $('#imgs').width();

		_.setState((prev, prop) => ({
			leftval: (prev.leftval - prev.formarleft + rangeX) >= imgwidth * 3 / 8 ? 0 : (prev.leftval - prev.formarleft + rangeX) <= (prev.imglist.length - 1 + 3 / 8) * -1 * imgwidth ? (prev.imglist.length - 1) * -1 * imgwidth : (prev.leftval - prev.formarleft + rangeX),
			formarleft: 0
		}), () => {
			if (rangeX < -imgwidth * 3 / 8 && this.state.currentPage < this.state.imglist.length - 1) {
				this.changePic()
			} else if (rangeX > imgwidth * 3 / 8 && this.state.currentPage > 0) {
				this.changePic(true)
			} else {
				_.setState((prev, prop) => ({
					leftval: prev.leftval == 0 ? 0 : prev.leftval ==  (prev.imglist.length - 1) * -1 * imgwidth ?  (prev.imglist.length - 1) * -1 * imgwidth : (prev.leftval - rangeX),
					formarleft: 0
				}))
			}
		})
	}

	render() {
		let _ = this;
		let imglilist = _.state.imglist.map(function(v) {
			return <li style={{'width': 100 / _.state.imglist.length + '%'}}><img src={v} /></li>
		})
		return (
			<div class="banner">
				<div onTouchStart={this.startSlide} onTouchMove={this.moveSlide} onTouchEnd={this.endSlide} id="imgs">
					<ul class="imglist" style={{'width': 100 * this.state.imglist.length + '%', 'left': this.state.leftval + 'px'}}>
			            {imglilist}
			        </ul>
		        </div>
				<ul class="bottomlist">
		            <li class={this.state.currentPage == 0 ? "active" : ''}></li>
		            <li class={this.state.currentPage == 1 ? "active" : ''}></li>
		            <li class={this.state.currentPage == 2 ? "active" : ''}></li>
		            <li class={this.state.currentPage == 3 ? "active" : ''}></li>
		            <li class={this.state.currentPage == 4 ? "active" : ''}></li>
		        </ul>
			</div>
		)
	}
}