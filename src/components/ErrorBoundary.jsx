import React, { Component } from "react";
import { withScope, captureException, showReportDialog } from "@sentry/browser";

/***
 * Error Boundy
 * This component catch, logs the error and send to sentry dashboard.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: null,
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    const { hasError, eventId } = this.state;
    if (hasError) {
      //some fancy fall back screen
      return (
        <button onClick={() => showReportDialog({ eventId })}>
          Report feedback
        </button>
      );
    }
    //when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
