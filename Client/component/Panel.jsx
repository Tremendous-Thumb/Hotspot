var Panel = (props) => (
  // if else statement for either filter type
  // or collection type

  //

    <div className='panelBody'>
      <div className='data'>
        { props.data }
        <CollectionModel />
      </div>

    </div>

);

window.Panel = Panel;
