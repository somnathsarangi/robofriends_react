import React,{ Component } from 'react';
import Cardlist from '../components/Cardlist';
import '../containers/App.css';
import ErrorBoundary from '../components/ErrorBoundary';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
// import {robots} from'./robots'; //Because we are exporting only and not default in robots.js
                                // we need to write in between {}

class App extends Component {
  constructor(){
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {this.setState({robots: users})});
  }
  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
  }
  render(){
    const { robots,searchfield } = this.state;
    const filteredRobots = robots.filter(robots =>{
      return robots.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return (
      <div class='tc'>
        <h1 className='f1'>Robot Owners</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
          <ErrorBoundary>
            <Cardlist robots = {filteredRobots}/>
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}
export default App;
