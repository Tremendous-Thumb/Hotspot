import React from 'react';

// The contets will be dependant on the form the information takes
var CollectionDetailModel = ({item, closeCollectionItem}) => (
  <div className='detail'>
    <span>Name</span><span>{item.name}</span>
    <span>Rating</span><span>{item.rating}</span>
    <span>Location</span><span>{item.location}</span>
    <span>Keywords</span><span>{item.keywords}</span>
    <span>Notes</span><span>{item.notes}</span>
    <img src="" alt="Close Button" onClick={() => { closeCollectionItem() }} />
  </div>
);

export default CollectionDetailModel;
