import React from "react";
import './timerSetting.css';

const TimerSetting = ({name, value, setValue, timerStage}) => {
    let increaseValue = (e) => {
        let currentInput = e.target.closest(".timer-setting").querySelector('input');
        if (currentInput.value < 60) currentInput.value++;
        setValue({target: currentInput});
    }
    let decreaseValue = (e) => {
        let currentInput = e.target.closest(".timer-setting").querySelector('input');
        if (currentInput.value > 1) {
            currentInput.value--;
            setValue({target: currentInput});
        }
    }
    return (
        <div className="timer-setting">
            <label id={`${name}-label`} className={timerStage === "session" ? "primary-sublabel" : "secondary-sublabel"}>{`${name[0].toUpperCase() + name.slice(1,)} length`}</label>
            <div className="timer-setter">
            <button id={`${name}-decrement`} onClick={decreaseValue}><i className="fa fa-minus-circle" aria-hidden="true"></i></button>
            <input type='numeric' value={value} id={`${name}-length`} onChange={setValue}></input>
            <button id={`${name}-increment`} onClick={increaseValue}><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
            </div>
        </div>
    )
}

export default TimerSetting;