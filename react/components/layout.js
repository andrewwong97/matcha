import Head from 'next/head';
import Link from 'next/link';

import stylesheet from '../static/scss/main.scss';

export default ({ children, title }) => (
    <div className="Layout">
        <Head>
            <meta charset="utf-8" />
            <title>{ title } | Matcha - an intelligent job matching platform</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://unpkg.com/react-select/dist/react-select.css" />
            <link rel="stylesheet" href="../static/react-bootstrap-table.min.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500,700" />
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>


      <div className="App">
        <div className="Nav-wrapper">
          <div className="logo">
            <h1>Matcha</h1>
          </div>
          <ul className="Nav">
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/login"><a>Login</a></Link></li>
          </ul>
        </div>
        { children }
      </div>
        
    </div>
)
