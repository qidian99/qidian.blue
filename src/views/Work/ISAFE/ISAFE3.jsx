import { useTranslation } from "react-i18next";
import BookIcon from "@material-ui/icons/Book";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import AssignmentIcon from "@material-ui/icons/Assignment";



import CustomTimeline from "../../../components/Timeline";
import { Fragment } from "preact";

const T_PRE = "work.isafe3";

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
    default:
      return null;
  }
};


const getImageHeight = (i) => {
  switch (i) {
    default:
      return 300;
  }
};


const ISAFE3 = () => {
  const [t] = useTranslation('common');
  // const { store: { language, theme } } = useContext(MyContext);
  return (
    <Fragment>
      <CustomTimeline
        // language={language}
        // theme={theme}
        // debug={true}
        title={t(`${T_PRE}.title`)}
        timelineItems={Array(1)
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

export default ISAFE3;
