import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Welcome from './Welcome';
import Profile from './Profile';
import List from './List';

const animationTimeouts = { enter: 500, exit: 400 };

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transitionClassName: '',
      historyKeys: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const { historyKeys } = this.state;
    const { location: nextLocation, history: nextHistory } = nextProps;

    if (nextLocation === location) {
      this.setState(() => ({ transitionClassName: '' }));
      return;
    }

    if (nextHistory.action.toLowerCase() === 'push') {
      this.setState(previousState => ({
        transitionClassName: 'anim-up',
        historyKeys: previousState.historyKeys.concat([nextLocation.key]),
      }));
      return;
    }

    const lastHistoryIndex = historyKeys.length - 1;
    const previousHistoryKey = historyKeys[lastHistoryIndex - 1];

    if (nextLocation.key === previousHistoryKey) {
      this.setState(previousState => ({
        transitionClassName: 'anim-down',
        historyKeys: previousState.historyKeys.slice(0, -1),
      }));
      return;
    }

    this.setState(previousState => ({
      transitionClassName: 'anim-up',
      historyKeys: previousState.historyKeys.concat([nextLocation.key]),
    }));
  }

  render() {
    const { location } = this.props;
    const { transitionClassName } = this.state;

    return (
      <div className="app">
        <h1>App Component!</h1>

        <nav className="navigation">
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="profile">Profile</Link>
          <Link className="link" to="list">List</Link>
        </nav>

        <TransitionGroup className={transitionClassName}>
          <CSSTransition
            key={location.key}
            timeout={animationTimeouts}
            classNames="anim"
            appear
          >
            <Switch location={location}>
              <Route path="/" exact component={Welcome} />
              <Route path="/profile" component={Profile} />
              <Route path="/list" component={List} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(App);
