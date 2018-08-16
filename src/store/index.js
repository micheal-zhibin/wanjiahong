import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise'
import shopcarstate from "../state/shopcar";
import editmystate from "../state/editmy";

let initState = Object.assign({}, shopcarstate, editmystate)

function mystate(state = initState, action) {
	const { productitemlist, shopcarlist, totalprice, choseid } = action
	const { userinfo, phonenum } = action
	let newshopcarlist = []
	let newuserinfo = {}
	switch(action.type) {
		case 'getproductitemlist':
			return Object.assign({}, state, {
				productitemlist: productitemlist
			})
		case 'getshopcarlist':
			return Object.assign({}, state, {
				shopcarlist: shopcarlist
			})
		case 'initState':
			return Object.assign({}, state, {
				productitemlist: productitemlist,
				shopcarlist: shopcarlist,
			})
		case 'choseproduct':
			state.shopcarlist.map(function(v) {
				let newitem = v;
				newitem.ischose = v.skuid == choseid ? v.ischose == 1 ? 0 : 1 : v.ischose;
				newshopcarlist.push(newitem)
			})
			return Object.assign({}, state, {
				shopcarlist: newshopcarlist,
			})
		case 'addproductnum':
			state.shopcarlist.map(function(v) {
				let newitem = v;
				newitem.addnum = v.skuid == choseid ? v.addnum + 1 : v.addnum;
				newshopcarlist.push(newitem)
			})
			return Object.assign({}, state, {
				shopcarlist: newshopcarlist,
			})
		case 'minusproductnum':
			state.shopcarlist.map(function(v) {
				let newitem = v;
				newitem.addnum = v.skuid == choseid ? v.addnum - 1 > 0 ? v.addnum - 1 : v.addnum : v.addnum;
				newshopcarlist.push(newitem)
			})
			return Object.assign({}, state, {
				shopcarlist: newshopcarlist,
			})
		case 'deleteproduct':
			state.shopcarlist.map(function(v) {
				let newitem = v;
				newitem.addnum = v.skuid == choseid ? 0 : v.addnum;
				newshopcarlist.push(newitem)
			})
			return Object.assign({}, state, {
				shopcarlist: newshopcarlist,
			})
		case 'getmyinfo':
			return Object.assign({}, state, {
				userinfo: userinfo,
			})
		case 'updatephonenum':
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
		default:
			return state
	}
}

const store = createStore(mystate, applyMiddleware(promiseMiddleware))

export {
	store
}