import React, {Component} from 'react'

const QuizOptions = (props) => {    
    
    const checkParentResult = () => {
        props.checkResults(props.option)
    }

    return (
        <div className="fields animated zoomIn">
            <div className="field-block" onClick={checkParentResult}>{props.option}
            </div>
        </div>
    )
}

export default QuizOptions
