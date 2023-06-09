import React, { Component } from "react";
import PropTypes from "prop-types";
import * as SharedStyle from "../../shared-style";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./fonts.css"

const STYLE = {
  color: SharedStyle.PRIMARY_COLOR,
  borderTop: "",
  borderBottom: "",
  userSelect: "none",
};
const STYLE_TITLE = {
  fontSize: "20px",
  fontFamily: "'AgencyFB'",
  letterSpacing: '2px',
  color: SharedStyle.PRIMARY_COLOR,
  padding: "5px 15px 8px 15px",
  backgroundColor: "#640226",
  textShadow: "",
  boxShadow: "",
  margin: "10px",
  cursor: "pointer",
};
const STYLE_CONTENT = {
  fontSize: "21px",
  color: SharedStyle.PRIMARY_COLOR,
  border: "",
  padding: "0px",
  backgroundColor: SharedStyle.PRIMARY_COLOR,
  textShadow: "",
};
const STYLE_ARROW = {
  float: "right",
};

export default class Panel extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      opened: props.hasOwnProperty("opened") ? props.opened : false,
      hover: false,
    };
  }

  toggleOpen() {
    this.setState({ opened: !this.state.opened });
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    let { name, headComponents, children } = this.props;
    let { opened, hover } = this.state;

    return (
      <div style={STYLE}>
        <h3
          style={{
            ...STYLE_TITLE,
            color: hover
              ? SharedStyle.PRIMARY_COLOR.main
              : SharedStyle.PRIMARY_COLOR.main,
          }}
          onMouseEnter={() => this.toggleHover()}
          onMouseLeave={() => this.toggleHover()}
          onClick={() => this.toggleOpen()}
        >
          {name}
          {headComponents}
          {opened ? (
            <FaAngleUp style={STYLE_ARROW} />
          ) : (
            <FaAngleDown style={STYLE_ARROW} />
          )}
        </h3>

        <div style={{ ...STYLE_CONTENT, display: opened ? "block" : "none" }}>
          {children}
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  name: PropTypes.string.isRequired,
  headComponents: PropTypes.array,
  opened: PropTypes.bool,
};
