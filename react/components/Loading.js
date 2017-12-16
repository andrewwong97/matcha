import React, {Component} from 'react';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Loading">
                <h1 className="loading-title">
                    Loading {this.props.title || ''}...
                </h1>
                <div className="loading-pulse" />
            </div>
        )
    }
}