import React from 'react';
import {PropTypes} from 'react';
import styles from './styles.css';
import classNames from 'classnames';

function CreatePostNavigationFooter(props) {
    return (
        <div className={classNames(styles.wrapper, {[props.className]: props.className})}>
            <div className={styles.buttonWrapper}>
                <button
                    className={styles.button}
                    onClick={props.onAdvance}
                >
                    {"Avbryt"}
                </button>
                <button
                    className={styles.button}
                    onClick={props.onCancel}
                >
                    {"Publiser"}
                </button>
            </div>
        </div>
    );
}

CreatePostNavigationFooter.propTypes = {
    className: PropTypes.string,
    onAdvance: PropTypes.func,
    onCancel: PropTypes.func
};

export default CreatePostNavigationFooter;
