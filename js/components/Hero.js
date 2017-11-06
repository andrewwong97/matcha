import React from 'react';
import { Link } from 'react-router-dom';
import history from '../history';

export default class Hero extends React.Component {
    render() {
        return (
            <div className="Hero">
                <h1>Create an account</h1>
                <div className="signup-switch">
                    <div className="btn btn-student" onClick={() => history.push('/register')}>Student</div>
                    <div className="btn btn-employer" onClick={() => history.push('/register-employer')}>Employer</div>
                </div>
                <Link to="/login">Already have an account? Login here.</Link>
            </div>
        )
    }
}