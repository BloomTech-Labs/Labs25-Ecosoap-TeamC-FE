import PropTypes from 'prop-types';
import React from 'react';

function LoadingComponent(props) {
  const { message } = props;

  return (
    <div>
      {message}
      {console.log('THIS IS MESSAGE: ', message)}
    </div>
  );
}

export default LoadingComponent;

LoadingComponent.propTypes = {
  message: PropTypes.string.isRequired,
};
