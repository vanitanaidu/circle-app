import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import Images from '../images/Images';
import LikeButton from './LikeButton';


export default class UserCard extends Component {

  userCard = () => {
    const {user} = this.props
    return (
      <div className="user-card-details">
        <Link to= {"users/" + user.id}>
            <Images/>
            <br/>
            <h5> {user.name} </h5>
            <br/>
            <h5> About me: </h5>
            <h5> <small> {user.about_me} </small> </h5>

            <h5> Interests: <small> {user.interests} </small> </h5>
            
            <h5> State/City: <small> {user.state} - {user.city} </small> </h5>
            <br></br>

        </Link>
        <div id="like-button-user-card"> <LikeButton userId={user.id} user={this.props.user}/> </div>
      </div>
    )
  }


  render() {

    return (
      <div>
          {this.userCard()}
        </div>
    )
  }
}
