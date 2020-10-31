import React, {Component} from 'react';

class Chatlist extends Component {
  render() {
    const listItem = this.props.list.map((name) =>
    <li>{name}</li>
    );

    return (
      <div>
      <ol>
        {listItem}
      </ol></div>
    );
  }
}

export default Chatlist;
