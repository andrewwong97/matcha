import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import stylesheet from '../static/scss/main.scss';

import AuthService from "../util/AuthService";

const auth = new AuthService(require('../vars.json').baseUrl);

const logout = () => {
    auth.logout();
    setTimeout(Router.push('/'), 150);
};

const authNav = () => {
    if (auth.loggedIn()) {
        return <ul className="Nav">
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link prefetch href={`/profile/${auth.getProfile().username}`}><a>Profile</a></Link></li>
            <li><a onClick={logout}>Logout</a></li>
        </ul>
    } else {
        return <ul className="Nav">
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/login"><a>Login</a></Link></li>
        </ul>
    }
};


export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.children = this.props.children;
        this.title = this.props.title;
    }

    componentDidMount() {
        this.authNav = authNav()
    }

    render() {
        if (!this.authNav) {
            this.authNav = <ul className="Nav">
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/login"><a>Login</a></Link></li>
            </ul>
        }

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
                        { this.authNav }
                    </div>
                    { this.children }
                </div>

            </div>
        )
    }
}
