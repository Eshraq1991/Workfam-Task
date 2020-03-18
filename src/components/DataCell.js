import React from "react";

class DataCell extends React.PureComponent {
  render() {
    const {
      data: { text }
    } = this.props;

    return (
      <div>
        <div>{text}</div>
      </div>
    );
  }
}

export default DataCell;
