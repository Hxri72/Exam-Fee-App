import React from 'react'
import { Navigate } from 'react-router';

function PublicRouteUser(props) { 
    if (localStorage.getItem("userToken")){
        return <Navigate to={'/'}/>
      } else {
        return props.children
    }
}

export default PublicRouteUser;