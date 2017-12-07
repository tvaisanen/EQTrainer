/**
 * Created by tvaisanen on 11/27/17.
 */

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class TopBar extends Component {
    render() {
        return (
            <AppBar
                title="EQ Ear Trainer Beta"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this.props.drawerToggle }
                onTitleTouchTap={this.props.goToStartScreen}
            />
        )
    }
}

export default TopBar;