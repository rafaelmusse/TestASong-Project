import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      load: false,
      entrou: false,
    };
  }

  salvarNome = () => {
    const { name } = this.state;
    this.setState({
      load: true,
    });
    createUser({ name });
    this.setState({
      entrou: true,
    });
  };

  buttonCondition = () => {
    const minLetras = 3;
    const { name } = this.state;
    const tamanhoNome = name.length >= minLetras;
    return tamanhoNome;
  };

  handleName = (event) => {
    const valor = event.target.value;
    this.setState({
      name: valor,
    });
  };

  render() {
    const { load, entrou } = this.state;
    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          <input
            onChange={ this.handleName }
            id="name"
            type="text"
            data-testid="login-name-input"
          />
        </label>
        <button
          disabled={ !this.buttonCondition() }
          data-testid="login-submit-button"
          type="submit"
          onClick={ this.salvarNome }
        >
          Entrar

        </button>
        {load && <Loading /> }
        {entrou && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
