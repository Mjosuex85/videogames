import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateGame from './components/CreateGame/CreateGame.jsx'
import Details from './components/Details/Details';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/details/:id' render={({match}) => <Details id={match.params.id} />}/>
      <Route exact path='/create' component={CreateGame}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
