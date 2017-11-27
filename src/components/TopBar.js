/**
 * Created by tvaisanen on 11/27/17.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const TopBar = () => (
  <AppBar
    title="EQ Ear Trainer"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

export default TopBar;