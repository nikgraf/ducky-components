import ButtonCounter from '../../ButtonCounter';
import IconSVG from '../../IconSVG';
import Icon from '../../Icon';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './styles.css';

const ICON_WIDTH = 24;
const OVERLAP = 7;
const SPACE = 40;

class ActionItemSummaryComposit extends React.Component {
    constructor(props) {
        super(props);
        this.renderIcons = this.renderIcons.bind(this);
    }

    componentDidMount() {
        const icons = this.renderIcons();

        ReactDOM.render(<div>{icons}</div>, this.container);
    }

    handleRef = (component) => {
        this.container = component;
    };

    renderIcons() {
        let lastLeft = 0;
        const width = ReactDOM.findDOMNode(this.container).offsetWidth;
        const number = Math.floor((width - SPACE) / (ICON_WIDTH - OVERLAP));
        const iconsMap = this.props.icons.slice(0, number).map((icon, key) => {
            lastLeft = key * (ICON_WIDTH - OVERLAP);
            return (
                <IconSVG
                    className={styles.icon}
                    icon={icon}
                    key={key}
                    size={"small"}
                    style={{left: key * (ICON_WIDTH - OVERLAP)}}
                />
            );
        });
        const numberLeft = this.props.icons.length - number;

        return [iconsMap,
            numberLeft > 0
                ? <ButtonCounter
                    className={styles.cb}
                    key={"bc"}
                    number={numberLeft}
                    prefix={'+'}
                    size={'small'}
                    style={{position: "absolute", left: lastLeft + ICON_WIDTH - OVERLAP}}
                  /> : null,
            <Icon
                className={classNames(styles.arrow, {[styles.expanded]: this.props.expanded})}
                icon={"icon-keyboard_arrow_down"}
                key={"icon"}
                onClick={this.props.onClick}
                size={"standard"}
            />
        ];
    }

    render() {
        return (
            <div
                className={classNames(styles.wrapper, {
                    [this.props.className]: this.props.className
                })}
                ref={this.handleRef}
            >
            </div>
        );
    }
}

ActionItemSummaryComposit.propTypes = {
    className: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    icons: React.PropTypes.arrayOf(React.PropTypes.string),
    onClick: React.PropTypes.func
};

export default ActionItemSummaryComposit;
