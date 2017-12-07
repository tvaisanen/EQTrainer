import React, {Component} from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import StartScreen from './components/StartScreen';
import {exercises} from './components/Excercises/exercises';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            activeExercise: <StartScreen/>,
        }
    }

    setStartScreen = () => {
        this.setState({activeExercise: <StartScreen/>})
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
                <TopBar
                    drawerToggle={this.drawerToggle}
                    goToStartScreen={this.setStartScreen}/>
                {this.state.activeExercise}
                <AdComponent/>
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

const menuItems = (exercises, onClick) => {
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


class AdComponent extends Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <ins className='adsbygoogle'
                 style={{display: "inline-block", width: "728px", height: "90px"}}
                 data-ad-client="ca-pub-8722970660404042"
                 data-ad-slot="8100700193"
                 data-ad-format='auto'/>
        );
    }
}