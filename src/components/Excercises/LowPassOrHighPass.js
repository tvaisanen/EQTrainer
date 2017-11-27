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
}

class LowPassOrHighPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerState: 'NOT_ANSWERED',
            answeringDisabled: false,
            questionCount: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            currentFilter: {frequency: null, type: null},
            filters: ['lowpass', 'highpass'],
            answerButtons: {
                0: {
                    id: 'low',
                    label: 'Low Pass',
                    disabled: false,
                    render: (disabled) => {
                        return (<RaisedButton
                            id="low"
                            style={style}
                            disabled={disabled}
                            onClick={() => this.answer(0)}
                        >Low Pass</RaisedButton>);
                    }
                },
                1: {
                    id: 'high',
                    label: 'High Pass',
                    disabled: false,
                    render: (disabled) => {
                        return <RaisedButton
                            id="high"
                            style={style}
                            disabled={disabled}
                            onClick={() => this.answer(1)}
                        >High Pass</RaisedButton>
                    }
                }
            }
        };
        this.newQuestion = this.newQuestion.bind(this);
    }

    componentDidMount() {
        this.newQuestion();
    }


    newQuestion() {
        // play new question and set the question state to not answered
        const filter = playFilteredWhiteNoise({
            filterOptions: this.state.filters,
            time: 0.5
        });
        this.setState({currentFilter: filter});
        this.enableAnswering();
    }

    repeat() {
        // todo: repeat last question
        playFilteredWhiteNoise({
            filterOptions: this.state.currentFilter,
            time: 0.5
        });
    }

    disableAnswering() {
        this.setState({answeringDisabled: true})
    }

    enableAnswering() {
        this.setState({answeringDisabled: false})
        this.setState({answerState: <ActionHelp/>});
    }

    correctAnswer(){
        this.setState({correctAnswers: this.state.correctAnswers + 1});
        this.setState({answerState: <ActionThumbUp/>})
    }

    wrongAnswer(){
        this.setState({wrongAnswers: this.state.wrongAnswers + 1});
        this.setState({answerState: <ActionThumbDown/>})
    }

    answer(answer) {
        const answerIsCorrect = this.state.filters[answer] === this.state.currentFilter.type;
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
        console.debug(filter);
        const filterType = filter.type;
        const filterFrequency = filter.frequency;
        const answerState = this.state.answerState;
        const answeringDisabled = this.state.answeringDisabled;
        return (
            <div className="excercise" style={{borderStyle: 'solid'}}>
                <div><RaisedButton
                      icon={<AVPlayArrow />}
                      onClick={() => this.repeat()}
                      style={style}
                    />
                </div>
                <div>{answerState}</div>
                {this.state.answerButtons[0].render(answeringDisabled)}
                {this.state.answerButtons[1].render(answeringDisabled)}
                <div>
                    <RaisedButton
                      icon={<ContentForward/>}
                      onClick={() => this.newQuestion()}
                      style={style}
                    />

                </div>
                <hr/>
                <div>{this.state.correctAnswers} / {this.state.wrongAnswers}</div>
                <div>{this.state.questionCount}</div>
                <div><p>{filterType} - {filterFrequency}</p></div>
            </div>
        )
    }
}

export default LowPassOrHighPass;