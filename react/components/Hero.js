import React from 'react';
import Link from 'next/link';

export default class Hero extends React.Component {
    render() {
        return (
            <div className="Hero">
                <h1>Create an account</h1>
                <div className="signup-switch">
                    <div className="btn btn-student"><Link prefetch href="/register"><a>Student</a></Link></div>
                    <div className="btn btn-employer"><Link prefetch href="/register-employer"><a>Employer</a></Link></div>
                </div>
                <Link href="/login"><a>Already have an account? Login here.</a></Link>
            </div>
        )
    }
}