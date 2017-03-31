'use strict';

import React from 'react';
import * as s from '../serverCalls.js';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      email: null,
      picture: null,
      username: null
    }
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      s.serverGet('userData').then(({ data }) => {
        this.setState({
          displayName: data.displayName,
          email: data.email,
          picture: data.picture,
          username: data.username
        });
      });
    }
  }

  render() {

    const liStyle = {
      width: '50px'
    }

    const nameStyle = {
      borderBottom: '1px solid black'
    }

    const imgStyle = {
      height: '256px',
      width: '256px'
    }

    return (
      <div>
        {!this.props.loggedIn ? <h1>You must login to view your profile.</h1> : 
          <div className="container">    
            <div className="jumbotron">
              <div className="row">
                <div className="col-md-4 col-xs-12 col-sm-6 col-lg-4">
                  <img style={imgStyle} src={this.state.picture} alt="user photo" className="img img-rounded"/>
                </div>
                <div className="col-md-8 col-xs-12 col-sm-6 col-lg-8">
                  <div className="container" style={nameStyle}>
                    <h2>{this.state.displayName}</h2>
                  </div>

                  <ul className="container details">
                    <li><p><span className="listing glyphicon glyphicon-earphone one" style={liStyle}></span>{this.state.username}</p></li>
                    <li><p><span className="listing glyphicon glyphicon-envelope one" style={liStyle}></span>{this.state.email}</p></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}


