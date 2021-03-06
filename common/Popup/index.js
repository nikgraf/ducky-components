import React from 'react';
import {PropTypes} from 'react';
import styles from './styles.css';
import classnames from 'classnames';

function Popup(props) {
    return (
        <div className={classnames(styles.wrapper, props.className)}>
            {props.children}
        </div>
    );
}

Popup.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default Popup;
