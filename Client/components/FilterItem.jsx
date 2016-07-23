import React from 'react';

// The contets will be dependant on the form the information takes
var FilterItem = ({filter, appliedFilters, toggleFilter}) => {
  var cssClasses = 'filterName';

  if (_.findIndex(appliedFilters, filter) > -1) {
    cssClasses += ' ' + 'toggleOn';
  }
  return (
    <div className='filter'>
      <div className={cssClasses} onClick={ () => { toggleFilter(filter, appliedFilters); }}>
      {filter}
      </div>
    </div>
  );
};

export default FilterItem;
