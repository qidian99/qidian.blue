import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback, useContext } from "preact/hooks";
import $ from "jquery";
import { gsap, Tween } from "gsap";
import ScrollMagic from "ScrollMagic";

import "./css/project.css";
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
      duration: "30%",
      triggerHook: 0.25,
    })
      // .on("enter", function (e) {
      //   menuAnim.play();
      // })
      // .on("leave", function (e) {
      //   menuAnim.reverse();
      // })
      // .addIndicators({
      //   name: "Box Timeline",
      //   colorTrigger: "white",
      //   colorStart: "white",
      //   colorEnd: "white",
      // })
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
