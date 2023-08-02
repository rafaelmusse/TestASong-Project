import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      clicado: false,
      load: false,
    };
  }

  componentDidMount() {
    this.estaFavorito();
  }

  estaFavorito = async () => {
    const { trackId } = this.props;
    const favoritos = await getFavoriteSongs();
    const validacao = favoritos.some((id) => id.trackId === trackId);
    if (validacao) {
      this.setState({
        clicado: true,
      });
    }
  };

  favoritado = async () => {
    this.setState((prev) => ({
      clicado: !prev.clicado,
      load: true,
    }));
    const { musica } = this.props;
    await addSong(musica);
    this.setState({
      load: false,
    });
  };

  render() {
    const { clicado, load } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="fav">
          Favorita
          <input
            id="fav"
            type="checkbox"
            checked={ clicado }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.favoritado }
          />
        </label>
        {load && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  musica: PropTypes.shape().isRequired, // Fiz esse quebra galho aqui, suponho que deveria especificar todo o objeto, mas tem muitas chaves/valores.
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
