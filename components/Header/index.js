import React from 'react';
import styles from './styles.css';

function Header(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{props.title}</div>
            {props.subTitle ? <div className={styles.subTitle}>{props.subTitle}</div> : null}
            {props.children}
        </div>
    );
}

Header.propTypes = {
    title: React.PropTypes.string,
    subTitle: React.PropTypes.string,
    children: React.PropTypes.any
};

if (process.env.NODE_ENV === 'components') {
  Header.examples = [{
    title: 'Some title',
    subTitle: 'Some subtitle',
    children: <span>hey hey</span>
  }, {
    title: 'Just a title'
  }, {
    title: 'Just a title',
    subTitle: 'With subtitle'
  }, {
    title: 'Just a title',
    subTitle: 'With subtitle'
  }];
}

export default Header;
