import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import styles from './assets/component.css';

const
    Navigation = () => <x-section class={classNames(styles.headerNav, styles.className)}>
        <Link to="/reports">Reports</Link>
        <Link to="/records">Records</Link>
        <Link to="/users">Users</Link>
        <Link to="/">Main</Link>
    </x-section>;

export default Navigation;
