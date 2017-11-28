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

class LowPassCutOffHigh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false,
            debugCount: 0,
            filter: 'lowpass',
            correctAnswer: '',
            answerState: <ActionHelp style={style.icon}/>,
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

    componentWillUpdate(){

    }

    componentDidUpdate(){
        console.info('Component Updated!')
        console.info(this.state);
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
        this.setState({answeringDisabled: false})
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
                <div><h3>Low Pass cut off frequencies</h3>
                <span>Question # {this.state.questionCount}</span>
                <div><RaisedButton
                    icon={<AVPlayArrow />}

                    secondary={true}
                    onClick={() => this.playQuestion()}
                    style={style.btn}
                />
                </div>
                <div>{answerState}</div>

                {this.answerButtons()}


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


        return (
            <div className="excercise" style={{borderStyle: 'solid'}}>
                {view}
            </div>
        )
    }
}

export default LowPassCutOffHigh;