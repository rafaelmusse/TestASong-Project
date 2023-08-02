import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Ab extends React.Component {
  render() {
    const { collectionName, artistName, artworkUrl100, collectionId } = this.props;
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt="arte do album" />
          <h5>{collectionName}</h5>
          <p>{artistName}</p>
        </Link>
      </div>
    );
  }
}

Ab.propTypes = {
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default Ab;
