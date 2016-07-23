import React from 'react';
import { connect } from 'react-redux';
import CollectionModel from '../component/CollectionModel';
var Menu = require('react-burger-menu').push;

class Panel extends React.Component {



  renderPanel() {
    if (this.props.PanelMode === 'collection') {
      return (
        <div className='collection'>
          {this.props.CollectionRestaurants.collection.map((restaurant) =>
            <CollectionModel restaurant={restaurant} />
          )}
        </div>
      );
    } else if (this.props.PanelMode === 'filter') {
      return (
        <div className='filterPanel'>
          <div className='filters'>
            {this.props.CollectionRestaurants.filterOptions}
          </div>
          <div className='collection'>
            {this.props.CollectionRestaurants.collection.map((restaurant) =>
              <CollectionModel restaurant={restaurant} />
            )}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div id='outer-container'>
        <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } right isOpen={this.props.PanelMode}/>
        <main id="page-wrap">
          <div className='panelBody panel'>
            <div className='collection'>
              {this.renderPanel()}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {CollectionRestaurants: state.CollectionRestaurants,
  PanelMode: state.PanelMode};
}
export default connect(mapStateToProps)(Panel);
