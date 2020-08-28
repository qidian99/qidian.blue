import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback, useContext } from "preact/hooks";
import $ from "jquery";
import { gsap, Tween } from "gsap";
import ScrollMagic from "ScrollMagic";

import { ExperienceSection } from "./ExperienceSection";
import Panel from "../../components/Panel";

export const Projects = () => {
  return (
    <ExperienceSection></ExperienceSection>
  );
};
