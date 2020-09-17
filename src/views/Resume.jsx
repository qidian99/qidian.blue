import { useTranslation } from "react-i18next";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import enResume from "./files/Dian_Qi_Resume_English.pdf";
import chResume from "./files/Dian_Qi_Resume_Chinese.pdf";
import dummy from "./files/dummy.pdf";
import { useState, useEffect, useContext, useCallback } from "preact/hooks";

import { makeStyles } from "@material-ui/core";
import { MyContext } from "../store/context";
import './pdf.css';

export const useStyles = makeStyles((theme) => {
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
    offset: theme.mixins.toolbar, // f
  };
});

export const Resume = () => {
  const [t] = useTranslation("common");
  const classes = useStyles();

  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth();
    console.log(scrollbarWidth);
    const changeWidth = () => setWidth(window.innerWidth - scrollbarWidth);
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);


  const removeTextLayerOffset = useCallback(() => {
    // const textLayers = document.querySelectorAll(
    //   ".react-pdf__Page__textContent"
    // );
    // console.log('layer', textLayers);
    // textLayers.forEach((layer) => {
    //   console.log(layer);
    //   const { style } = layer;
    //   style.top = "0";
    //   style.left = "0";
    //   style.transform = "";
    // });
  }, []);

  const getScrollbarWidth = useCallback(() => {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }, []);

  const [width, setWidth] = useState(window.innerWidth - getScrollbarWidth());

  const {
    store: { language, theme },
  } = useContext(MyContext);
  // console.log(language);

  const file = language == "zhCN" ? chResume : enResume;

  // console.log(enResume);
  return (
    <section>
      <div className={classes.offset} />
      {/* <h1>{t("resume.title")}</h1>
      <div>{t("resume.content")}</div> */}
      <Document
        file={file}
        onLoadSuccess={() => {
          console.log("sbb");
          removeTextLayerOffset();
        }}
        options={{
          cMapUrl: "/cmaps/",
          cMapPacked: true,
        }}
      >
        <Page pageNumber={1} width={width} />
      </Document>
    </section>
  );
};
