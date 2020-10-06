import React from "react";
import "./WeatherForm.css";
export const WeatherForm = (props) => {
  return (
    <div className="container">
        <div>{props.error ? error() : null}</div>
      <form onSubmit={props.loadWeather}>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              placeholder="city"
              name="city"
              autoComplete="off"
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="country"
              name="country"
              autoComplete="off"
              className="form-control"
            />
          </div>
          <div className="col-md-3 mt-md-0 py-2 text-md-left">
            <button className="btn btn-warning">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const error = () => <div className="alert alert-danger mx-5" role="alert"> Please Enter City and country</div>
