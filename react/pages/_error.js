import React from 'react'
import Loading from '../components/Loading';
import Layout from '../components/layout';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
        <Layout>
          <Loading />
        </Layout>
    )
  }
}