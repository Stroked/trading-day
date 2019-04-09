import React, { Component } from "react";
import styled from "styled-components";
import _ from 'lodash'
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: '${props=>props.deeper}';
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export default class LookUp extends Component {
  inputRef = React.createRef();
  state={
    updateQuery :(query)=>_.throttle(e=>console.log(e), 500)
  }

  onTickerSearch=(query)=>{
      console.log("The ticker being searched for is...")
      console.log(query);
     // debugger;
  }
    render() {
    return (
      <Input
        ref={this.inputRef}
        deeper="red"
        placeholder='Hover to focus!'
        onMouseEnter={() => {
          this.inputRef.current.focus();
        }}
        onChange={e => {console.log(e);
          this.state.updateQuery(e.target.value);
        }}
      />
    );
  }
}
