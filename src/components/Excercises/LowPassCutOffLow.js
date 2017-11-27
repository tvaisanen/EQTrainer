/**
 * Created by tvaisanen on 11/27/17.
 */

/**
 * Created by tvaisanen on 11/27/17.
 */
import React, {Component} from 'react';
import {playFilteredWhiteNoise} from './audioUtils';
import './excercise_styles.css';
import RaisedButton from 'material-ui/RaisedButton';
import ActionHelp from 'material-ui/svg-icons/action/help';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import ContentForward from 'material-ui/svg-icons/content/forward';

const style = {
    margin: 12,
};

const answerStates = {
    NOT_ANSWERED: 'not',
    CORRECT: 'correct',
    WRONG: 'wrong'
};

class LowPassCutOffLow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            debugCount: 0,
            filter: 'lowpass',
            correctAnswer: '',
            answerState: <ActionHelp/>,
            answeringDisabled: false,
            questionCount: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            currentFilter: {frequency: null, type: null},
            answers: [
                {filter: 'lowpass', label: '50 Hz', frequency: '50', id: '50', gain: 1},
                {filter: 'lowpass', label: '100 Hz', frequency: '100', id: '100', gain: 1},
                {filter: 'lowpass', label: '200 Hz', frequency: '200', id: '200', gain: 1},
                {filter: 'lowpass', label: '300 Hz', frequency: '300', id: '300', gain: 1},
                {filter: 'lowpass', label: '400 Hz', frequency: '400', id: '400', gain: 1}
            ],

        };
        this.newQuestion = this.newQuestion.bind(this);
    }

    answerButtons() {
        return this.state.answers.map((a, i) => (
            <RaisedButton
                id={a.id}
                style={style}
                disabled={this.state.answeringDisabled}
                onClick={() => this.answer(i)}
            >{a.label}</RaisedButton>
        ))

    }

    componentDidMount() {
        this.setState({debugCount: this.state.debugCount + 1})
        this.setNewQuestion();

    }


    setNewQuestion() {
        const possibleQuestions = this.state.answers;
        const answer = possibleQuestions[Math.floor(Math.random() * possibleQuestions.length)]
        this.setState({correctAnswer: answer});
    }

    newQuestion() {
        // get the filter parameters here
        this.setNewQuestion();
        console.debug(this.state.correctAnswer);
        // play new question and set the question state to not answered
        if (this.state.correctAnswer !== "") {
            const playedSignal = playFilteredWhiteNoise({
                params: this.state.correctAnswer,
                time: 0.5
            });
            this.setState({played: playedSignal});
            this.enableAnswering();
        } else {
            console.debug('played but not');
        }
    }

    repeat() {
        // todo: repeat last question
        const playedSignal = playFilteredWhiteNoise({
            params: this.state.correctAnswer,
            time: 0.5
        });
        this.setState({played: playedSignal});
    }

    disableAnswering() {
        this.setState({answeringDisabled: true})
    }

    enableAnswering() {
        this.setState({answeringDisabled: false})
        this.setState({answerState: <ActionHelp/>});
    }

    correctAnswer() {
        this.setState({correctAnswers: this.state.correctAnswers + 1});
        this.setState({answerState: <ActionThumbUp/>})
    }

    wrongAnswer() {
        this.setState({wrongAnswers: this.state.wrongAnswers + 1});
        this.setState({answerState: <ActionThumbDown style={{size: '30px'}}/>})
    }

    answer(answer) {
        const answerIsCorrect = this.state.answers[answer] === this.state.correctAnswer;
        if (answerIsCorrect) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }

        this.setState({questionCount: this.state.questionCount + 1});
        this.disableAnswering();

    }

    render() {

        const filter = this.state.currentFilter;
        const answerState = this.state.answerState;

        return (
            <div className="excercise" style={{borderStyle: 'solid'}}>
                <h3>Low Pass cut off frequencies</h3>
                <span>{this.state.debugCount}</span>
                <div><RaisedButton
                    icon={<AVPlayArrow />}
                    onClick={() => this.repeat()}
                    style={style}
                />
                </div>
                <div>{answerState}</div>

                {this.answerButtons()}


                <div>
                    <RaisedButton
                        icon={<ContentForward/>}
                        onClick={() => this.newQuestion()}
                        style={style}
                    />

                </div>
                <p>correct: {JSON.stringify(this.state.correctAnswer)}</p>
                <p>played: {JSON.stringify(this.state.played)}</p>
                <hr/>
                <div>{this.state.correctAnswers} / {this.state.wrongAnswers}</div>
                <div>{this.state.questionCount}</div>
            </div>
        )
    }
}

export default LowPassCutOffLow;