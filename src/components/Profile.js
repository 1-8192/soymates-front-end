import React from 'react'

const Profile = (props) => {
    return (
      <div className="notification">
        <h1>{props.username}</h1>
        <button onClick={()=>{props.deleteUser(props.currentUser)}}>Delete Account </button>
      </div>
    )
}

export default Profile
