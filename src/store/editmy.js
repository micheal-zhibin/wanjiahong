import axios from 'axios';

async function queryuserinfo(params) {
  return axios.get('/apis/user/getUserInfo/', {});
}

async function updatephonenum(newphonenum) {
	let params = new URLSearchParams();
	params.append('phonenum', newphonenum);
	return axios.post('/apis/user/updatePhonenum/', params, {
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
}

async function updatepwd(oldpwd, newpwd) {
	let params = new URLSearchParams();
	params.append('oldpwd', oldpwd);
	params.append('newpwd', newpwd);
	return axios.post('/apis/user/updatepwd/', params, {
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
}

let editmystore = {
	namespace: 'editmy',
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, search }) => {
				if (pathname === '/editmy') {
					dispatch({
						type: 'queryuserinfo'
					});
				}
			});
		}
	},
	effects: {
		*queryuserinfo({ payload }, { select, call, put }) {
			const { data } = yield call(queryuserinfo);
			if (data.ret == 0) {
				yield put({
					type: 'getmyinfo',
					userinfo: data.userinfo
				});
			}
		},
		*updatePhonenum({ newphonenum }, { select, call, put }) {
			const { data } = yield call(updatephonenum, newphonenum);
			if (data.ret == 0) {
				yield put({
					type: 'updatephonenum',
					phonenum: newphonenum
				});
				alert('修改成功')
			} else {
				alert('网络繁忙，修改失败')
			}
		},
		*updatepwd({ oldpwd, newpwd }, { select, call, put }) {
			const { data } = yield call(updatepwd, oldpwd, newpwd);
			if (data.ret == 0) {
				alert("修改成功");
				location.href = '#/login'
			} else if (data.ret == 4) {
				alert("密码错误，修改失败")
			} else {
				alert("网络繁忙，修改失败")
			}
		},
	},
	state: {
		userinfo: {},
	},
	reducers: {
		getmyinfo(state, action) {
			const { userinfo } = action;
			return Object.assign({}, state, {
				userinfo: userinfo,
			})
		},
		updatephonenum(state, action) {
			const { phonenum } = action;
			let newuserinfo = {};
			for (let it in state.userinfo) {
				if (it == 'phonenum') {
					newuserinfo[it] = phonenum
				} else {
					newuserinfo[it] = state.userinfo[it]
				}
			}
			return Object.assign({}, state, {
				userinfo: newuserinfo,
			})
		},
	},
}

function mapStateToProps(state) {
	return {
		userinfo: state.editmy.userinfo,
	}
}

export {
	editmystore,
	mapStateToProps
}