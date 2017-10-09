import React from 'react';

import Link from 'next/link';
import Head from 'next/head';

export default class About extends React.Component {
  static async getInitialProps ({ req }) {
    return {
      server: !!req
    };
  }
  render () {
    return (
      <div>
        <style jsx>{`button { background: red; }`}</style>
        <Head>
          <title>Hello {this.props.server ? 'server' : 'client'}</title>
        </Head>
        Hi {this.props.server ? 'server' : 'client'}
        <Link href="/">
          <button>Homepage</button>
        </Link>
      </div>
    );
  }
}
