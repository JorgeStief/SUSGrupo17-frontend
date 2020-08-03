import React from 'react';
import './style.css';

const Query: React.FC = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12 pb-3">
          <h1>Marcar Consulta</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <form action="" className="needs-validation" noValidate>
            <input type="text" hidden value="ADMIN" name="role" />
            <div className="row">
              <div className="col-md-6 pr-1">
                <div className="form-group">
                  <label>
                    Estado<span> *</span>
                  </label>
                  <input
                    id="uf"
                    name="uf"
                    type="text"
                    className="form-control"
                    placeholder="Estado"
                    required
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
                    Cidade<span> *</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="form-control"
                    placeholder="Cidade"
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
              <div className="col-md-6 pr-1">
                <div className="form-group">
                  <label>
                    Bairro<span> *</span>
                  </label>
                  <input
                    id="
                    neighborhood"
                    name="
                    neighborhood"
                    type="text"
                    className="form-control"
                    placeholder="Bairro"
                    required
                    minLength={5}
                  />
                  <div className="invalid-feedback">
                    Por favor, preencha este campo.
                  </div>
                </div>
              </div>
              <div className="col-md-6 pl-1">
                <div className="form-group">
                  <label>
                    Hospital<span> *</span>
                  </label>
                  <input
                    id="hospital"
                    name="hospital"
                    type="text"
                    className="form-control"
                    placeholder="Hospital"
                    required
                    minLength={5}
                  />
                  <div className="invalid-feedback">
                    Por favor, preencha este campo.
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 pr-md-1">
                <div className="form-group">
                  <label>
                    Qual Especialidade?<span> *</span>
                  </label>
                  <input
                    id="
                    specialty"
                    name="
                    specialty"
                    type="text"
                    className="form-control"
                    placeholder="Especialidade"
                    required
                    minLength={11}
                    maxLength={11}
                  />
                  <div className="invalid-feedback">
                    Por favor, preencha este campo.
                  </div>
                </div>
              </div>
              <div className="col-md-6 pl-md-1">
                <div className="form-group">
                  <label>
                    Escolha o dia e o Horário<span> *</span>
                  </label>
                  <input
                    id="dayTime"
                    name="dayTime"
                    type="text"
                    className="form-control"
                    placeholder="Dia e Horário"
                    required
                    minLength={11}
                    maxLength={11}
                  />
                  <div className="invalid-feedback">
                    Por favor, preencha este campo.
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 d-flex">
                <button className="btn btn-success mr-auto" type="submit">
                  Marcar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Query;
