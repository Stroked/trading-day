import React, { PureComponent } from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export default class LookUp extends PureComponent {
  inputRef = React.createRef();
    render() {
    return (
      <Input
        ref={this.inputRef}
        placeholder='Hover to focus!'
        onMouseEnter={() => {
          this.inputRef.current.focus();
        }}
      />
    );
  }
}
