import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback, useContext } from "preact/hooks";
import $ from "jquery";
import { gsap, Tween } from "gsap";
import ScrollMagic from "ScrollMagic";
import BookIcon from "@material-ui/icons/Book";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";


import CustomTimeline from "../../components/Timeline";
import Panel from "../../components/Panel";
import { Fragment } from "preact";
import { Reveal } from "react-gsap";
import { CutText, FadeIn } from "../../utils";
import { Typography } from "@material-ui/core";
const T_PRE = "projects.experience";

const getIcon = (i) => {
  switch (i) {
    case 0:
      return LaptopMacIcon;
    case 1:
      return BookIcon;
    case 2:
      return DeveloperModeIcon;
    case 3:
      return AssignmentTurnedInIcon;
    default:
      return AssignmentTurnedInIcon;
  }
};


export const Projects = () => {
  return (
    <Fragment>
      <CustomTimeline
        // debug={true}
        title="IBM China Research Lab"
        timelineItems={Array(6)
          .fill(0)
          .map((_, i) => ({
            time: `${T_PRE}.ibm.${i + 1}_time`,
            topic: `${T_PRE}.ibm.${i + 1}_title`,
            body: `${T_PRE}.ibm.${i + 1}_body`,
            description: `${T_PRE}.ibm.${i + 1}_desc`,
            Icon: getIcon(i),
          }))}
      />
    </Fragment>
  );
};
