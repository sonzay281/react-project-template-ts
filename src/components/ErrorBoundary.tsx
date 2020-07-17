import React, { Component } from "react";
import { withScope, captureException, showReportDialog } from "@sentry/browser";

/***
 * Error Boundy
 * This component catch, logs the error and send to sentry dashboard.
 */
class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      eventId: null,
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    const { hasError, eventId }: any = this.state;
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
