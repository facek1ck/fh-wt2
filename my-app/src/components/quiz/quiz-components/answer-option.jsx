import React from 'react';
import { Button } from 'antd';


const AnswerOption = (props) => {

    return(
        <div className="answer-option">
            <Button
                id="answer-button"
                size="large"
                type="primary"
                id={props.answerType}
                value={props.index}
                className={(props.selectedAnswer === props.index) ? 'selected-btn' : '' }
                onClick={props.onAnswerSelected}
            >
                {props.answerContent}
            </Button>

        </div>
    )
    
}

export default AnswerOption;