import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs';
import '../../stylesheets/main.css';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.info.value;
  }

  componentDidMount() {
    this.info = this.props.info.subscribe(info => {
      if (info) {
        this.setState(info);
      }
    });
  }

  componentWillUnmount() {
    if (this.info) {
      this.info.unsubscribe();
    }
  }

  render() {
    if(!this.state) return null;
    return (
      <div id="mainWrapper" >
        This is where ypur app begins!
      </div>
    );
  }
}

Popup.propTypes = {
  info: PropTypes.instanceOf(Observable).isRequired,
};

export default Popup
