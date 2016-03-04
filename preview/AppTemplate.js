import React from 'react';
import styles from './App.css';
import Preview from './Preview';
import 'font-awesome/css/font-awesome.css';
import './material-ui/css/material-design-iconic-font.css';

const components = __COMPONENTS__;

export default class App extends React.Component {
  componentWillMount() {
    if (!location.hash) {
      location.href = '#' + Object.keys(components)[0];
    }
  }
  renderComponent(Comp) {
    return (Comp.examples || []).map((example, index) => {
      const props = Object.keys(example).reduce((props, key) => {
        props[key] = example[key];
        return props;
      }, {key: index});
      return React.createElement(Comp, props);
    });

  }
  renderProps(Comp) {
    console.log(Comp.propTypes);
    const props = Object.keys(Comp.propTypes || {}).reduce((props, propType) => {
      props[propType] = (Comp.examples || []).reduce((type, example) => {
        if (type !== undefined) {
          return type;
        }
        if (propType in example) {
          if (propType === 'children') {
            return 'children';
          }
          if (typeof example[propType] === 'function') {
            return 'function';
          }
          if (typeof example[propType] === 'string') {
            return 'string';
          }
          if (typeof example[propType] === 'number') {
            return 'number';
          }
          if (typeof example[propType] === 'boolean') {
            return 'boolean';
          }
          if (Array.isArray(example[propType])) {
            return 'array';
          }
          if (typeof example[propType] === 'object' && example[propType] !== null) {
            return 'object';
          }
          return 'Unknown';
        }
      }, undefined);
      return props;
    }, {});
    return Object.keys(props).map((key, index) => {
      return (
        <div key={index}>
          <span>{key}</span> <span>{props[key]}</span>
        </div>
      );
    });
  }
  renderComponents() {
    return Object.keys(components).map((key, index) => {
      const Comp = components[key];
      return (
        <div key={index} style={{display: location.hash.substr(1) === key ? 'block' : 'none'}}>
          <div>
            <h3>Props</h3>
            {this.renderProps(Comp)}
          </div>
          {this.renderComponent(Comp)}
        </div>
      );
    });
  }
  render() {
      const Comp = components.Header;
      return (
        <div className={styles.wrapper}>
          <ul>
            {Object.keys(components).map((key, index) => {
              return (
                <li key={index} onClick={() => this.renderComponent(key)}>
                  {key}
                </li>
              );
            })}
          </ul>
          {this.renderComponents()}
        </div>
    );
  }
}
