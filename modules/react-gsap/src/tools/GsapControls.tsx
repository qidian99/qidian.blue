import React from 'react';
import { PlayState } from '../types';
import { setPlayState } from '../helper';
import Provider from '../Provider';

type ControlsProps = {
  playState?: PlayState;
};

type ControlsState = {
  totalProgress: number;
  playState?: PlayState;
  prevPlayState?: PlayState;
};

class GsapControls extends Provider<ControlsProps, ControlsState> {
  gsap: any;

  state = {
    totalProgress: 0,
    playState: undefined,
    prevPlayState: undefined,
  };

  componentDidMount() {
    if (this.consumers.length) {
      this.gsap = this.consumers[0];

      const gsap = this.gsap.getGSAP();

      if (gsap) {
        if (this.props.playState) {
          this.setPlayState(this.props.playState);
        } else {
          // get child initial state
          if (gsap.paused()) {
            this.setPlayState(PlayState.pause);
          } else if (gsap.reversed()) {
            this.setPlayState(PlayState.reverse);
          } else {
            this.setPlayState(PlayState.play);
          }
        }

        const totalProgress = gsap.totalProgress();
      }
    }
  }

  onChange = (event: any) => {
    if (this.gsap && this.gsap.getGSAP()) {
      this.gsap.getGSAP().totalProgress(event.target.value / 100);
    }
  };

  setPlayState = (state: PlayState) => {
    this.setState(prevState => {
      return {
        playState: state,
        prevPlayState: prevState.playState,
      };
    });
  };

  render() {
    const { children } = this.props;
    const { totalProgress, playState, prevPlayState } = this.state;

    if (this.gsap) {
      setPlayState(playState, prevPlayState, this.gsap.getGSAP());
    }

    return this.renderWithProvider(<div>{children}</div>);
  }
}

export default GsapControls;
