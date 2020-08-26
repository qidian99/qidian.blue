import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback, useContext } from "preact/hooks";
import $ from "jquery";
// import { gsap, TimelineLite, TimelineMax } from "gsap";
import { gsap, Timeline } from "gsap"; // Also works with TweenLite and TimelineLite: import { TweenMax, TimelineMax } from "gsap";

// import * as ScrollMagic from "ScrollMagic";
import ScrollMagic from "ScrollMagic";
// import "imports-loader?define=>false!animation.gsap";
import "animation.gsap";
import "debug.addIndicators";

// import "script-loader!animation.gsap.js";
// import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
// ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

import "./css/project.css";
import { Tween } from "gsap/gsap-core";
export const Projects = () => {
  // init controller
  const [controller] = useState(new ScrollMagic.Controller());


  useEffect(() => {
    const tween = gsap.from(".box", 1.25, {
      duration: 1.25,
      scale: 0,
      y: gsap.utils.wrap([-50, 50]),
      stagger: {
        from: "center",
        amount: 0.25,
      },
    });

    // const tl = gsap.TweenMax().from(".box", {
    //   duration: 1.25,
    //   scale: 0,
    //   y: gsap.utils.wrap([-50, 50]),
    //   stagger: {
    //     from: "center",
    //     amount: 0.25,
    //   },
    // });
    // menuAnim.pause();

    // console.log($('#stage').each(function (i) { console.log($(this)) }))
    const scene = new ScrollMagic.Scene({
      triggerElement: "#stage",
      duration: "50%",
      triggerHook: 0.25,
    })
      // .on("enter", function (e) {
      //   menuAnim.play();
      // })
      // .on("leave", function (e) {
      //   menuAnim.reverse();
      // })
      .addIndicators({
        name: "Box Timeline",
        colorTrigger: "white",
        colorStart: "white",
        colorEnd: "white",
      })
      .setTween(tween)
      .addTo(controller);

    // return controller.destroy(true);
  }, []);
  const [t] = useTranslation("common");

  return (
    <section>
      <div class="spacer">
        <h1>This section is just a spacer</h1>
      </div>

      <div id="stage">
        <div class="box box1">1</div>
        <div class="box box2">2</div>
        <div class="box box3">3</div>
        <div class="box box4">4</div>
        <div class="box box5">5</div>
        <div class="box box6">6</div>
      </div>

      <div class="spacer">
        <h1>This section is just a spacer</h1>
      </div>
      <h1>{t("projects.title")}</h1>
      <div>{t("projects.content")}</div>
    </section>
  );
};
