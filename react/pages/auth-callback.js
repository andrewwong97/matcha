import React from 'react';

import Layout from '../components/layout'
import AuthService from '../util/AuthService'

const auth = new AuthService();
const baseUrl = require('../vars.json').baseUrl;

export default class AuthCallback extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        auth.linkedinLogin(this.props.url.query.code)
            .then(() => window.location.replace(`${window.location.origin}/profile/${auth.getProfile().username}`));
    }

    render() {
        return (
            <Layout title="Auth Callback">
               <div className="loading-pulse"></div>(might take some time)
            </Layout>
        );
    }
}


