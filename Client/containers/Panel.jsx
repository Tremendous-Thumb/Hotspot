import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CollectionModel from '../components/CollectionModel';
import FilterItem from '../components/FilterItem';
import * as Actions from '../actions';

const Menu = require('react-burger-menu').slide;

class Panel extends React.Component {

  componentDidMount() {
    this.props.actions.fetchCollection();
  }

  render() {
    
    let panelItems;

    if (this.props.panelMode === 'filter') {
      let filterSelected = this.props.filterSelected;
      let toggleFilter = this.props.actions.toggleFilter;
      panelItems = this.props.filters.map((filter) => {
        return (<FilterItem filter={filter} appliedFilters={filterSelected} toggleFilter={toggleFilter} key={filter}/>);
      });
    } else if (this.props.filteredCollection.length !== 0) {
      panelItems = this.props.filteredCollection.map((restaurant) => {
          return (<CollectionModel item={restaurant} key={restaurant.name}/>);
        });
    } else {
      panelItems = this.props.totalCollection.map((restaurant) => {
          return (<CollectionModel item={restaurant} key={restaurant.name}/>);
        });
    }

    return (
      <Menu id={ 'panel' }
            right
            noOverlay
            customBurgerIcon={ false }
            customCrossIcon={ false }
            isOpen={ this.props.isOpen }>
        {panelItems}
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalCollection: state.CollectionRestaurantsFilters.collection,
    filters: state.CollectionRestaurantsFilters.filterOptions,
    filterSelected: state.FilterSelectedRestaurants.filterSelected,
    filteredCollection: state.FilterSelectedRestaurants.filteredRestaurants,
    panelMode: state.PanelMode.panelMode,
    isOpen: state.PanelMode.isOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
