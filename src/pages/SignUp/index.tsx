import React, { useState, FormEvent, ChangeEvent, FocusEvent } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './style.css';
import swal from 'sweetalert2';
import axios from 'axios';
import api from '../../services/api';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    cpf: '',
    role: '',
    password: '',
    email: '',
    cep: '',
    address: '',
    number: '',
    mother: '',
    neighborhood: '',
    city: '',
    uf: '',
  });

  const [error, setError] = useState('');
  const [addressD, setAddressD] = useState('');
  const [cityD, setCityD] = useState('');
  const [ufD, setUfD] = useState('');
  const [neighborhoodD, setNeighborhoodD] = useState('');

  const history = useHistory();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function handleOnBlur(event: FocusEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (!value) {
      setCityD('');
      setAddressD('');
      setNeighborhoodD('');
      setUfD('');
      return;
    }
    try {
      axios.get(`https://viacep.com.br/ws/${value}/json/`).then(({ data }) => {
        if (data.erro !== true) {
          const { logradouro, bairro, localidade, uf } = data;

          setCityD(localidade);
          setAddressD(logradouro);
          setNeighborhoodD(bairro);
          setUfD(uf);
        } else {
          swal.fire({
            icon: 'error',
            title: ' Cep Inválido...',
            showConfirmButton: false,
            timer: 1500,
          });

          setCityD('');
          setAddressD('');
          setNeighborhoodD('');
          setUfD('');
        }
      });
    } catch (erro) {
      swal.fire({
        icon: 'error',
        title: ' Cep Inválido...',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');

    if (form.checkValidity()) {
      event.preventDefault();
      try {
        const {
          firstName,
          lastName,
          birthday,
          password,
          email,
          cep,
          address,
          number,
          mother,
          cpf,
          role,
          neighborhood,
          city,
          uf,
        } = formData;
        const data = {
          firstName,
          lastName,
          password,
          email,
          cpf,
          birthday,
          mother,
          cep,
          address,
          number,
          neighborhood,
          city,
          uf,
          role,
        };
        await api.post('users/', data).then((response) => {
          if (response.status === 201) {
            swal.fire({
              icon: 'success',
              title: 'Novo usuário cadastrado com Sucesso',
              showConfirmButton: false,
              timer: 1500,
              onClose: () => history.push('/'),
            });
          } else {
            swal.fire({
              icon: 'error',
              title: ' Erro ao cadastrar usuário...',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      } catch (err) {
        console.log(err);
        setError('Dados incorretos!');
      }
    }
  }

  return (
    <div className=" container register">
      <div className="row">
        <div className="col-md-12 register-right">
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="logo">
                <img
                  height="100"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Logo_SUS.svg/1200px-Logo_SUS.svg.png"
                  alt=""
                />
              </div>
              <h3 className="register-heading">Cadastrar</h3>
              <div className="register-form">
                {error && <p>{error}</p>}
                <form
                  action=""
                  onSubmit={handleSubmit}
                  className="needs-validation"
                  noValidate
                >
                  <input type="text" hidden value="ADMIN" name="role" />
                  <div className="row">
                    <div className="col-md-6 pr-1">
                      <div className="form-group">
                        <label>
                          Nome<span> *</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder="Nome"
                          required
                          onChange={handleInputChange}
                          minLength={3}
                        />
                        <div className="invalid-feedback">
                          Por favor, preencha este campo.
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 pl-md-1">
                      <div className="form-group">
                        <label>
                          Sobrenome<span> *</span>
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          className="form-control"
                          placeholder="Sobrenome"
                          onChange={handleInputChange}
                          required
                          minLength={3}
                        />
                        <div className="invalid-feedback">
                          Por favor, preencha este campo.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-8 pr-1">
                      <div className="form-group">
                        <label>
                          Nome Completo da Mãe<span> *</span>
                        </label>
                        <input
                          id="mother"
                          name="mother"
                          type="text"
                          className="form-control"
                          placeholder="Nome"
                          required
                          onChange={handleInputChange}
                          minLength={5}
                        />
                        <div className="invalid-feedback">
                          Por favor, preencha este campo.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 pr-md-1">
                      <div className="form-group">
                        <label>
                          CPF<span> *</span>
                        </label>
                        <input
                          id="cpf"
                          name="cpf"
                          type="text"
                          className="form-control"
                          placeholder="CPF"
                          onChange={handleInputChange}
                          required
                          minLength={11}
                          maxLength={11}
                        />
                        <div className="invalid-feedback">
                          Por favor, preencha este campo.
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 px-md-1">
                      <div className="form-group">
                        <label>
                          Email<span> *</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          onChange={handleInputChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Por favor, digite um e-mail válido!.
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 pl-md-1">
                      <div className="form-group">
                        <label>
                          Senha<span> *</span>
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          className="form-control"
                          placeholder="Senha"
                          onChange={handleInputChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Por favor, preencha este campo.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-2 pr-md-1">
                      <div className="form-group">
                        <label>
                          CEP<span> *</span>
                        </label>
                        <input
                          id="cep"
                          name="cep"
                          type="text"
                          className="form-control"
                          placeholder="Cep"
                          onChange={handleInputChange}
                          onBlur={handleOnBlur}
                          required
                          minLength={8}
                          maxLength={8}
                        />
                        <div className="invalid-feedback">
                          Por favor, preencha este campo.
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9 px-md-1">
                      <div className="form-group">
                        <label>Endereço</label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          className="form-control"
                          placeholder="Endereço"
                          onChange={handleInputChange}
                          value={addressD}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-1 pl-md-1">
                      <div className="form-group">
                        <label>
                          Nº<span> *</span>
                        </label>
                        <input
                          id="number"
                          name="number"
                          type="text"
                          className="form-control"
                          placeholder="Nº"
                          onChange={handleInputChange}
                          required
                        />
                        <div className="invalid-feedback" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 pr-md-1">
                      <div className="form-group">
                        <label>Bairro</label>
                        <input
                          id="
                          neighborhood"
                          name="
                          neighborhood"
                          type="text"
                          className="form-control"
                          placeholder="Bairro"
                          required
                          onChange={handleInputChange}
                          value={neighborhoodD}
                          disabled
                        />
                        <div className="invalid-feedback">
                          Por favor, preencha este campo.
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 px-md-1 ">
                      <div className="form-group">
                        <label>Cidade</label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          className="form-control"
                          placeholder="Cidade"
                          onChange={handleInputChange}
                          minLength={11}
                          value={cityD}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-4 pl-md-1 ">
                      <div className="form-group">
                        <label>Estado</label>
                        <input
                          id="uf"
                          name="uf"
                          type="text"
                          className="form-control"
                          placeholder="Estado"
                          value={ufD}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex">
                      <button className="btn btn-success mr-auto" type="submit">
                        Cadastrar
                      </button>
                      <Link to="/" className="btn btn-primary" type="submit">
                        Voltar
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
