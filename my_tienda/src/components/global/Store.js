import React, { Component } from "react";
import Image from "./images/store.jpg";
import "./css/Store.css";
//components
import { withRouter } from "react-router-dom";

const url = "http://127.0.0.1:8000/api/tienda";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: [],
    };
  }
  activateRoute(value) {
    let { history } = this.props;
    history.push("/products/" + value);
  }
  updateStore(value){
    let { history } = this.props;
    history.push("/tienda/" + value);
  }
  deleteStore(value) {
    fetch(url + "/" + value, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          window.location.reload(true);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  componentDidMount() {
    return fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ store: result.data.stores });
          console.log(this.state.store);
        },
        (error) => {}
      );
  }
  render() {
    let data = this.state.store;
    let stores = null;
    if (data != null) {
      stores = data.map((store) => (
        <div className="card  mb-3 shadow-lg">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={Image} className="card-img" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Codigo: {store.ID}</h5>
                <p className="card-text">Nombre: {store.Nombre}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Fecha de Apertura: {store.FechaApertura}
                  </small>
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => this.deleteStore(store.ID)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() => this.updateStore(store.ID)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-success ml-2"
                  onClick={() => this.activateRoute(store.ID)}
                >
                  Ver
                </button>
              </div>
            </div>
          </div>
        </div>
      ));
    }
    return <div className="Store">{stores}</div>;
  }
}

export default withRouter(Store);
