import React, {Component} from 'react';
import BoardCard from './BoardCard';
import HeaderBar from '../HeaderBar';

export default class Boards extends Component {
  constructor(props){
    super(props);
    
		this.state = {
      boardsJson: []
		};
  };
  
  componentWillMount(){
    fetch('http://localhost:5000/api/b', {
			method: 'GET',
			headers: {
				"Content-Type" : "application/json; charset=utf-8",
			},
		}).then(response => {
      console.log("Successfully retrieved boards from API.");
			return response.json();
		}).then(body => {
      this.setState({ boardsJson: body.foundBoards });
      console.log(this.state.boardsJson);
		}).catch((err) => {
			console.log(err);
    });
    
    // axios.get('http://localhost:5000/api/b')
    //   .then(response => {
    //     this.setState({ boardsJson: response.data.foundBoards });
    //   })
    //   .catch(function (error){
    //     console.log("error making api call");
    //     console.log(error);
    // });
	}
  
    render() {
      let boardsToDisplay = [];

      if (this.state.boardsJson.length > 0) {
        for(let i = 0; i < this.state.boardsJson.length; i++) {
          let currentBoard = this.state.boardsJson[i];
          boardsToDisplay.push(
            <BoardCard
              key={currentBoard._id} {...currentBoard}
            />
          );
        }
      }

      return (
        <div className="container-fluid px-0">
          <HeaderBar 
            backLocation="/"
            backText="Home"
            centerText="All Boards"
            newLocation="/b/new"
            newText="New Board"
          />
          <div className="container">
            <div className="row mt-5" id="BoardCardsDisplay">
            { boardsToDisplay.length > 0 ? boardsToDisplay : <div>No Boards to display!</div> }
            </div>
          </div>
        </div>
          
      );
    }
}