import axios from 'axios';

const fetchshopcarlist = (dispatch) => new Promise(function (resolve, reject) {
	return axios.get('/apis/product/getShopCarList/', {})
	.then(function(result) {
		result.data.shopcarlist.map(function(v) {
			return v.ischose = false;
		})
		dispatch({
			type: 'getshopcarlist',
			shopcarlist: result.data.shopcarlist
		})
	})
})

const fetchproductlist = (dispatch) => new Promise(function (resolve, reject) {
	return axios.get('/apis/product/show/?index=0&length=100', {})
	.then(function(result) {
		dispatch({
			type: 'getproductitemlist',
			productitemlist: result.data.productlist
		})
	})
})

const updateshopcar = (dispatch, ownprops, shopcarlist) => new Promise(function (resolve, reject) {
	let skuids = [];
	$.each(shopcarlist, function(index, item) {
		skuids.push(item.skuid + ',' + item.addnum)
	})
	return axios.get('/apis/product/updateShopCarList/', {
		params: {
			skuids: skuids.join(';')
		}
	})
	.then(function(result) {
	})
})

const initstate = (dispatch) => Promise.all([axios.get('/apis/product/getShopCarList/', {}), axios.get('/apis/product/show/?index=0&length=100', {})])
	.then(function(result) {
		dispatch({
			type: 'initState',
			shopcarlist: result[0].data.shopcarlist,
			productitemlist: result[1].data.productlist
		})
	})

const choseproduct = (dispatch, ownprops, choseid) => {
	dispatch({
		type: 'choseproduct',
		choseid
	})
}

const addproductnum = (dispatch, ownprops, choseid) => {
	dispatch({
		type: 'addproductnum',
		choseid
	})
}

const minusproductnum = (dispatch, ownprops, choseid) => {
	dispatch({
		type: 'minusproductnum',
		choseid
	})
}

const deleteproduct = (dispatch, ownprops, choseid) => {
	dispatch({
		type: 'deleteproduct',
		choseid
	})
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

function mapDispatchToProps(dispatch, ownprops) {
	return {
		getallproductlist: () => fetchproductlist(dispatch, ownprops),
		getallshopcarlist: () => fetchshopcarlist(dispatch, ownprops),
		initstate: () => initstate(dispatch, ownprops),
		updateshopcar: (...args) => updateshopcar(dispatch, ownprops, ...args),
		choseproduct: (...args) => choseproduct(dispatch, ownprops, ...args),
		addproductnum: (...args) => addproductnum(dispatch, ownprops, ...args),
		minusproductnum: (...args) => minusproductnum(dispatch, ownprops, ...args),
		deleteproduct: (...args) => deleteproduct(dispatch, ownprops, ...args),
	}
}

export default {
	mapStateToProps,
	mapDispatchToProps
}