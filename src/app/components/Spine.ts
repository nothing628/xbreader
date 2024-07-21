import { t } from "ttag";
import m, { CVnode, ChildArray, Vnode, ClassComponent } from "mithril";
import Slider from "xbreader/models/Slider";
import Peripherals from "xbreader/helpers/peripherals";
import Page from "./Page";
import ReflowablePage from "./ReflowablePage";

export interface SpineAttrs {
  readonly slider: Slider;
  readonly binder: Peripherals;
}

export default class Spine implements ClassComponent<SpineAttrs> {
  view({ attrs, children }: CVnode<SpineAttrs>) {
    const slider = attrs.slider;
    const binder = attrs.binder;
    if (!slider) return null;
    return m(
      "div#br-spine.fixed" + (slider.single ? ".single" : ".double"),
      {
        style: slider.properties,
        ontouchstart: binder ? binder.touchstartHandler : null,
        ontouchend: binder ? binder.touchendHandler : null,
        onmouseup: binder ? binder.mouseupHandler : null,
        onmousedown: binder ? binder.mousedownHandler : null,
        "aria-label": t`Spine`,
      },
      (children as ChildArray).map((page) => {
        const pageCast = page as Vnode<Page | ReflowablePage>;
        if (
          pageCast.attrs.data.TypeLink.startsWith("text/") &&
          !pageCast.attrs.data.findFlag("final")
        )
          return m(
            "div",
            {
              key: "container@" + pageCast.key,
            },
            page
          );
        return m(
          "div",
          {
            style: slider.ttb
              ? {
                  display: "contents",
                }
              : {
                  cssFloat: slider.rtl ? "right" : "left",
                  float: slider.rtl ? "right" : "left",
                  width: `${
                    (100 / slider.length) *
                    (pageCast.attrs.data.Properties.Orientation ===
                      "landscape" || pageCast.attrs.data.findFlag("addBlank")
                      ? slider.perPage
                      : 1)
                  }%`,
                },
            key: "container@" + pageCast.key,
          },
          page
        );
      })
    );
  }
}
