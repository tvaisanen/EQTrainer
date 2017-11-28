/**
 * Created by tvaisanen on 11/27/17.
 */

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    handleChange = (event, index, value) => this.setState({value});


    render() {
        return (
            <AppBar
                title="EQ Ear Trainer"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this.props.drawerToggle }
            >
            </AppBar>

        )

    }
}


export default TopBar;