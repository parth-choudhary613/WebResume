import React from 'react';

export default class SceneBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) { console.warn('Hero decoration unavailable:', error); }
  render() { return this.state.failed ? (this.props.fallback ?? null) : this.props.children; }
}
