import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';

import d3Chart from './graph';

class LineGraph extends React.Component {
    componentDidMount() {
        var el = ReactDOM.findDOMNode(this);
        d3Chart.create(el, {
            width: el.offsetWidth,
            height: el.offsetHeight
        }, this.getChartState(), this.props.formatting);
    }

    componentDidUpdate() {
        var el = ReactDOM.findDOMNode(this);
        d3Chart.update(el, this.getChartState(), {
            width: el.offsetWidth,
            height: el.offsetHeight
        }, this.props.formatting);
    }

    getChartState() {
        return {
            data: this.props.data,
            domain: this.props.domain
        };
    }

    componentWillUnmount() {
        var el = ReactDOM.findDOMNode(this);
        d3Chart.destroy(el);
    }

    render() {
        return (
            <div style={{height: this.props.height}} id="chart" className="Chart"></div>
        );
    }
}


export default LineGraph;