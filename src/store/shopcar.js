import axios from 'axios';

async function fetchshopcarlist(params) {
	return axios.get('/apis/product/getShopCarList/', {})
}

async function fetchproductlist(params) {
	return axios.get('/apis/product/show/?index=0&length=100', {})
}

async function initshopcar(params) {
	return Promise.all([axios.get('/apis/product/getShopCarList/', {}), axios.get('/apis/product/show/?index=0&length=100', {})])
}

async function updateshopcar(shopcarlist) {
	let skuids = [];
	$.each(shopcarlist, function(index, item) {
		skuids.push(item.skuid + ',' + item.addnum)
	})
	return axios.get('/apis/product/updateShopCarList/', {
		params: {
			skuids: skuids.join(';')
		}
	})
}

let shopcarstore = {
	namespace: 'shopcar',
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, search }) => {
				if (pathname === '/shopcar') {
					dispatch({
						type: 'initshopcar'
					})
				}
			});
		}
	},
	effects: {
		*initshopcar ({ payload }, { select, call, put }) {
			const result = yield call(initshopcar);
			yield put({
				type: 'initState',
				productitemlist: result[1].data.productlist,
				shopcarlist: result[0].data.shopcarlist,
			});
		},
		*fetchproductlist ({ payload }, { select, call, put }) {
			const { data } = yield call(fetchproductlist);
			yield put({
				type: 'getproductitemlist',
				productitemlist: result[1].data.productlist,
			});
		},
		*fetchshopcarlist ({ payload }, { select, call, put }) {
			const { data } = yield call(fetchshopcarlist);
			yield put({
				type: 'getshopcarlist',
				shopcarlist: result[0].data.shopcarlist,
			});
		},
		*updateshopcar ({ payload }, { select, call, put }) {
			let shopcarlist = yield select((state) => ({shopcarlist: state.shopcar.shopcarlist}));
			if (shopcarlist.length == 0) {
				return false;
			}
			const { data } = yield call(updateshopcar, shopcarlist.shopcarlist);
		},
	},
	state: {
		productitemlist: [],
		shopcarlist: [],
		totalprice: 0,
	},
	reducers: {
		getproductitemlist(state, action) {
			const { productitemlist } = action
			return Object.assign({}, state, {
				productitemlist: productitemlist
			})
		},
		getshopcarlist(state, action) {
			const { shopcarlist } = action
			return Object.assign({}, state, {
				shopcarlist: shopcarlist
			})
		},
		initState(state, action) {
			const { productitemlist, shopcarlist } = action
			return Object.assign({}, state, {
				productitemlist: productitemlist,
				shopcarlist: shopcarlist,
			})
		},
		choseproduct(state, action) {
			const { choseid } = action
			let newshopcarlist = [];
			state.shopcarlist.map(function(v) {
				let newitem = v;
				newitem.ischose = v.skuid == choseid ? v.ischose == 1 ? 0 : 1 : v.ischose;
				newshopcarlist.push(newitem)
			})
			return Object.assign({}, state, {
				shopcarlist: newshopcarlist,
			})
		},
		addproductnum(state, action) {
			const { choseid } = action
			let newshopcarlist = [];
			state.shopcarlist.map(function(v) {
				let newitem = v;
				newitem.addnum = v.skuid == choseid ? v.addnum + 1 : v.addnum;
				newshopcarlist.push(newitem)
			})
			return Object.assign({}, state, {
				shopcarlist: newshopcarlist,
			})
		},
		minusproductnum(state, action) {
			const { choseid } = action
			let newshopcarlist = [];
			state.shopcarlist.map(function(v) {
				let newitem = v;
				newitem.addnum = v.skuid == choseid ? v.addnum - 1 > 0 ? v.addnum - 1 : v.addnum : v.addnum;
				newshopcarlist.push(newitem)
			})
			return Object.assign({}, state, {
				shopcarlist: newshopcarlist,
			})
		},
		deleteproduct(state, action) {
			const { choseid } = action
			let newshopcarlist = [];
			state.shopcarlist.map(function(v) {
				let newitem = v;
				newitem.addnum = v.skuid == choseid ? 0 : v.addnum;
				newshopcarlist.push(newitem)
			})
			return Object.assign({}, state, {
				shopcarlist: newshopcarlist,
			})
		},
		choseall(state, action) {
			let allchose = state.shopcarlist.filter(function(v) {
				return !v.ischose && v.addnum > 0
			}).length == 0
			let newshopcarlist = [];
			state.shopcarlist.map(function(v) {
				let newitem = v;
				newitem.ischose = !allchose
				newshopcarlist.push(newitem)
			})
			return Object.assign({}, state, {
				shopcarlist: newshopcarlist,
			})
		},
	},
}

function mapStateToProps(state) {
	let tp = state.shopcar.shopcarlist.reduce(function(total, num) {
		return num.ischose ? total + parseInt(num.price) * parseInt(num.addnum) : total;
	}, 0)
	let allchose = state.shopcar.shopcarlist.filter(function(v) {
		return !v.ischose && v.addnum > 0
	}).length == 0
	return {
		productitemlist: state.shopcar.productitemlist,
		totalprice: tp,
		shopcarlist: state.shopcar.shopcarlist,
		allchose
	}
}

export {
	shopcarstore,
	mapStateToProps
}