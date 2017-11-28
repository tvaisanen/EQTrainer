/**
 * Created by tvaisanen on 11/28/17.
 */

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
            answerState: <ActionHelp style={style.icon}/>,
            answeringDisabled: false,
            questionCount: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            currentFilter: {frequency: null, type: null},
            answers: props.exercise.answers

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
        const answer = possibleQuestions[Math.floor(Math.random() * possibleQuestions.length)]
        this.setState({correctAnswer: answer});
        return answer;
    }

    newQuestion() {
        // get the filter parameters here
        // correctAnswer is returned here so updating the component
        // will not cause synch errors between playback and state
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
        this.setState({answerState: <ActionHelp style={style.icon}/>});
    }

    correctAnswer() {
        this.setState({correctAnswers: this.state.correctAnswers + 1});
        this.setState({answerState: <ActionThumbUp style={style.iconCorrect}/>})
    }

    wrongAnswer() {
        this.setState({wrongAnswers: this.state.wrongAnswers + 1});
        this.setState({answerState: <ActionThumbDown style={style.iconWrong}/>})
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

    view(answerState){
             return (
                <div className="container">
                    <h3 className="title">{this.state.title}</h3>
                <span>Question # {this.state.questionCount}</span>
                <div><RaisedButton
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

                <div>
                    <RaisedButton
                        icon={<ContentForward />}
                        primary={true}
                        onClick={() => this.newQuestion()}
                        style={style.btn}
                    />

                </div>

                <hr/>
                <div><span style={style.correct}>{this.state.correctAnswers}</span>|
                    <span style={style.wrong}>{this.state.wrongAnswers}</span></div>
            </div>)
    }

    render() {

        const answerState = this.state.answerState;
        let view;
        if (this.state.correctAnswer === "" && !this.state.start){
            //this.setNewQuestion();
            view = <RaisedButton
                    label="Start!"
                    secondary={true}
                    onClick={() => {
                        this.newQuestion();
                    }}
                    style={style.btn}
                />
        } else {
            view = this.view(answerState);
        }

        let debug = "";

        if (this.state.correctAnswer){
            debug = <div><p>{this.state.correctAnswer}</p></div>;
        }

        return (
            <div className="exercise">
                {view}
            </div>
        )
    }
}

export default Exercise;