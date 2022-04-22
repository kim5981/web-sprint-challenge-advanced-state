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

        <div className="cog" style={{ "--i": 1 }}>
          { props.wheel === 1 ? "B" : "" }
        </div>

        <div className="cog" style={{ "--i": 2 }}>
          { props.wheel === 2 ? "B" : "" }
        </div>
        
        <div className="cog" style={{ "--i": 3 }}>
          { props.wheel === 3 ? "B" : "" }
        </div>
        
        <div className="cog" style={{ "--i": 4 }}>
          { props.wheel === 4 ? "B" : "" }
        </div>
        
        <div className="cog" style={{ "--i": 5 }}>
          { props.wheel === 5 ? "B" : "" }
        </div>
     
      
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={ clockwiseBtn } >
          { /** functionalities are flipped.. need to fix */}
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={ counterClockwiseBtn }>
          Clockwise
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wheel: state.wheel.counter,
  }
}

export default connect( mapStateToProps, actions )(Wheel)