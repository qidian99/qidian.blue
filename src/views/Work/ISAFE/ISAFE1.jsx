import { useTranslation } from "react-i18next";
import BookIcon from "@material-ui/icons/Book";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import AssignmentIcon from "@material-ui/icons/Assignment";
import StorageIcon from "@material-ui/icons/Storage";
import SearchIcon from "@material-ui/icons/YoutubeSearchedFor";
import HelpIcon from "@material-ui/icons/LiveHelp";
import BrushIcon from "@material-ui/icons/Brush";



import CustomTimeline from "../../../components/Timeline";
import { Fragment } from "preact";
import Image0 from "../../../assets/isafe_direct.png";
import Image2 from "../../../assets/isafe_web_service.png";
import Image3 from "../../../assets/isafe_myok.png";

import Image6 from "../../../assets/isafe_digiyak.png";
import Image8 from "../../../assets/isafe_fuzzy_search.png";
import Image9 from "../../../assets/isafe_graphql.png";
import Image10 from "../../../assets/isafe_digiyak_post.png";


const T_PRE = "work.isafe1";

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
      return LaptopMacIcon;
    case 5:
      return HelpIcon;
    case 6:
      return BrushIcon;
    case 7:
      return StorageIcon;
    case 8:
      return SearchIcon;
    case 9:
      return DeveloperModeIcon;
    case 10:
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
      return null;
    case 2:
      return Image2;
    case 3:
      return Image3;
    case 6:
      return Image6;
    case 8:
      return Image8;
    case 9:
      return Image9;
    case 10:
      return Image10;
    default:
      return null;
  }
};


const getAlt = (i) => {
  switch (i) {
    case 0:
      return "ISAFE Home Page";
    case 1:
      return null;
    case 2:
      return "Drupal 7 Custom Web Services";
    case 3:
      return "React Native Document Delivery Application";
    case 6:
      return "Social app prototype";
    case 8:
      return "Fuzzy search";
    case 9:
      return "GraphQL API server";
    case 10:
      return "Social app front-end implementation";
    default:
      return null;
  }
};


const getImageHeight = (i) => {
  switch (i) {
    case 3:
    case 8:
    case 10:
      return 600;
    default:
      return 300;
  }
};


const ISAFE1 = () => {
  const [t] = useTranslation('common');
  // const { store: { language, theme } } = useContext(MyContext);
  return (
    <Fragment>
      <CustomTimeline
        // language={language}
        // theme={theme}
        // debug={true}
        title={t(`${T_PRE}.title`)}
        timelineItems={Array(11)
          .fill(0)
          .map((_, i) => ({
            time: t(`${T_PRE}.${i + 1}_time`),
            topic: t(`${T_PRE}.${i + 1}_title`),
            body: t(`${T_PRE}.${i + 1}_body`),
            description: t(`${T_PRE}.${i + 1}_desc`),
            Icon: getIcon(i),
            image: getImage(i),
            imageHeight: getImageHeight(i),
            alt: getAlt(i),
          }))}
      />
    </Fragment>
  );
};

export default ISAFE1;
