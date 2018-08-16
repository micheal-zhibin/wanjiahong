import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Counter extends Component {
	render() {
		const { value, onIncreaseClick } = this.props
		return (
			<div>
				<span>{value}</span>
				<button onClick={onIncreaseClick}>Increase</button>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		value: state.count
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onIncreaseClick: () => dispatch(increaseAction)
	}
}

const increaseAction = { type: 'increase' }

const App = connect(mapStateToProps, mapDispatchToProps)(Counter)