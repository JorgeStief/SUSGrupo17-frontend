import React, { FormEvent, ChangeEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css';
import { FaUser, FaKey } from 'react-icons/fa';

import SUS from '../../assets/sus.png';
// import { Container } from './styles';
import api from '../../services/api';
import { login } from '../../services/auth';

const Login: React.FC = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    cpfOrSusCardNumber: '',
    password: '',
  });
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { cpfOrSusCardNumber, password } = formData;
    if (!cpfOrSusCardNumber || !password) {
      setError('Preencha todos os dados para fazer login');
    } else {
      try {
        const data = {
          cpfOrSusCardNumber,
          password,
        };
        await api.post('auth/login', data).then((response) => {
          if (response.status === 200) {
            const { token } = response.data;
            login(token);
            console.log(token);
          }
        });
        history.push('/consulta/marcar');
      } catch (err) {
        console.log(err);
        setError('Dados incorretos!');
      }
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div className="container" id="main">
      <div className="container h-100" id="ajax">
        <div className="teste">
          <div className="user_card">
            <div className="row pl-8 img-div">
              <img className="img-control" alt="SUS" src={SUS} />
            </div>

            <div className="d-flex justify-content-center form_container">
              <form method="POST" action="" onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                  </div>

                  <input
                    type="text"
                    name="cpfOrSusCardNumber"
                    className="form-control input_user"
                    placeholder="CPF/Cartão SUS"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <span className='text-danger text-center style=""'>
                      <strong />
                    </span>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <FaKey />
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="form-control input_pass"
                    placeholder="Senha"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <span className="text-danger text-center">
                      <strong />
                    </span>
                  </div>
                </div>
                <button type="submit" name="button" className="btn login_btn">
                  Entrar
                </button>
                <span className="create-account">
                  Não possui conta?&nbsp;
                  <Link to="/cadastrar">Cadastre-se</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
