import React, { Component } from 'react';

const ErrorComponent = () => <div></div>;
// const ErrorComponent = () => <div>{props.ignore}</div>;

export class counter extends Component {
  constructor(props) {
    console.log('Constructor');
    super(props);

    this.state = {
      counter: 0,
      seed: 0,
      initializing: true,
    };

    this.increment = () => this.setState({ counter: this.state.counter + 1 });
    this.decrement = () => this.setState({ counter: this.state.counter - 1 });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.seed && state.seed !== props.seed) {
      return {
        seed: props.seed,
        counter: props.seed,
      };
    }
    return null;
  }

  componentDidMount() {
    console.log('Component did mount');
    setTimeout(() => this.setState({ initializing: false }), 500);
    console.log('-------------------');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.ignoreProp &&
      this.props.ignoreProp !== nextProps.ignoreProp
    ) {
      console.log('Should component update - do not render');
      console.log('-------------------');
      return false;
    }
    console.log('Should component update - render');
    console.log('-------------------');

    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Get snapshot before update');
    return null;
  }

  render() {
    console.log('Render');

    if (this.props.showErrorComponent && this.state.error) {
      return (
        <div>We have encountered an error: {this.state.error.message}</div>
      );
    }

    if (this.state.initializing) {
      return <div>Please wait while we gather our resources...</div>;
    }

    return (
      <div>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <div className='counter'>Counter: {this.state.counter}</div>
        {this.props.showErrorComponent && <ErrorComponent />}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Component did update');
    console.log('-------------------');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
    console.log('-------------------');
  }

  componentDidCatch(error, info) {
    console.log('Component did catch');
    this.setState({ error, info });
  }
}

export default counter;
