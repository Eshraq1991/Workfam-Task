import React from "react";

class ResourceCell extends React.PureComponent {
  render() {
    const {
      data: {
        color,
        text,
        data: { avatar }
      }
    } = this.props;
    return (
      <div className="dx-template-wrapper">
        <div className="name" style={{ background: color }}>
          <h2>{text}</h2>
        </div>
        <div className="avatar">
          <img src={avatar} />
        </div>
      </div>
    );
  }
}

export default ResourceCell;
