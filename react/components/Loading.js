import React, {Component} from 'react';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1 className="Loading">
                Loading {this.props.title || ''}...
                <div className="loading-pulse" />
            </h1>
        )
    }
}