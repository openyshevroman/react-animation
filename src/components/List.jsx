import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = { toggleFlag: false };
  }

  handleClick() {
    this.setState(previousState => ({ toggleFlag: !previousState.toggleFlag }));
  }

  render() {
    const { toggleFlag } = this.state;

    return (
      <div className="list">
        <h2>List Component!</h2>

        <div>
          <button onClick={this.handleClick} type="button">Toggle!</button>
        </div>

        <TransitionGroup>
          <CSSTransition
            key={`${Number(toggleFlag)}-key`}
            classNames="toggle-anim"
            timeout={{ enter: 500, exit: 400 }}
            appear
          >
            <div className="toggle-block-wrapper">
              {toggleFlag &&
                <div className="toggle-block toggle-true">
                  TOGGLE TRUE
                </div>
              }

              {!toggleFlag &&
                <div className="toggle-block toggle-false">
                  TOGGLE FALSE
                </div>
              }
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}
