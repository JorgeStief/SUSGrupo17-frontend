import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import { useForm } from 'react-hook-form';
// import { Container } from './styles';
import api from '../../services/api';

type LoginScore = {
  firstName: string;
  lastName: string;
  cpf: string;
  birthday: string;
};

const Login: React.FC = () => {
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm<LoginScore>();

  async function onSubmit(data: LoginScore) {
    try {
      await api.post('users/', data).then((response) => {
        if (response.status === 200) {
          console.log(' com sucesso');
        }
      });
      history.push('/menu');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="needs-validation"
      id="store"
    >
      <div className="container">
        <div className="row">
          <h1 className="pt-5 pb-5">Cadastro</h1>
        </div>
        <div className="row">
          <div className="col-md-6 pr-1">
            <div className="form-group">
              <label>
                Nome<span>*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="form-control"
                ref={register({
                  required: 'Digite seu Nome!',
                })}
              />
              {errors.firstName && (
                <p className="">{errors.firstName.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="form-group">
              <label htmlFor="identifier">Sobrenome</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="form-control"
                ref={register({
                  required: 'Digite seu Sobrenome!',
                })}
              />
              {errors.lastName && (
                <p className="error">{errors.lastName.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 pr-md-1">
            <div className="form-group">
              <label>Data de Aniversário</label>
              <input
                id="birthday"
                name="birthday"
                type="text"
                className="form-control"
                ref={register({
                  required: 'Digite sua data de aniversário!',
                })}
              />
              {errors.birthday && (
                <p className="error">{errors.birthday.message}</p>
              )}
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="form-group">
              <label>CPF</label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                className="form-control"
                ref={register({
                  required: 'Digite seu CPF!',
                })}
              />
              {errors.cpf && <p className="error">{errors.cpf.message}</p>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 pr-1">
            <button className="btn btn-success" type="submit">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
