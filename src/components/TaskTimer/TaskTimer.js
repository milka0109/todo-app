import React, { Component } from 'react';

import './TaskTimer.css';

export default class TaskTimer extends Component {
  formatTime = (timeState) => {
    const getPadTime = (time) => time.toString().padStart(2, '0');
    const minutes = getPadTime(Math.floor(timeState / 60));
    const seconds = getPadTime(timeState - minutes * 60);
    return `${minutes}:${seconds}`;
  };

  render() {
    const { onPlay, onPause, timeInSec } = this.props;
    const formattedTime = this.formatTime(timeInSec);
    return (
      <span className="timer-container">
        <button type="button" className="icon icon-play" aria-label="play" onClick={onPlay} />
        <button type="button" className="icon icon-pause" aria-label="pause" onClick={onPause} />
        <div className="timer">{formattedTime}</div>
      </span>
    );
  }
}
