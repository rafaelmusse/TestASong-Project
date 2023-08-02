import React from 'react';
import Ab from '../components/Ab';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      pesquisa: '',
      pesquisado: false,
      erro: false,
      dados: [],
      nome: '',
    };
  }

  pesquisarArtista = async () => {
    const { pesquisa } = this.state;
    const dados = await searchAlbumsAPI(pesquisa);
    if (dados.length === 0) {
      this.setState({
        erro: true,
      });
    } else {
      this.setState({ dados,
        pesquisado: true,
        nome: pesquisa,
        pesquisa: '' });
    }
  };

  handlePesquisa = (event) => {
    const inputValue = event.target.value;
    this.setState({
      pesquisa: inputValue,
    });
  };

  pesquisaValida = () => {
    const { pesquisa } = this.state;
    const minimo = 2;
    const validador = pesquisa.length >= minimo;
    return validador;
  };

  render() {
    const { pesquisado, dados, erro, pesquisa, nome } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            id="pesquisa"
            type="text"
            value={ pesquisa }
            data-testid="search-artist-input"
            onChange={ this.handlePesquisa }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ !this.pesquisaValida() }
            onClick={ this.pesquisarArtista }
          >
            Pesquisar

          </button>
        </form>
        {erro && <h2>Nenhum álbum foi encontrado</h2>}
        {pesquisado && (
          <div><h5>{`Resultado de álbuns de: ${nome}`}</h5></div>)}
        {pesquisado
        && dados.map(({ collectionName, artistName, artworkUrl100, collectionId }) => (<Ab
          collectionName={ collectionName }
          artistName={ artistName }
          artworkUrl100={ artworkUrl100 }
          collectionId={ collectionId }
          key={ collectionId }
        />))}
      </div>
    );
  }
}

export default Search;
