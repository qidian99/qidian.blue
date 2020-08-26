import React from "react";

enum PlayState {
  play = "play",
  reverse = "reverse",
  stop = "stop",
  pause = "pause",
}

const setPlayState = (
  playState?: PlayState,
  prevPlayState?: PlayState | null,
  tween: any = null
) => {
  if (tween && playState && playState !== prevPlayState) {
    if (playState === PlayState.play) {
      if (
        prevPlayState === PlayState.pause ||
        prevPlayState === PlayState.reverse
      ) {
        tween.play();
      } else {
        tween.restart(true);
      }
    } else if (playState === PlayState.reverse) {
      if (
        prevPlayState === PlayState.pause ||
        prevPlayState === PlayState.play
      ) {
        tween.reverse();
      } else {
        tween.reverse(0);
      }
    } else if (playState === PlayState.stop) {
      tween.pause(0);
    } else if (playState === PlayState.pause) {
      tween.pause();
    }
  }
};

export type ContextProps = {
  registerConsumer: (consumer: any) => void;
};

export const Context = React.createContext<ContextProps>({
  registerConsumer: () => {},
});

abstract class Provider<T, S = {}> extends React.Component<T, S> {
  consumers: any[];

  constructor(props: T) {
    super(props);
    this.consumers = [];

    this.registerConsumer = this.registerConsumer.bind(this);
    this.getContextValue = this.getContextValue.bind(this);
    this.renderWithProvider = this.renderWithProvider.bind(this);
  }

  registerConsumer(consumer: any) {
    this.consumers.push(consumer);
  }

  getContextValue() {
    return {
      registerConsumer: this.registerConsumer,
    };
  }

  renderWithProvider(output: any) {
    return (
      <Context.Provider value={this.getContextValue()}>
        {output}
      </Context.Provider>
    );
  }
}

type ControlsProps = {
  playState?: PlayState;
};

type ControlsState = {
  totalProgress: number;
  playState?: PlayState;
  prevPlayState?: PlayState;
};

class Controls extends Provider<ControlsProps, ControlsState> {
  gsap: any;
  slider: any;
  sliderTouched: boolean = false;

  state = {
    totalProgress: 0,
    playState: undefined,
    prevPlayState: undefined,
  };

  containerStyle = {
    backgroundColor: "#f0f0f0",
    padding: "10px 10px 0 10px",
    marginTop: "10px",
    position: "relative" as "relative",
    zIndex: 2,
    fontFamily: "verdana, sans-serif",
    fontSize: "16px",
    border: "1px solid #ccc",
  };

  buttonContainerStyle = {
    margin: "0",
    display: "flex",
    flexWrap: "wrap" as "wrap",
    justifyContent: "space-between",
  };

  buttonStyle = {
    border: "1px solid #999",
    backgroundColor: "#f0f0f0",
    padding: "5px",
    margin: "10px 10px 10px 0",
    cursor: "pointer",
  };

  sliderStyle = {
    margin: "0",
    width: "100%",
  };

  playStateStyle = {
    color: "#999",
    margin: "10px 0",
    fontSize: "14px",
  };

  componentDidMount() {
    if (this.consumers.length) {
      this.gsap = this.consumers[0];

      const gsap = this.gsap.getGSAP();

      if (gsap) {
        gsap.eventCallback("onUpdate", this.onUpdate);
        // console.log('on uppppppdate')
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
        this.slider.value = totalProgress * 100;
      }
    }
  }

  componentDidUpdate() {
    this.onUpdate();
  }

  onUpdate = () => {
    if (this.gsap && this.slider && !this.sliderTouched) {
      const totalProgress = this.gsap.getGSAP().totalProgress();
      this.slider.value = totalProgress * 100;
    }
  };

  onChange = (event: any) => {
    if (this.gsap && this.gsap.getGSAP()) {
      this.gsap.getGSAP().totalProgress(event.target.value / 100);
    }
  };

  setPlayState = (state: PlayState) => {
    this.setState((prevState) => {
      return {
        playState: state,
        prevPlayState: prevState.playState,
      };
    });
  };

  getControls = (_totalProgress: any, playState: PlayState | undefined) => (
    <div style={this.containerStyle}>
      <input
        ref={(el) => (this.slider = el)}
        type="range"
        style={this.sliderStyle}
        step="0.001"
        onChange={(e) => this.onChange(e)}
        onMouseDown={() => (this.sliderTouched = true)}
        onMouseUp={() => (this.sliderTouched = false)}
      />
      <div style={this.buttonContainerStyle}>
        <div>
          <button
            type="button"
            style={this.buttonStyle}
            onClick={() => this.setPlayState(PlayState.play)}
          >
            Play
          </button>
          <button
            type="button"
            style={this.buttonStyle}
            onClick={() => this.setPlayState(PlayState.reverse)}
          >
            Reverse
          </button>
          <button
            type="button"
            style={this.buttonStyle}
            onClick={() => this.setPlayState(PlayState.pause)}
          >
            Pause
          </button>
          <button
            type="button"
            style={this.buttonStyle}
            onClick={() => this.setPlayState(PlayState.stop)}
          >
            Stop
          </button>
        </div>
        <span style={this.playStateStyle}>{playState}</span>
      </div>
    </div>
  );

  render() {
    const { children } = this.props;
    const { totalProgress, playState, prevPlayState } = this.state;

    if (this.gsap) {
      setPlayState(playState, prevPlayState, this.gsap.getGSAP());
    }

    return this.renderWithProvider(
      <div>
        {children}
        {/* {this.getControls(totalProgress, playState)} */}
      </div>
    );
  }
}

export default Controls;
