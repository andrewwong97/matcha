import React, { Component } from 'react';

import Layout from '../components/layout'
import AuthService from '../util/AuthService'

const auth = new AuthService();

export default class AuthCallback extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        auth.linkedinLogin(this.props.url.query.code)
            .then(() => window.location.replace(`${window.location.origin}/profile/${auth.getProfile().account_type.toLowerCase()}/${auth.getProfile().username}`));
    }

    render() {
        return (
            <Layout title="Auth Callback">
                <div className="loading-pulse" />
                <h3>(might take some time)</h3>
            </Layout>
        );
    }
}


