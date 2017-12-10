import React, {Component} from 'react';

export default class Loading extends Component {
    render() {
        return (
            <h1 className="Loading">
                Loading...
                <div className="loading-pulse" />
            </h1>
        )
    }
}