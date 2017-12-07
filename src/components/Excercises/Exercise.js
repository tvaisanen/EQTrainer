/**
 * Created by tvaisanen on 11/27/17.
 */

import React, {Component} from 'react';
import {playFilteredWhiteNoise} from './audioUtils';
import './excercise_styles.css';
import RaisedButton from 'material-ui/RaisedButton';
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import ContentForward from 'material-ui/svg-icons/content/forward';

const style = {
    icon: {width: 68, height: 68, color:'black'},
    iconCorrect: {width: 68, height: 68, color:'green'},
    iconWrong: {width: 68, height: 68, color:'red'},
    btn: {margin: 12},
    correct: {color: 'green', margin: '12px', fontSize: 'large', fontWeight: 'bold'},
    wrong: {color: 'red', margin: '12px', fontSize: 'large', fontWeight: 'bold'},
};

class Exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.exercise.title,
            played: '',
            start: false,
            debugCount: 0,
            filter: props.exercise.filter,
            correctAnswer: '',
            answerState: <ActionHelpOutline style={style.icon}/>,
            answeringDisabled: false,
            questionCount: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            currentFilter: {frequency: null, type: null},
            answers: props.exercise.answers,
            indicateCorrectAnswer: false,
            indicateWrongAnswer: false,
            wrongAnswer: false,
        };
        this.newQuestion = this.newQuestion.bind(this);
    }

    componentWillUpdate(){

    }

    answerButtons() {
        return this.state.answers.map((a, i) => (
            <RaisedButton
                id={a.id}
                style={style.btn}
                disabled={this.state.answeringDisabled}
                onClick={() => this.answer(i)}
            >{a.label}</RaisedButton>
        ))

    }

    componentDidMount() {
        this.setState({debugCount: this.state.debugCount + 1});
    }


    setNewQuestion() {
        console.debug(this.props);
        console.debug(this.state);
        const possibleQuestions = this.state.answers;
        console.debug(possibleQuestions);
        const answer = possibleQuestions[Math.floor(Math.random() * possibleQuestions.length)]
        this.setState({correctAnswer: answer});
        return answer;
    }

    newQuestion() {
        // get the filter parameters here
        // correctAnswer is returned here so updating the component
        // will not cause synch errors between playback and state

        this.setState({wrongAnswer: false});
        const correctAnswer = this.setNewQuestion();
        console.debug(this.state.correctAnswer);
        // play new question and set the question state to not aanswered
        if (this.state.correctAnswer !== "") {
            const playedSignal = playFilteredWhiteNoise({
                params: correctAnswer,
                time: 0.5
            });
            this.setState({played: playedSignal});
            this.enableAnswering();
        } else {
            console.debug('played but not');
            console.debug(this.state);
        }
    }

    playQuestion() {
        // todo: playQuestion last question
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
        this.setState({answeringDisabled: false});
        this.setState({answerState: <ActionHelpOutline style={style.icon}/>});
    }

    correctAnswer() {
        this.setState({correctAnswers: this.state.correctAnswers + 1});
        this.setState({answerState: <ActionThumbUp style={style.iconCorrect}/>})
    }

    wrongAnswer(answer) {
        // todo: this.indicateRighAnswer();
        this.setState({wrongAnswer: true});
        this.setState({wrongAnswers: this.state.wrongAnswers + 1});
        this.setState({answerState: <ActionThumbDown style={style.iconWrong}/>})
    }

    answer(answer) {
        const userAnswer = this.state.answers[answer];
        const correctAnswer = this.state.correctAnswer;
        const answerIsCorrect = userAnswer === correctAnswer;
        if (answerIsCorrect) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }

        this.setState({indicateCorrectAnswer: true});
        this.setState({indicateWrongAnswer: true});

        console.group('Info indicate correct answer!');
        console.debug(this.state.correctAnswer.id);
        console.debug(correctAnswer);
        console.groupEnd();

        this.setState({questionCount: this.state.questionCount + 1});
        this.disableAnswering();

    }

    view(answerState){
        let correctAnswer = " ";
        if (this.state.wrongAnswer){
            correctAnswer = this.state.correctAnswer.label;
        }
             return (
                <div className="container">

                <div>
                    <RaisedButton
                        icon={<AVPlayArrow />}

                        secondary={true}
                        onClick={() => this.playQuestion()}
                        style={style.btn}
                    />
                </div>
                <div>{answerState}</div>

                <div className="answer-buttons">
                    {this.answerButtons()}
                </div>
                    <span>{correctAnswer}</span>
                <div>
                    <RaisedButton
                        icon={<ContentForward />}
                        primary={true}
                        onClick={() => this.newQuestion()}
                        style={style.btn}
                    />
                </div>

                <hr/>
                <div>
                    <span style={style.correct}>{this.state.correctAnswers}</span>|
                    <span style={style.wrong}>{this.state.wrongAnswers}</span>
                </div>
            </div>)
    }

    render() {

        // define icon from [waiting for answer, right/wrong answer]
        const answerState = this.state.answerState;
        let view;
        if (this.state.correctAnswer === "" && !this.state.start){
            //this.setNewQuestion();
            view = <div>
                <p>{this.props.exercise.instructions}</p>
                <RaisedButton
                    label="Start!"
                    secondary={true}
                    onClick={() => {
                        this.newQuestion();
                    }}
                    style={style.btn}
                />
            </div>
        } else {
            view = this.view(answerState);
        }

        return (
            <div className="exercise">
                <h3 className="title">{this.state.title}</h3>
                {view}
            </div>
        )
    }
}

export default Exercise;