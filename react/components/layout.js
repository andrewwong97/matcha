import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import stylesheet from '../static/scss/main.scss';

import AuthService from "../util/AuthService";





export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.children = this.props.children;
        this.title = this.props.title;
        this.auth = new AuthService(require('../vars.json').baseUrl);
        this.noAuth = (<ul className="Nav">
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/login"><a>Login</a></Link></li>
            </ul>);

        this.state = {
            authNav: this.noAuth
        }
    }

    componentDidMount() {
        if (this.auth.loggedIn()) {
            const account_type = localStorage.getItem('profile').account_type ? localStorage.getItem('profile').account_type.toLowerCase() : 'student';
            this.yesAuth = (<ul className="Nav">
                <li><Link href="/"><a>Home</a></Link></li>
                <li><a href={`/profile/${account_type}/${this.auth.getProfile().username}`}>Profile</a></li>
                <li><a className="logout" onClick={this.logout}>Logout</a></li>
            </ul>);
            this.setState({authNav: this.yesAuth})
        }
    }

    logout() {
        localStorage.clear();
        window.location.replace(window.location.origin);
    }

    render() {


        return (
            <div className="Layout">
                <Head>
                    <meta charset="utf-8" />
                    <title>{ this.title } | Matcha - an intelligent job matching platform</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="https://unpkg.com/react-select/dist/react-select.css" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500,700" />
                    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                </Head>


                <div className="App">
                    <div className="Nav-wrapper">
                        <div className="logo">
                            <h1>Matcha</h1>
                        </div>
                        { this.state.authNav }
                    </div>
                    { this.children }
                </div>

            </div>
        )
    }
}
