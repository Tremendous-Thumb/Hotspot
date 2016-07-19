import React from 'react';

class Panel extends React.Component {
  render() {
    return (
      <div className='panelBody'>
        <div className='data'>
          <CollectionModel />
        </div>

      </div>
    );
  }
}

export default Panel;
