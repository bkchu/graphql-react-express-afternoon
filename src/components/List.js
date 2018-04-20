import React, { Component } from "react";
import Card from "./Card";

class List extends Component {
  render() {
    let { list } = this.props;
    return (
      <div>
        {list[0] &&
          list.map(item => {
            return <Card key={item.id} item={item} />;
          })}
      </div>
    );
  }
}

export default List;
