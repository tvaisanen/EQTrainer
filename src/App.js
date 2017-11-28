import React, {Component} from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Exercise from './components/Excercises/Exercise';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import StartScreen from './components/StartScreen';
import {exercises} from './components/Excercises/exercises';

const audioCtx = new AudioContext();

// Create AudioContext and buffer source


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            activeExercise: <StartScreen/>,
        }
    }

    setDrawerState = (open) => {
        this.setState({drawerOpen: open});
    };

    drawerToggle = () => {
        this.setState({drawerOpen: !this.state.drawerOpen});
    };

    drawerMenuSelect = (selection) => {
        this.setState({activeExercise: null});
        this.setState({activeExercise: exercises[selection].component});
        console.log(exercises[selection]);
        this.drawerToggle();
    };

    drawerClose = () => this.setState({drawerOpen: false});

    render() {

        return (
            <div className="App">
                <TopBar drawerToggle={this.drawerToggle}/>
                {this.state.activeExercise}
                <DrawerMenu
                    handleClose={this.drawerClose}
                    setDrawerState={this.setDrawerState}
                    handleToggle={this.drawerToggle}
                    menuSelect={this.drawerMenuSelect}
                    open={this.state.drawerOpen}
                />
            </div>
        );
    }
}

export default App;

const menuItems = (exercises, onClick) => {
    return (
        exercises.map((exercise, i) => (
            <MenuItem onClick={() => onClick(i)}>{exercise.params.title}</MenuItem>
        )
    ));
};

class DrawerMenu extends Component {
    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    open={this.props.open}
                    onRequestChange={(open) => this.props.setDrawerState(open)}
                >
                    {menuItems(exercises, this.props.menuSelect)}
                </Drawer>
            </div>
        );
    }
}