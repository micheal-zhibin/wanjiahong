import React, { Component } from "react";
import { render } from "react-dom";
import { AppContainer } from 'react-hot-loader';
import 'babel-polyfill';
import App from './App';
import Login from './Login';
import Companyinfo from './Companyinfo';
import Shopindex from './Shopindex';
import Item from './Item';
import Myindex from './Myindex';
import Shopcar from './Shopcar';
import Editmy from './Editmy';
import Chatroom from './Chatroom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import dva from 'dva';
import { Router, Route, Switch, routerRedux } from 'dva/router';
import { shopcarstore } from './store/shopcar.js';
import { editmystore } from './store/editmy.js';
import { chatroomstore } from './store/chatroom.js';

// 1. Initialize
const app = dva();

const models = [shopcarstore, editmystore, chatroomstore]

models.forEach(m=>app.model(m))

app.router(({ history }) =>
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={App}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/info" exact component={Companyinfo}/>
      <Route path="/index" exact component={Shopindex}/>
      <Route path="/item/:id" exact component={Item}/>
      <Route path="/myindex" exact component={Myindex}/>
      <Route path="/shopcar" exact component={Shopcar}/>
      <Route path="/editmy" exact component={Editmy}/>
      <Route path="/chatroom" exact component={Chatroom}/>
    </Switch>
  </Router>
);

app.start('#app')

// const renderDom = Component => {
// 	render((
// 	  <Provider store={store}>
// 		  <Router history={hashHistory}>
// 		    <Route path="/" component={App}/>
// 		    <Route path="/login" component={Login}/>
// 		    <Route path="/info" component={Companyinfo}/>
// 		    <Route path="/index" component={Shopindex}/>
// 		    <Route path="/item/:id" component={Item}/>
// 		    <Route path="/myindex" component={Myindex}/>
// 		    <Route path="/shopcar" component={Shopcar}/>
// 		    <Route path="/editmy" component={Editmy}/>
// 		  </Router>
// 	  </Provider>
// 	), document.getElementById('app'));
// }

// renderDom(App)

// const Counter = ({ value, onIncrement, onDecrement }) => (
// 	<div>
// 		<h1>{value}</h1>
// 		<button onClick={onIncrement}>+</button>
// 		<button onClick={onDecrement}>-</button>
// 	</div>
// );

// const reducer = (state = 0, action) => {
// 	switch (action.type) {
// 		case 'INCREMENT': return state + 1;
// 		case 'DECREMENT': return state - 1;
// 		default: return state;
// 	}
// }

// const store = createStore(reducer)

// const myrender = () => {
// 	render(
// 		<Counter value={store.getState()} onIncrement={() => store.dispatch({type: 'INCREMENT'})} onDecrement={() => store.dispatch({type: 'DECREMENT'})} />,
// 		document.getElementById('root')
// 	)
// }

// store.subscribe(myrender)
// myrender();

// if (module.hot) {
// 	module.hot.accept('./App', () => {
// 		app.start('#app');
// 	})
// }