import React, {Component} from 'react'
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink} from 'react-router'

//const App = () => <h1> Hello World!!! </h1>

class App extends Component {
	render() {       
		return (  //route has to be in order as they appear on the HTML page
			<Router history={hashHistory}>
				<Route path='/' component={Container}>
					<IndexRoute component={Home} />  {/*pass Home as props to Container as default route*/}					
					<Route path='/address' component={Address}>
						<IndexRoute component={TwitterFeed} />  {/*multiple children but only 1 is active: twitterfeed, instogram, or query */}
						<Route path='instagram' component={Instagram} />
						<Route path='query' component={Query} />   {/*pass in query string*/}
					</Route>
					<Route path='/about(/:name)' component={About} />	{/* pass in Route parameter with existence of parameter check*/}			
					<Route path='/namedComponent' component={NamedComponents}>
						<IndexRoute components={{title: Title, subTitle: SubTitle}} />
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
		{/*onlyActiveOnIndex: only apply activeStyle on the selected link, not any descendents of linked route
		e.g. Address is a descendent of Home, select Adress should not highlight Home as well*/}
		{/*}
		<Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/'>Home</Link>&nbsp;
		<Link activeStyle={{color:'#53acff'}} to='/address'>Address</Link>&nbsp;
		<Link activeStyle={{color:'#53acff'}} to='/about'>About</Link>
		*/}

	{/*IndexLink is the same as Link with added property onlyActiveOnIndex*/}
	{/*activeClassName use the css style sheet in HTML*/}
		<IndexLink activeClassName='active' to='/'>Home</IndexLink>&nbsp;
		<IndexLink activeClassName='active' to='/address'>Address</IndexLink>&nbsp;
		<IndexLink activeClassName='active' to='/about'>About</IndexLink>&nbsp;
		<IndexLink activeClassName='active' to='/namedComponent'>Named Components</IndexLink>&nbsp;
		<IndexLink activeClassName='active' to={{
			pathname: '/address/query',
			query: {message: 'Hello from Route Query'}
		}}>Route Query</IndexLink>
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
const About = (props) => (//<h3>Welcome to the About Page</h3>
	<div>
		<h3> welcome to the About page</h3>
		{props.params.name && <h2> hello, {props.params.name}</h2>}  {/*only shows this if props.params.name exists*/}
	</div>
	)
const NamedComponents = (props) => (
	<div>
		{props.title} <br />
		{props.subTitle}
	</div>
	)
const Title = () => (
	<h1>Hello from Title Component</h1>
	)
const SubTitle = () => (
  <h1>Hello from SubTitle Component</h1>
)

const Query = (props) => (
	<h2> {props.location.query.message}</h2>
	)
export default App