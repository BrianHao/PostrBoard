import React, {Component} from 'react';
import "./Board.css";

export default class BoardCard extends Component {
  constructor(props){
		super(props);
		this.state = {
            name: "",
            title: "",
            description: "",
            image: ""
		}
  }

  componentWillMount(){
    this.setState({
        name: this.props.boardName,
        title: this.props.boardTitle,
        description: this.props.boardDesc,
        image: this.props.boardImage
    })
}
  
    render() {
      return (
        <div className="col-md-3 col-sm-6">
            <div className="thumbnail">
                <img src={this.state.image} alt={this.state.name}/>
                <div className="caption">
                    <b>{this.state.title}</b>
                    <hr></hr>
                    {this.state.description}
                </div>
            </div>
        </div>
      );
    }
}