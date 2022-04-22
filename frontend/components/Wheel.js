import React from 'react'
import { connect } from "react-redux";
import * as actions from "../state/action-creators";

export function Wheel(props) {

  const { moveClockwise, moveCounterClockwise, } = props;

  const clockwiseBtn = evt => {
    const { value } = evt.target;
        moveClockwise(value);
  }

  const counterClockwiseBtn = evt => {
    const { value } = evt.target;
        moveCounterClockwise(value);
  }

  return (
    <div id="wrapper">
      {/* --i is a custom CSS property, no need to touch that nor the style object */}
      <div id="wheel">

        <div className="cog active" style={{ "--i": 0 }}>
          { props.wheel === 0 ? "B" : "" }
        </div>

        <div className="cog" style={{ "--i": 1 }}></div>

        <div className="cog" style={{ "--i": 2 }}></div>
        
        <div className="cog" style={{ "--i": 3 }}></div>
        
        <div className="cog" style={{ "--i": 4 }}></div>
        
        <div className="cog" style={{ "--i": 5 }}></div>
     
      
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={ counterClockwiseBtn } >
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={ clockwiseBtn }>
          Clockwise
        </button>
      </div>
    </div>
  )
}

export default connect( s => s, actions )(Wheel)