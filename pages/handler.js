import React from 'react';

import Nav from './Nav.js';

export default props => (
  <div>
    <Nav>Sub!</Nav>
    <p>Subpage {props.url.query.subreddit}</p>
  </div>
);
