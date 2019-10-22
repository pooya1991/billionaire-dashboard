import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>&copy; کلیه حقوق این سایت برای Billionaire محفوظ است.</span>
        <div className="footer-icon">
          <a href="#" className="fa fa-facebook-square" target="_blank"></a>
          <a href="#" className="fa fa-telegram" target="_blank"></a>
          <a href="#" className="fa fa-instagram" target="_blank"></a>
          <a href="#" className="fa fa-linkedin-square" target="_blank"></a>
          <a href="#" className="fa fa-twitter-square" target="_blank"></a>
        </div>
        {/* <span className="ml-auto">Powered by <a href="https://coreui.io/react">CoreUI for React</a></span> */}
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
