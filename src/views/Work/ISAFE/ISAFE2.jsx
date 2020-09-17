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
import Image0 from "../../../assets/isafe_web_0.png";
import Image1 from "../../../assets/isafe_web_1.png";
import Image3 from "../../../assets/isafe_web_3.png";
import Image4 from "../../../assets/isafe_web_4.png";
import Image5 from "../../../assets/isafe_web_5.png";


const T_PRE = "work.isafe2";

const getIcon = (i) => {
  switch (i) {
    case 0:
      return LaptopMacIcon;
    case 1:
      return BookIcon;
    case 2:
      return AssignmentIcon;
    case 3:
      return DeveloperModeIcon;
    case 4:
      return DeveloperModeIcon;
    case 5:
      return DeveloperModeIcon;
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
    case 3:
      return Image3;
    case 4:
      return Image4;
    case 5:
      return Image5;
    default:
      return null;
  }
};


const getImageHeight = (i) => {
  switch (i) {
    case 3:
    case 4:
      return 600;
    default:
      return 300;
  }
};


const ISAFE2 = () => {
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

export default ISAFE2;
