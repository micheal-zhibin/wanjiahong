import React, { Component } from 'react';
import axios from 'axios';

export default class Banner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imglist: [],
			currentPage: 100,
			bottomindex: 0,
			nowimgurl: 'https://img20.360buyimg.com/mcoss/jfs/t20455/303/262220820/80942/2900c22b/5b07d24fNbd1f3651.jpg'
		}
		this.changePic = this.changePic.bind(this)
		this.leftbtn = this.leftbtn.bind(this)
		this.rightbtn = this.rightbtn.bind(this)
		this.hoverbtn = this.hoverbtn.bind(this)
	}

	componentWillMount() {
		var _ = this;
		axios.get('/apis/myApp/').then(function(result) {
			let newimglist = result.data.imglist.slice();
			newimglist.push(result.data.imglist[0])
			newimglist.unshift(result.data.imglist[result.data.imglist - 1])
			newimglist = newimglist.map(function(v) {
				return "/apis/" + v;
			})
			_.setState({
				imglist: newimglist
			})
			_.interval = setInterval(() => {
				_.changePic()
			}, 2000)
		})
		
	}

	changePic(left) {
		let _ = this
		if (!left) {
			this.setState((prev, prop) => ({
				bottomindex: prev.bottomindex == prev.imglist.length - 3 ? 0 : prev.bottomindex + 1
			}))
			clearInterval(_.animateinterval)
			_.animateinterval = setInterval(function() {
				_.setState((prev, prop) => ({
					currentPage: prev.currentPage >= (prev.imglist.length - 1) * 100 - 10 ? 100 : prev.currentPage + 10,
				}), () => {
					if (_.state.currentPage % 100 == 0) {
						clearInterval(_.animateinterval)
						_.animateinterval = null
					}
				})
			}, 20)
		}
		if (left) {
			this.setState((prev, prop) => ({
				bottomindex: prev.bottomindex == 0 ? prev.imglist.length - 3 : prev.bottomindex - 1,
			}))
			clearInterval(_.animateinterval)
			_.animateinterval = setInterval(function() {
				_.setState((prev, prop) => ({
					currentPage: prev.currentPage <= 10 ? 100 * (prev.imglist.length - 2) : prev.currentPage - 10,
				}), () => {
					if (_.state.currentPage % 100 == 0) {
						clearInterval(_.animateinterval)
						_.animateinterval = null
					}
				})
			}, 20)
		}
	}

	leftbtn() {
		clearInterval(this.interval)
		clearInterval(this.animateinterval)
		this.changePic(true)
		this.interval = setInterval(() => {
			this.changePic()
		}, 2000)
	}

	rightbtn() {
		clearInterval(this.interval)
		clearInterval(this.animateinterval)
		this.changePic(false)
		this.interval = setInterval(() => {
			this.changePic()
		}, 2000)
	}

	hoverbtn(event) {
		let _ = this;
		clearInterval(this.interval)
		this.setState({
			bottomindex: $(event.target).html() - 1,
		})
		clearInterval(_.animateinterval)
		let distance = ($(event.target).html() - parseInt(_.state.currentPage / 100)) * 100,
			final = $(event.target).html() * 100;
		_.animateinterval = setInterval(function() {
			_.setState((prev, prop) => ({
				currentPage: prev.currentPage <= 10 ? 100 * (prev.imglist.length - 2) : prev.currentPage + distance / 10,
			}), () => {
				if (_.state.currentPage == final) {
					clearInterval(_.animateinterval)
					_.animateinterval = null
				}
			})
		}, 20)
		this.interval = setInterval(() => {
			this.changePic()
		}, 2000)
	}

	render() {
		let _ = this;
		let imglilist = _.state.imglist.map(function(v) {
			return <li style={{'width': 100 / _.state.imglist.length + '%'}}><img src={v} /></li>
		})
		return (
			<div class="banner">
				<div id="imgs">
					<ul class="imglist" style={{'width': 100 * this.state.imglist.length + '%', 'left': this.state.currentPage * -1 + '%'}}>
			            {imglilist}
			        </ul>
		        </div>
				<ul class="bottomlist">
		            <li class={this.state.bottomindex == 0 ? "active" : ''} onClick={this.hoverbtn}>1</li>
		            <li class={this.state.bottomindex == 1 ? "active" : ''} onClick={this.hoverbtn}>2</li>
		            <li class={this.state.bottomindex == 2 ? "active" : ''} onClick={this.hoverbtn}>3</li>
		            <li class={this.state.bottomindex == 3 ? "active" : ''} onClick={this.hoverbtn}>4</li>
		            <li class={this.state.bottomindex == 4 ? "active" : ''} onClick={this.hoverbtn}>5</li>
		        </ul>
		        <div class="chooseBut left" onClick={this.leftbtn}><i class="iconfont">&#xe600;</i></div>
		        <div class="chooseBut right" onClick={this.rightbtn}><i class="iconfont">&#xe601;</i></div>
			</div>
		)
	}
}