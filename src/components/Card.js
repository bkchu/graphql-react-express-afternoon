import React from "react";
import DeletePersonMutation from "./mutations/DeletePersonMutation";

const Card = props => {
  let { id, name, height } = props.item;
  return (
    <div>
      {`
      ${id}. ${name}
      Height: ${height}
      
      `}
      <DeletePersonMutation>
        {(loading, err, deletePerson) => {
          return (
            <div>
              <button onClick={() => deletePerson({ variables: { id } })}>
                Delete
              </button>
              {loading && <p>Loading...</p>}
              {err && <p>Error :({console.log(err)}</p>}
            </div>
          );
        }}
      </DeletePersonMutation>
    </div>
  );
};

export default Card;
