import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      dados: [],
      album: '',
      artista: '',
      musicas: [],
    };
  }

  componentDidMount() {
    this.pegarAlbum();
  }

  pegarAlbum = async () => {
    const { match: { params } } = this.props;
    const dados = await getMusics(params.id);
    this.setState(() => ({ dados,
      album: dados[0].collectionName,
      artista: dados[0].artistName }), this.limparPrimeiraPosicao);
  };

  limparPrimeiraPosicao = () => {
    const { dados } = this.state;
    const musicas = [...dados];
    musicas.shift();
    this.setState({ musicas });
  };

  render() {
    const { album, artista, musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h5 data-testid="album-name">{album}</h5>
          <p data-testid="artist-name">{artista}</p>
        </div>
        <div>
          {musicas.map((musica, index) => (<MusicCard
            key={ index }
            trackName={ musica.trackName }
            previewUrl={ musica.previewUrl }
            trackId={ musica.trackId }
            musica={ musica }
          />))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
