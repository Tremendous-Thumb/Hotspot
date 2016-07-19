import React from 'react';

class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className='collectionPanel'>
          <button onClick={() => props.panel('collection')}> </button>
        </div>
        <div className='filterPanel'>
          <button onClick={() => props.panel('filter')}></button>
        </div>
      </nav>
    );
  }
}

export default Navigation;
