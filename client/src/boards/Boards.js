import React, {Component} from 'react';
import BoardCard from './BoardCard';
import HeaderBar from '../HeaderBar';
import './Board.css';
import Navbar from '../Navbar';
import Alert from '../Alert';

export default class Boards extends Component {
  constructor(props){
    super(props);
    
		this.state = {
      boards: [],
      alertMsg: ""
		};
  };
  
  componentWillMount(){
    if(this.props.location.state !== undefined) {
      this.setState({ alertMsg: this.props.location.state.alertMsg });
      this.props.history.replace({alertMsg: ""});
    }
    let url = '/api/b';
    fetch(url, {
			method: 'GET',
			headers: {
				"Content-Type" : "application/json; charset=utf-8",
			},
		}).then(response => {
      //console.log("Successfully retrieved Boards List.");
			return response.json();
		}).then(body => {
      this.setState({ boards: body.foundBoards });
      //console.log(this.state.boardsJson);
		}).catch((err) => {
			console.log("Error retrieving Boards.")
			console.log(err);
    });
	}
  
    render() {
      let boardsToDisplay = [];

      if (this.state.boards.length > 0) {
        for(let i = 0; i < this.state.boards.length; i++) {
          let currentBoard = this.state.boards[i];
          boardsToDisplay.push(
            <BoardCard
              key={currentBoard._id} {...currentBoard}
            />
          );
        }
      }

      return (
        <div className="container-fluid px-0">
          <Navbar/>
          <HeaderBar 
            backLocation="/"
            backText="Home"
            centerText="All Boards"
            newLocation="/b/new"
            newText="New Board"
            color="primary"
          />
          <Alert type={this.state.alertMsg} />

          <div className="container">
            <div className="row mt-3" id="boardCardsDisplay">
            { boardsToDisplay.length > 0 ? boardsToDisplay : <div className="text-center">No Boards to display!</div> }
            </div>
          </div>
        </div>
          
      );
    }
}