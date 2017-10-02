import React from 'react';
import Link from 'next/link';

import Nav from './Nav.js';

export default props => (
  <main>
    <Nav>Main page</Nav>
    <h1>Hello {props.user}</h1>
    <p>I am working quite nicely</p>
    <Link href="/about">About me</Link>
  </main>
);
