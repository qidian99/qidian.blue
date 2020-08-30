import React, { ReactComponentElement } from "react";
import { Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { SplitChars, SplitWords, Timeline, Tween } from "react-gsap";
import { gsap } from "gsap";
import { makeStyles } from "@material-ui/core";

export const FadeIn = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [key: string]: any;
}) => (
  <Tween from={{ opacity: 0 }} {...rest}>
    {children}
  </Tween>
);

export const FadeInWithDelay = ({
  children,
  delay,
  ...rest
}: {
  children: React.ReactNode;
  [key: string]: any;
}) => (
  <Tween from={{ opacity: 0, delay }} {...rest}>
    {children}
  </Tween>
);

export const FadeInLeft = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [key: string]: any;
}) => (
  <Tween
    from={{ opacity: 0, transform: "translate3d(-100vw, 0, 0)" }}
    ease="power1.inOut"
    {...rest}
  >
    {children}
  </Tween>
);

export const RubberBand = ({
  children,
  ...rest
}: {
  children: React.ReactElement;
  [key: string]: any;
}) => (
  <Timeline target={children} {...rest}>
    <Tween
      to={{ scaleX: 1.25, scaleY: 0.75 }}
      ease="power1.inOut"
      duration={0.3}
    />
    <Tween
      to={{ scaleX: 0.75, scaleY: 1.25 }}
      ease="power1.inOut"
      duration={0.1}
    />
    <Tween
      to={{ scaleX: 1.15, scaleY: 0.85 }}
      ease="power1.inOut"
      duration={0.1}
    />
    <Tween
      to={{ scaleX: 0.95, scaleY: 1.05 }}
      ease="power1.inOut"
      duration={0.15}
    />
    <Tween
      to={{ scaleX: 1.05, scaleY: 0.95 }}
      ease="power1.inOut"
      duration={0.1}
    />
    <Tween to={{ scaleX: 1, scaleY: 1 }} ease="power1.inOut" duration={0.25} />
  </Timeline>
);

export const FadeInLeftChars = ({
  children,
  wrapper,
  ...rest
}: {
  children: React.ReactNode;
  wrapper: ReactComponentElement<any>;
  [key: string]: any;
}) => {
  // console.log("rest playstate", rest);
  return (
    <Tween
      from={{ opacity: 0, x: "-100vw" }}
      ease="power1.inOut"
      {...rest}
      stagger={0.1}
    >
      <SplitChars wrapper={wrapper}>{children}</SplitChars>
    </Tween>
  );
};

export const FadeInLeftWords = ({
  children,
  wrapper,
  ...rest
}: {
  children: React.ReactNode;
  wrapper: ReactComponentElement<any>;
  [key: string]: any;
}) => (
  <Tween
    from={{ opacity: 0, x: "-100vw" }}
    ease="power1.inOut"
    {...rest}
    stagger={0.5}
  >
    <SplitWords wrapper={wrapper}>{children}</SplitWords>
  </Tween>
);

export const CutText = ({
  children,
  numberSlices = 4,
  type = 0,
  fill = "#000",
  fontSize = 80,
  ...rest
}: {
  children: string;
  numberSlices?: number;
  type?: number;
  fill?: string;
  fontSize?: number;
  [key: string]: any;
}) => {
  const textRef = useRef<SVGTextElement>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [sliceHeight, setSliceHeight] = useState(0);

  useEffect(() => {
    const boundingBox = textRef.current
      ? textRef.current.getBBox()
      : { x: 0, y: 0, width: 0, height: 0 };
    const { x, y, width, height } = boundingBox;
    setViewBox({ x, y, width, height });

    setSliceHeight(height / numberSlices);
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={viewBox.width}
      height={viewBox.height}
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
    >
      <defs>
        <pattern
          id="cutPattern"
          patternUnits="userSpaceOnUse"
          width={viewBox.width}
          height={viewBox.height}
          x="0"
          y="0"
        >
          <text
            ref={textRef}
            x="0"
            y={-viewBox.y}
            textAnchor="left"
            fontSize={fontSize}
            fill={fill}
          >
            {children}
          </text>
        </pattern>
      </defs>
      <Timeline
        wrapper={<g fill="url(#cutPattern)" />}
        target={Array.from({ length: numberSlices }).map((_, index) => (
          <rect
            key={index}
            x="0"
            y={index * sliceHeight}
            width={viewBox.width}
            height={sliceHeight + 1}
          />
        ))}
        {...rest}
      >
        {type === 0 && (
          <Tween
            from={{
              x: gsap.utils.wrap([-1000, 1000]),
              ease: "Back.easeOut",
            }}
            stagger={0.15}
          />
        )}

        {type === 1 && (
          <Tween
            duration={0.4}
            to={{
              x: gsap.utils.wrap([-50, 70, -70, 120]),
              opacity: gsap.utils.wrap([0.5, 0.8]),
            }}
            stagger={-0.05}
            repeat={1}
            repeatDelay={0.2}
            ease="Back.easeInOut"
            yoyoEase="Elastic.easeOut"
          />
        )}
        {type === 2 && (
          <Tween
            duration={0.4}
            to={{
              y: gsap.utils.wrap([-30, -10, 10, 30]),
              repeat: 1,
              repeatDelay: 0.3,
              yoyo: true,
              ease: "Circ.easeInOut",
            }}
            stagger={0}
          />
        )}
      </Timeline>
    </svg>
  );
};

export const getBackgroundPosition = (index) => {
  let first, second;

  switch (index % 3) {
    case 0:
      first = "left";
      break;
    case 1:
      first = "center";
      break;
    case 2:
      first = "right";
      break;
    default:
      break;
  }
  switch (Math.floor(index / 3)) {
    case 0:
      second = "top";
      break;
    case 1:
      second = "center";
      break;
    case 2:
      second = "bottom";
      break;
    default:
      break;
  }

  return `${first} ${second}`;
};

export const getTooltipPosition = (index) => {
  switch (index) {
    case 0:
      return "top-start";
    case 1:
      return "top";
    case 2:
      return "top-end";
    case 3:
      return "left";
    case 4:
      return "bottom";
    case 5:
      return "right";
    case 6:
      return "bottom-start";
    case 7:
      return "bottom";
    case 8:
      return "bottom-end";
    default:
      break;
  }
};

export const TWEEN_IMAGE_BG_SIZE = 160;
export const TWEEN_IMAGE_PADDING = 20;

const useStyles = makeStyles({
  tweenImgBgContainer: {
    width: TWEEN_IMAGE_BG_SIZE,
    height: TWEEN_IMAGE_BG_SIZE,
    display: "flex",
    flexWrap: "wrap",
  },
  tweenImgBg: {
    width: "33.33%",
    height: "33.33%",
    overflow: "hidden",
    // backgroundSize: `${TWEEN_IMAGE_BG_SIZE}px ${TWEEN_IMAGE_BG_SIZE}px`,
    backgroundSize: `300% 300%`,
  },
});

type TweenGridProps = {
  children: React.ReactNode;
  icon: any;
};

export const TweenGridIcon = React.forwardRef(
  (props: TweenGridProps, ref: React.LegacyRef<any>) => {
    const [classes] = useState(useStyles());
    const { icon } = props;
    return (
      <div {...props} ref={ref} className={classes.tweenImgBgContainer}>
        <Tween
          from={{ scale: 0 }}
          stagger={{ from: "center", amount: 1, grid: [3, 3] }}
          duration={1}
          ease="elastic.out(2, 0.5)"
          position="0"
        >
          {Array(9)
            .fill(0)
            .map((_, index) => {
              // console.log(getBackgroundPosition(index));
              return (
                <div
                  className={classes.tweenImgBg}
                  style={{
                    backgroundImage: `url("${icon}")`,
                    backgroundPosition: getBackgroundPosition(index),
                  }}
                />
              );
            })}
        </Tween>
      </div>
    );
  }
);
