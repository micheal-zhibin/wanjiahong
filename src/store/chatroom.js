import axios from 'axios';

async function fetchshopcarlist(params) {
	return axios.get('/apis/product/getShopCarList/', {})
}

let chatroomstore = {
	namespace: 'chatroom',
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, search }) => {
				if (pathname === '/chatroom') {
				}
			});
		}
	},
	effects: {
	},
	state: {
	},
	reducers: {
		getproductitemlist(state, action) {
			const { productitemlist } = action
			return Object.assign({}, state, {
				productitemlist: productitemlist
			})
		},
	},
}

function mapStateToProps(state) {
	return {
	}
}

export {
	chatroomstore,
	mapStateToProps
}