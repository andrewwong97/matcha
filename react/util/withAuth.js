// a HOC for protected pages
import React, {Component} from 'react'
import AuthService from './AuthService'
import Router from 'next/router'
import Loading from '../components/Loading';


export default function withAuth(AuthComponent) {
    const Auth = new AuthService(require('../vars.json').baseUrl);

    return class Authenticated extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: true
            };
        }

        componentDidMount () {
            if (!Auth.loggedIn()) {
                Router.push('/');
            } else if (window.location.pathname === '/') {
                Router.push(`/profile/${Auth.getProfile().account_type}/${Auth.getProfile().username}`);
            }
            this.setState({ isLoading: false })
        }

        render() {
            return (

                <div>
                    {this.state.isLoading ? (
                        <Loading />
                    ) : (
                        <AuthComponent {...this.props}  auth={Auth} />
                    )}
                </div>

            )
        }
    }
}