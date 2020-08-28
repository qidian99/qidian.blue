// Library dependencies
import { makeStyles } from "@material-ui/core";
import { useRef, useState, useEffect, useCallback } from "preact/hooks";
import { TimelineMax, Linear } from "gsap";
import ScrollMagic from "ScrollMagic";
import { Box } from "@material-ui/core";
import classNames from "classnames";

// Components
import Panel from "../Panel";

const useStyles = makeStyles((theme) => {
  return {
    /***
     * General Layout
     */
    root: {
      position: "relative", // the outer most containers should be relatively positioned
      top: 0,
    },
    container: {
      backgroundColor: theme.palette.background.paper,
      height: "100vh",
      width: "100%",
      position: "relative", // the pinner should be relatively positioned as well
      overflow: "hidden",
    },
    offset: theme.mixins.toolbar, // for the toolbar
    padder: {
      flex: "0 1 auto",
    },
    remainder: {
      flex: "1 1 auto",
    },
    panel: {
      overflowY: "scroll",
      height: "100%",
      width: "100%",
      display: "flex",
      flexFlow: "column",
      position: "absolute", // panels should be absolute when they shift in
    },
    primaryBG: {
      backgroundColor: theme.palette.text.main,
    },
    lightBG: {
      backgroundColor: theme.palette.primary.light,
    },
    darkBG: {
      backgroundColor: theme.palette.primary.dark,
    },
  };
});

/**
 * Swiper that is used in line with MUI ToolBar.
 * @param {*} sectionNodes the list of nodes that will be full-paged
 * @param {Boolean} debug  if true the ScrollMagic indicators will be displayed
 */
const Swiper = ({ sectionNodes, debug = false }) => {
  const [sectionLength] = useState(sectionNodes.length);
  const [controller] = useState(new ScrollMagic.Controller());
  const classes = useStyles();
  const containerRef = useRef(null);
  const rootRef = useRef(null);
  const sectionsRef = useRef(Array(sectionLength).fill(null));
  const setRefs = useCallback(
    (i) => (ref) => {
      sectionsRef.current[i] = ref;
    },
    []
  );

  const [offset] = useState(window.innerHeight);
  const [panelAnimation] = useState(new TimelineMax());

  // Add resize listener to window, since ScrollMagic is calling an API
  // that convert the width of element to pixel size.
  // For more information, see https://github.com/janpaepke/ScrollMagic/issues/312
  const resizeContainer = useCallback(() => {
    const root = rootRef.current;
    root.style.width = `${window.innerWidth}px`;
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeContainer, false);
  }, []);

  // Register scrolling animation
  useEffect(() => {
    const root = rootRef.current;
    const sections = sectionsRef.current;

    // Set entering animtion for each section
    sections.forEach((section, i) => {
      if (i === 0) return; // First page is not transformed by default

      // Show the following section, this is done to avoid the glitching effect
      section.style = null;
      panelAnimation.from(section, offset, {
        xPercent: 100,
        ease: Linear.easeNone,
        delay: 300,
      });
    });

    // Create the ScrollMagic scence that binds to the root element
    const scene = new ScrollMagic.Scene({
      triggerElement: root,
      triggerHook: "onLeave",
      duration: `${(sectionLength - 1) * 100}%`,
    })
      .setPin(root)
      .setTween(panelAnimation)
      .addTo(controller);

    if (debug) {
      scene.addIndicators({
        colorTrigger: "white",
        colorStart: "white",
        colorEnd: "white",
        indent: 40,
      });
    }
  }, []);

  // We need a FC that is recreated each time the theme or language changes
  const PanelForRefresh = ({ children }) => <Panel>{children}</Panel>;

  return (
    <Box component="section">
      <div className={classes.root} ref={rootRef}>
        <div className={classes.container} ref={containerRef}>
          {sectionNodes.map((SectionNode, i) => (
            <section
              ref={setRefs(i)}
              className={classNames(
                classes.panel,
                i % 2 == 0 ? classes.darkBG : classes.lightBG
              )}
              {...(i != 0 ? { style: { visibility: "hidden" } } : {})}
            >
              <PanelForRefresh>
                <SectionNode />
              </PanelForRefresh>
            </section>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Swiper;
