import React from "react";

export const Weather = (props) => {
  return (
    <div className="container text-light">
      <div className="cards pt-4">
        <h1>{props.city}</h1>
      </div>
      <h5 className="py-5">
        <i class={` wi ${props.icon} display-1`}></i>
      </h5>
      
      {props.temp && props.temp_min && props.temp_max && props.description ? (
        <div>
          <h1 className="py-2">Temperature : {props.temp}&deg; </h1>
          <h3 className="py-2">Minimum Temperature : {props.temp_min}&deg;</h3>
          <h3 className="py-2">Maximum Temperature : {props.temp_max}&deg;</h3>
          <h4 className="py-2">Description : {props.description}</h4>
        </div>
      ) : null}
    </div>
  );
};
