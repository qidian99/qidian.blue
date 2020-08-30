import { AppRoute, AppRouteTitles } from "../../const";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";
import WorkIcon from "@material-ui/icons/WorkOutline";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";


export const getDrawerIcon = (elem) => {
  // console.log(elem)

  switch (AppRoute[elem]) {
    case AppRoute.Home: {
      return (<HomeIcon />)
    }
    case AppRoute.Projects: {
      return (<MeetingRoomIcon />)
    }
    case AppRoute.Resume: {
      return (<AccountCircle />)
    }
    case AppRoute.Work: {
      return (<WorkIcon />)
    }
  }
}
