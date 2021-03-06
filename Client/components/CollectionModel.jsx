import React from 'react';
// const $ = require('jquery');
//
// $('.restaurant').tooltip();
//
// $(document).ready(function(){
// $('[data-toggle="tooltip"]').tooltip();
//
// });
// $('#restaurant');

var CollectionModel = ({item}) => {
  return (
  <div id='restaurant' className='restaurant card' >
    <img className='card-img-top' src={item.yelpData.image} />
    <div className='card-block'>
      <h4 className='card-title'>{item.name}</h4>
    </div>
    <ul className='list-group list-group-flush'>
      <li className='list-group-item'>Rating: {item.rating}</li>
      <li className='list-group-item'>Type: {item.yelpData.cuisine}</li>
    </ul>
  </div>
);
  console.log(here);
};


export default CollectionModel;
