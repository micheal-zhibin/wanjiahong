import axios from 'axios';

const fetchmyinfo = (dispatch) => new Promise(function (resolve, reject) {
	return axios.get('/apis/user/getUserInfo/', {})
	.then(function(result) {
		dispatch({
			type: 'getmyinfo',
			userinfo: result.data.userinfo
		})
	})
})

const updatephonenum = (dispatch, ownprops, phonenum) => {
	dispatch({
		type: 'updatephonenum',
		phonenum
	})
}

function mapStateToProps(state) {
	return {
		userinfo: state.userinfo,
	}
}

function mapDispatchToProps(dispatch, ownprops) {
	return {
		getmyinfo: () => fetchmyinfo(dispatch, ownprops),
		updatephonenum: (...args) => updatephonenum(dispatch, ownprops, ...args),
	}
}

export default {
	mapStateToProps,
	mapDispatchToProps
}