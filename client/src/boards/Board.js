import React, {Component} from 'react';
import HeaderBar from '../HeaderBar';

export default class Board extends Component {
  
  constructor(props){
		super(props);
		this.state = {
			boards: []
		};
  };
  
  componentWillMount(){
		fetch('/b', {
			method: 'GET',
			headers: {
				"Content-Type" : "application/json; charset=utf-8",
			},
		}).then(response => {
			return response.json();
		}).then(body => {
			this.setState({ boards: body.boards });
		}).catch(() => {
			console.log("Error retrieving Boards list");
		})
	}
  
  render() {
    return (
        <div className="container-fluid px-0">
          <HeaderBar 
            backLocation="/b"
            backText="All Boards"
            centerText="This Board"
            newLocation="/b/new"
            newText="New Post"
          />
          <div className="container">
            
          </div>
        </div>
    );
  }
}