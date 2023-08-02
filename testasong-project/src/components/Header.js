import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      load: true,
    };
  }

  componentDidMount() {
    this.pegarNome();
  }

  pegarNome = async () => {
    const dados = await getUser();
    this.setState({ nome: dados.name });
    this.setState({
      load: false,
    });
  };

  render() {
    const { nome, load } = this.state;

    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Profile
        </Link>
        {load ? <Loading /> : <p data-testid="header-user-name">{nome}</p>}
      </header>
    );
  }
}

export default Header;
