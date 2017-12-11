import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import stylesheet from '../static/scss/main.scss';

import AuthService from "../util/AuthService";


export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.auth = new AuthService(require('../vars.json').baseUrl);

        this.state = {
            loggedIn: false,
            username: "",
            profileLink: "/"
        }
    }

    componentDidMount() {
        if (this.auth.loggedIn()) {
            this.setState({
                loggedIn: true,
                username: this.auth.getProfile().username,
                accountType: this.auth.getProfile().account_type.toLowerCase(),
                profileLink: '/profile/' + this.auth.getProfile().account_type.toLowerCase() + '/' + this.auth.getProfile().username
            });
        }
    }

    renderLoggedOutNav() {
        return (
            <ul className="Nav">
                <li><Link href="/login"><a>Login</a></Link></li>
            </ul>
        )
    }

    renderLoggedInNav() {
        return (
            <ul className="Nav">
                <li><a href={this.state.profileLink}>Profile</a></li>
                <li><Link href="/listings"><a>Listings</a></Link></li>
                <li><a className="logout" onClick={this.logout}>Logout</a></li>
            </ul>
        )
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
                    <title>{ this.props.title } | Matcha - an intelligent job matching platform</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="https://unpkg.com/react-select/dist/react-select.css" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500,700" />
                    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                </Head>
                <div className="App">
                    <div className="Nav-wrapper">
                        <a
                            style={{textDecoration: "none"}}
                            href={this.state.loggedIn ? this.state.profileLink : "/"}
                        >
                            <div className="logo">
                                    <h1>Matcha</h1>
                            </div>
                        </a>
                        {this.state.loggedIn ? this.renderLoggedInNav() : this.renderLoggedOutNav()}
                    </div>
                    { this.props.children }
                </div>
            </div>
        )
    }
}
