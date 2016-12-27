import React, {Component} from 'react'
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router'

//const App = () => <h1> Hello World!!! </h1>

class App extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path='/' component={Container}>
					<IndexRoute component={Home} />  {/*set indexroute/default route of Container to be Home*/}					
					<Route path='/address' component={Address}>
						<IndexRoute component={TwitterFeed} />
						<Route path='instagram' component={Instagram} />
					</Route>
					<Route path='*' component={NotFound} />
				</Route>
			</Router>
			)
	}
}

const NotFound = () => ( <h1> 404... page not found! </h1>)
const Home = () => <h1> Hello from Home!! </h1>
//const Address = () => <h1> We are located at 555 Jackson St </h1>
const Address = (props) => ( 
	<div>   
	{/*or can use {children} in arg and use {children} below, similar to Container's arg*/}
		<br />
		<Link to='/address'>Twitter Feed</Link>&nbsp;
		<Link to='/address/instagram'>Instagram Feed</Link>
		<h1>We are located at 555 Jackson st.</h1>
		{props.children}
	</div>
)

const Nav = () => (
	<div>
		<Link to='/'>Home</Link>&nbsp;
		<Link to='/address'>Address</Link>
	</div>
	)
const Container = ({children}) =>   //{children} is same as {children} = props (es6 syntax)
	<div>
		<Nav />  
		{children}
		{/* props.children will allow any routes wrapped within 
		this route to be rendered in this component.*/}
	</div>
const Instagram = () => <h3>Instagram feed </h3>
const TwitterFeed = () => <h3>Twitter feed</h3>

export default App