import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class Protected extends Component {

    constructor() {
        super()
        
    }

    isAuthenticated() {
        return localStorage.getItem('token')
    }

    render() {
        let redirect
        if (!this.isAuthenticated()) {
            redirect = <Redirect to='/login'/>
        } else {
            redirect = this.props.children
        }

        return (
            redirect
        )
    }
}

export default Protected