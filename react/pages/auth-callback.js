import React from 'react';

import Layout from '../components/layout'
import AuthService from '../util/AuthService'

const auth = new AuthService();

export default class AuthCallback extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        {auth.linkedinLogin(this.props.url.query.code)}
    }

    render() {
        return (
            <Layout title="Auth Callback">
                Redirecting to homepage...
            </Layout>
        );
    }
}


