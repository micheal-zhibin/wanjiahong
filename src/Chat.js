import React, { Component } from 'react';

export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slide: {		//滑动
				startTime: 0,
				startY: 0,
				currY: 0
			}
		}
		this.moveSlide = this.moveSlide.bind(this)
		this.startSlide = this.startSlide.bind(this)
		this.endSlide = this.endSlide.bind(this)
	}

	startSlide(e){
		e.preventDefault();
		console.log('开始');
		this.setState({
			slide: {
				startTime: e.timeStamp,
				startY: e.changedTouches[0].pageY
			}
		});
		console.log(this.state.slide)
	}

	moveSlide(e){
		e.preventDefault();
		console.log(e.changedTouches[0].pageY - this.state.slide.startY)
		this.setState({
			slide: {
				currY: e.changedTouches[0].pageY - this.state.slide.startY
			}
		});
		console.log(this.state.slide)
	}

	endSlide(e){
		console.log(this.state.slide.startY)
		e.preventDefault();
		var time = e.timeStamp - this.state.slide.startTime,
			rangeY = e.changedTouches[0].pageY - this.state.slide.startY,
			speed = Math.abs(rangeY / time);
			console.log('速度:', speed);
		console.log(this.state.slide)
		// if(this.state.slideY > 0){}
	}

	render() {
		var chatBoxEvents = {
			onTouchStart: this.startSlide,
			onTouchMove: this.moveSlide,
			onTouchEnd: this.endSlide
		};
		var chatBoxStyle = {
			transform : 'translate3d(0,' + this.state.slide.currY + 'px,0)',
			width: '100%',
			height: '5rem',
			textAlign: 'center',
			lineHeight: '5rem'
		};


		return (
			<div className="chat-box" {...chatBoxEvents} style={chatBoxStyle}>
				chatBox
			</div>
		);
	}
}