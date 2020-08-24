import { AppRoute, AppRouteTitles } from "../../const";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";
import WorkIcon from "@material-ui/icons/WorkOutline";


export const getDrawerIcon = (elem) => {
  // console.log(elem)

  switch (AppRoute[elem]) {
    case AppRoute.Home: {
      return (<HomeIcon />)
    }
    case AppRoute.Projects: {
      return (<WorkIcon />)
    }
    case AppRoute.Resume: {
      return (<AccountCircle />)
    }
  }
}
