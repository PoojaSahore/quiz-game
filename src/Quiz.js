import React, {Component} from 'react'
import QuizOptions from './QuizOptions'
import classNames from 'classnames'

class Quiz extends Component {
    constructor(props) {
        super(props)
        let riddle = this.playGame()
        this.state = {
            riddle,
            correct: false,
            gameOver: false
        }
        this.renderOptions = this.renderOptions.bind(this)
        this.checkResults = this.checkResults.bind(this)   
        this.playAgain = this.playAgain.bind(this)
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max-min+1)) + min
    }

    playGame() {
        let field1 = this.randomNumber(20, 50)
        let field2 = this.randomNumber(20, 50)
        let result = field1 + field2
        let resultArray = this.generateRandomOptions(result)
        resultArray.push(result)

        resultArray.sort(() => 0.5 - Math.random())
        console.log(resultArray)
        let riddle = {
            resultArray,
            field1,
            field2,
            result
        }
        this.setState({riddle})
        return riddle
    }

    generateRandomOptions(sum) {
        let resultArray = []
        let randomNumbersArray = []
        while(randomNumbersArray.length <=3) {
            let randomNumber = this.randomNumber(1, 10) 
            if(randomNumbersArray.indexOf(randomNumber) === -1)
                randomNumbersArray.push(randomNumber)
        }
        for(let i=0; i<3; ++i) {
            let addSubtract = this.randomNumber(0, 1)
            let result = sum
            if(addSubtract === 1)
                result += randomNumbersArray[i]
            else
                result -= randomNumbersArray[i]
            resultArray.push(result)
    }
        return resultArray
        }
        
    checkResults(answer) {
        if(this.state.riddle.result === answer)
            this.setState({correct: true})
        else
            this.setState({correct: false})
        this.setState({gameOver: true})
    }

    renderOptions() {
        return (
            <div className="options">
                {this.state.riddle.resultArray.map((option, i) => 
                    <QuizOptions option={option} key={i} checkResults={this.checkResults}  />
                    )}
            </div>
        )
    }

    renderMsg() {
        if(this.state.correct)
            return (
                <h3>
                    Yipee! Correct Answer <br />
                    Hit the button below to play again:)
                </h3>
            )
        else
            return (
                <h3>
                    Oops! Incorrect Answer <br />
                    Hit the button below to play again:)
                </h3>
            )
    }

    playAgain() {
        this.setState({correct: false, gameOver: false})
        this.playGame()
    }
    
    render() {  console.log(this.state)
        return (
            <div className="quiz">
                <div className="quiz-content">
                    <p className="question">
                        What is the sum of <span className="class-info">{this.state.riddle.field1}</span> and <span className="class-info">{this.state.riddle.field2}</span>
                    </p>
                    <div className="options">
                    {this.renderOptions()}
                    </div>
                    {/* Correct: {this.state.correct ? "True" : "False"}<br />
                    Game Over: {this.state.gameOver ? "True" : "False"} */}
                    <div className={classNames("after", {"hide": !this.state.gameOver}, {"wrong animated zoomInDown": !this.state.correct}, {"correct animated zoomInDown": this.state.correct})}>
                        {this.renderMsg()}
                    </div>
                </div>
                <div className="play-again">
                    <a className="button" onClick={this.playAgain}>Play Again</a>
                </div>
            </div>
        )
    }
}

export default Quiz