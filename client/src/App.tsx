import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join';
import Chat from './components/Chat';

const App = () => (
	<Router>
		{/* //In this component when a form is filled an url is created with the room
		and username and pushed in the /chat */}
		<Route path="/" exact component={Join} />
		<Route path="/chat" exact component={Chat} />
	</Router>
);

export default App;
