import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleCollectionList, toggleFilterList } from '../actions/index.js';
import Panel from './Panel';

class Nav extends React.Component {

  collectionClick(e) {
    e.preventDefault();
    this.props.toggleCollectionList(this.props.PanelMode('collection'));
  }

  filterClick(e) {
    e.preventDefault();
    this.props.toggleFilterList(this.props.PanelMode('filter'));
  }

  render() {
    return (
      <nav className="navbar">
        <ul>
          <li onClick={this.collectionClick.bind(this)} className='collectionPanel' >Collection</li>
          <li onClick={this.filterClick.bind(this)} className='filterPanel'>Filter</li>
        </ul>
      </nav>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleCollectionList, toggleFilterList}, dispatch);
}

function mapStateToProps(state) {
  PanelMode = state.PanelMode;
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
