import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

export const GET_PEOPLE = gql`
  query getPeople {
    people {
      id
      name
      height
    }
  }
`;

export default class PeopleQuery extends Component {
  render() {
    return (
      <Query query={GET_PEOPLE}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error: {error}</p>;
          }
          return <div>{this.props.render(data)}</div>;
        }}
      </Query>
    );
  }
}
