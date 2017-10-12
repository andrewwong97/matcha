import React from "react"
import Head from "../components/Head"

export default class AppContainer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Head>Matcha</Head>
          </div>
        </div>
      </div>
    )
  }
}
