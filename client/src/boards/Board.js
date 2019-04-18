import React, {Component} from 'react';

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
        <h1>This is the Board page.</h1>
    );
  }
}