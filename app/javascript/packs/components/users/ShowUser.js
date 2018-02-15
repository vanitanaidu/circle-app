import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchUser } from '../../actions/show_user_action';
import { deleteUser } from '../../actions/delete_user_action';
import { updateUser } from '../../actions/update_user_action';

import Comments from '../comments/index';
import AddCommentForm from '../comments/AddCommentForm';

class ShowUser extends Component {
  constructor(props) {
    super(props)
      this.state = {
        editable: false
      }
  }

  componentDidMount = () => {
    const { id } = this.props.match.params //same as writing const id = this.props.match.params.id
    this.props.fetchUser(id)
  }

//To delete a single user. This method calls on the deleteUser action under the actions folder
  onDeleteClick = () => {
    const { id } = this.props.match.params
    this.props.deleteUser(id)
    alert("This user will be deleted");
    this.props.history.push("/")
  }

  handleEdit = () => {
    if(this.state.editable) {

      const user = {
        id: this.props.match.params.id,
        name: this.refs.name.value,
        age: this.refs.age.value,
        interests: this.refs.interests.value,
        about_me: this.refs.about_me.value,
        past_jobs: this.refs.past_jobs.value,
        fav_food: this.refs.fav_food.value,
        fav_movies: this.refs.fav_movies.value,
        state: this.refs.state.value,
        city: this.refs.city.value,
        languages: this.refs.languages.value,
        schools: this.refs.schools.value
      }
      this.props.updateUser(user) //this is an action.
    }

    this.setState({
      editable: !this.state.editable
    })
  }


  renderUser = () => {
    const props = this.props
    const index =  _.findIndex(this.props.users, function(user) {
      return user.id == props.match.params.id
    })
    const user = this.props.users[index]

    //either display a form with default value or display the user.name
    const name = this.state.editable ? <input type="text" ref="name" defaultValue={user.name}/> : <div> {user.name} </div>
    const age = this.state.editable ? <textarea ref="age" defaultValue={user.age}/> : <div> {user.age} </div>
    const interests = this.state.editable ? <textarea ref="interests" defaultValue={user.interests}/> : <div> { user.interests} </div>
    const about_me = this.state.editable ? <textarea ref="about_me" defaultValue={user.about_me}/> : <div> {user.about_me} </div>
    const past_jobs = this.state.editable ? <textarea ref="past_jobs" defaultValue={user.past_jobs}/> : <div> {user.past_jobs} </div>
    const fav_food = this.state.editable ? <textarea ref="fav_food" defaultValue={user.fav_food}/> : <div> {user.fav_food} </div>
    const fav_movies = this.state.editable ? <textarea ref="fav_movies" defaultValue={user.fav_movies}/> : <div> {user.fav_movies} </div>
    const state = this.state.editable ? <textarea ref="state" defaultValue={user.state}/> : <div> {user.state} </div>
    const city = this.state.editable ? <textarea ref="city" defaultValue={user.city}/> : <div> {user.city} </div>
    const languages = this.state.editable ? <textarea ref="languages" defaultValue={user.languages}/> : <div> {user.languages} </div>
    const schools = this.state.editable ? <textarea ref="schools" defaultValue={user.schools}/> : <div> {user.schools} </div>

      return (
        <div key={user.id}>
          <div className="jumbotron" >
            <div className="container">
              <h2> {name} </h2>
              <h6> {about_me} </h6>
            </div>
          </div>

          <button role="button" className="btn float-right btn btn-custom" onClick={this.onDeleteClick.bind(this)}>
             Delete User
          </button>
          <button className="btn float-right btn btn-custom" onClick={this.handleEdit.bind(this)}>
           {this.state.editable ? 'Submit' : 'Edit'}
          </button>

          <div className="container" id="show-user-detail">
           <h6> Age: <small> {age} </small> </h6>
           <h6> Interest: <small> {interests} </small> </h6>
           <h6> Past Jobs: <small> {past_jobs} </small> </h6>
           <h6> Favorite Food: <small> {fav_food} </small> </h6>
           <h6> Favorite movies: <small> {fav_movies} </small> </h6>
           <h6> State: <small> {state} </small> </h6>
           <h6> City: <small> {city} </small> </h6>
           <h6> Languages: <small> {languages} </small> </h6>
           <h6> Schools: <small> {schools} </small> </h6>
         </div>
       </div>
      )
  }

   render() {
      const {match} = this.props
      const renderUser = this.props.loading ? "loading..." : this.renderUser()
       return (
       <div>
        {renderUser}
         <br/>
         <Comments userId={match.params.id} users={this.props.users} />
         <AddCommentForm userId={match.params.id} history={this.props.history} />
       </div>
     )
   }
}
                      // {users} same as users = state.users
function mapStateToProps({users}) {
  return { users: users.users, loading: users.loading }
}

export default connect(mapStateToProps, { fetchUser, deleteUser, updateUser })(ShowUser);


//what if a user went straight to the showpage like through a bookmark or a link and does not pass through the index page
