import React from 'react';

// adapted from @jaredpalmer's version at https://github.com/zeit/next.js/issues/153
// Matcha does not yet have JWT implemented, so we'll store usernames and profiles for now
// instead of tokens

export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:5000';
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);

        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    login(username, password) {
        return fetch(`${this.domain}/v1/login`, {
            method: 'POST',
            type: 'cors',
            headers: this.headers,
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
               this.setProfile(data);
               return data;
            });

    }

    linkedinLogin(code) {
        return fetch(`${this.domain}/v1/linkedinLogin`, {
            method: 'POST',
            type: 'cors',
            headers: this.headers,
            body: JSON.stringify({ code })
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('linkedin_token', data.linkedin_token);
               this.setProfile(data.profile);
               return data;
            });
    }

    loggedIn(){
        return !!this.getProfile().username;
    }


    setProfile(profile){
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))
    }

    getProfile(){
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile');
        return profile !== "undefined" && profile ? JSON.parse(localStorage.profile) : {}
    }

    logout(){
        // Clear user token and profile data from localStorage
        localStorage.removeItem('profile');
    }
}