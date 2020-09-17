import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback, useContext } from "preact/hooks";
import $ from "jquery";
import { gsap, Tween } from "gsap";
import ScrollMagic from "ScrollMagic";
import BookIcon from "@material-ui/icons/Book";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import AssignmentIcon from "@material-ui/icons/Assignment";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";



import CustomTimeline from "../../../components/Timeline";
import Panel from "../../../components/Panel";
import { Fragment } from "preact";
import { Reveal } from "react-gsap";
import { CutText, FadeIn } from "../../../utils";
import { Typography } from "@material-ui/core";
import { MyContext } from "../../../store/context";
import DefaultImage from "../../../assets/its.png";
import Image0 from "../../../assets/ibm_onboard.jpeg";
import Image1 from "../../../assets/ibm_paper.png";
import Image2 from "../../../assets/legacy/bn2.png";
import Image3 from "../../../assets/ibm_poster.jpeg";
import Image4 from "../../../assets/legacy/ibm-model.png";

const T_PRE = "work.ibm";

const getIcon = (i) => {
  switch (i) {
    case 0:
      return LaptopMacIcon;
    case 1:
      return BookIcon;
    case 2:
      return DeveloperModeIcon;
    case 3:
      return AssignmentIcon;
    case 4:
      return MeetingRoomIcon;
    case 5:
      return AssignmentTurnedInIcon;
    default:
      return AssignmentTurnedInIcon;
  }
};


const getImage = (i) => {
  switch (i) {
    case 0:
      return Image0;
    case 1:
      return Image1;
    case 2:
      return Image2;
    case 3:
      return Image3;
    case 4:
      return Image4;
    case 5:
      return null;
    default:
      return null;
  }
};


const getImageHeight = (i) => {
  switch (i) {
    case 3:
      return 600;
    default:
      return 300;
  }
};


const IBM = () => {
  const [t] = useTranslation('common');
  // const { store: { language, theme } } = useContext(MyContext);
  return (
    <Fragment>
      <CustomTimeline
        // language={language}
        // theme={theme}
        // debug={true}
        title={t(`${T_PRE}.title`)}
        timelineItems={Array(6)
          .fill(0)
          .map((_, i) => ({
            time: t(`${T_PRE}.${i + 1}_time`),
            topic: t(`${T_PRE}.${i + 1}_title`),
            body: t(`${T_PRE}.${i + 1}_body`),
            description: t(`${T_PRE}.${i + 1}_desc`),
            Icon: getIcon(i),
            image: getImage(i),
            imageHeight: getImageHeight(i),
          }))}
      />
    </Fragment>
  );
};

export default IBM;
