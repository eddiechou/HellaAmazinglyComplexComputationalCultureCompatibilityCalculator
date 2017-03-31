'use strict';

import React from 'react';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props, 'asdasdasdads');
  }

  render() {

    const liStyle = {
      width: '50px'
    }

    const nameStyle = {
      borderBottom: '1px solid black'
    }

    return (
      <div>
        {!this.props.loggedIn ? <h1>You must login to view your profile.</h1> : 
          <div className="container">    
            <div className="jumbotron">
              <div className="row">
                <div className="col-md-4 col-xs-12 col-sm-6 col-lg-4">
                  <img src="https://www.svgimages.com/svg-image/s5/man-passportsize-silhouette-icon-256x256.png" alt="stack photo" className="img"/>
                </div>
                <div className="col-md-8 col-xs-12 col-sm-6 col-lg-8">
                  <div className="container" style={nameStyle}>
                    <h2>John Doe</h2>
                  </div>

                  <ul className="container details">
                    <li><p><span className="listing glyphicon glyphicon-earphone one" style={liStyle}></span>+91 90000 00000</p></li>
                    <li><p><span className="listing glyphicon glyphicon-envelope one" style={liStyle}></span>somerandom@email.com</p></li>
                    <li><p><span className="listing glyphicon glyphicon-map-marker one" style={liStyle}></span>Hyderabad</p></li>
                    <li><p><span className="listing glyphicon glyphicon-new-window one" style={liStyle}></span><a href="#">www.example.com</a></p></li>
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


