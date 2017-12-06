import React, { Component } from 'react';

import Layout from '../components/layout'
import AuthService from '../util/AuthService'

const auth = new AuthService();

export default class AuthCallback extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // auto handles refreshes
        auth.linkedinLogin(this.props.url.query.code)
            .then(data => {
                console.log('data', data);
                window.location.replace(`${window.location.origin}/profile/${data.profile.account_type.toLowerCase()}/${data.profile.username}`)
            });
    }

    render() {
        return (
            <Layout title="Auth Callback">
                <div className="auth-loading">
                    <h3 className="loading-caption">Loading profile from LinkedIn...</h3>
                    <div className="loading-pulse" />
                </div>
            </Layout>
        );
    }
}


