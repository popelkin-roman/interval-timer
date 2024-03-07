import React from "react";

const TimerSettings = ({name, value, setValue}) => {
    let increaseValue = (e) => {
        let currentInput = e.target.closest(".timer-settings").querySelector('input');
        if (currentInput.value < 60) currentInput.value++;
        setValue({target: {value: currentInput.value}});
    }
    let decreaseValue = (e) => {
        let currentInput = e.target.closest(".timer-settings").querySelector('input');
        if (currentInput.value > 1) {
            currentInput.value--;
            setValue({target: {value: currentInput.value}});
        }
    }
    return (
        <div className="timer-settings">
            <label id={`${name}-label`}>{`${name[0].toUpperCase() + name.slice(1,)} length`}</label>
            <button id={`${name}-decrement`} onClick={decreaseValue}><i className="fa fa-minus-circle" aria-hidden="true"></i></button>
            <input type='numeric' value={value} id={`${name}-length`} onChange={setValue}></input>
            <button id={`${name}-increment`} onClick={increaseValue}><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
        </div>
    )
}

export default TimerSettings;