import { t } from "ttag";
import m, { ClassComponent, Vnode, Child } from "mithril";
import Logo from "xbreader/partials/Logo";
import Ui from "xbreader/models/Ui";
import Slider from "xbreader/models/Slider";
import Reader from "./Reader";
import Publication from "xbreader/models/Publication";
import Settings from "./Settings";
import Config from "xbreader/models/Config";
import Dialog from "./Dialog";

const spacer = "›";

export interface InterfaceAttrs {
  readonly model: Ui;
  readonly slider: Slider;
  readonly reader: Reader;
  readonly config: Config;
}

export default class Interface implements ClassComponent<InterfaceAttrs> {
  oninit() {
    console.log("Interface initialized");
  }

  sliderMove(e: MithrilEvent, slider: Slider, publication: Publication) {
    e.redraw = false;
    if (publication.isTtb || publication.reflowable) {
      if (!slider.selector) return;
      if (slider.ttb || publication.isTtb)
        slider.binder.coordinator!.HTML.scrollTo(
          0,
          ((slider.selector.getBoundingClientRect().height -
            slider.innerHeightCached) *
            parseFloat((e.target as HTMLInputElement).value)) /
            100
        );
      else
        slider.goTo(
          Math.round(
            (parseFloat((e.target as HTMLInputElement).value) / 100) *
              slider.length
          )
        );
    } else slider.goTo(parseInt((e.target as HTMLInputElement).value));
  }

  slider(slider: Slider, publication: Publication) {
    const attrs = {
      type: "range",
      min: "0",
      max: `${slider.length - 1}`, //(slider.length % 2 ?  : slider.length), or (slider.shift ? 1 : 2)
      value: `${slider.currentSlide}`,
      step: `${slider.perPage}`,
      title: t`Select Page`,
      onchange: (e: MithrilEvent) => {
        // Activates when slider is released (mouse let go). Needed for IE compatibility
        slider.binder.ui.mousing = false;
        this.sliderMove(e, slider, publication);
        (e.target as HTMLInputElement).blur();
      },
      oninput: (e: MithrilEvent) => {
        // Triggered on slider value changed (while dragging it!), works in evergreen browsers
        slider.binder.ui.mousing = true;
        this.sliderMove(e, slider, publication);
      },
      dir: publication.rtl ? "rtl" : "ltr",
    };
    if (publication.isTtb || publication.reflowable) {
      attrs.max = `${100}`;
      attrs.value = `${slider.percentage}`;
      attrs.step = "any";
    }
    return m("input.br-slider", attrs);
  }

  sliderSystem(slider: Slider, publication: Publication, embedded: boolean) {
    const items = [this.slider(slider, publication)];

    const currentPageIndicator = m(
      "span.br-slider__pagenum",
      {
        title: t`Current Page`,
        onclick: () => {
          if (slider.toon) return;
          const newPage =
            parseInt(
              prompt(
                `${t`Input a page number`} (${1}-${
                  publication.pmetadata.NumberOfPages
                })`,
                (slider.currentSlide + 1).toString()
              ) || ""
            ) - 1;
          if (newPage !== slider.currentSlide + 1 && newPage >= 0)
            slider.goTo(newPage);
        },
      },
      publication.navi.getPageString(slider)
    );
    const pageAmountIndicator = m(
      "span.br-slider__pagenum-last",
      {
        title: t`# of Pages`,
      },
      publication.pmetadata.NumberOfPages
    );

    if (publication.rtl) {
      if (!publication.reflowable) items.unshift(pageAmountIndicator);
      items.push(currentPageIndicator);
    } else {
      items.unshift(currentPageIndicator);
      if (!publication.isTtb && !publication.reflowable)
        items.push(pageAmountIndicator);
    }

    const seriesSetting = publication.findSpecial("series");
    const sseries = seriesSetting && seriesSetting.Value;
    if (sseries && sseries.next && !embedded) {
      // Has a next chapter
      const nextLink = m(
        `span.br-slider__${publication.rtl ? "lgo" : "rgo"}.next`,
        {
          // Leftmost slider control
          title: t`Go to the next chapter`,
        },
        m(
          m.route.Link,
          {
            href: "/" + sseries.next.uuid,
            options: { replace: false },
            onclick: () => (slider.series.current = sseries.next),
          },
          t`Next` as Child
        )
      );
      if (publication.rtl) items.unshift(nextLink);
      else items.push(nextLink);
    }
    if (sseries && sseries.prev && !embedded) {
      const prevLink = // Has a previous chapter
        m(
          `span.br-slider__${publication.rtl ? "rgo" : "lgo"}.prev`,
          {
            title: t`Go to the previous chapter`,
          },
          m(
            m.route.Link,
            {
              href: "/" + sseries.prev.uuid,
              options: { replace: false },
              onclick: () => (slider.series.current = sseries.prev),
            },
            t`Prev` as Child
          )
        );
      if (publication.rtl) items.push(prevLink);
      else items.unshift(prevLink);
    }
    return m("div.br-botbar-container", items);
  }

  private tweakButton(publication: Publication, slider: Slider): Vnode {
    const horState = slider.single
      ? slider.reflowable && slider.fit === slider._firstfit
        ? slider.fit
          ? "single-wide"
          : "single"
        : slider.rtl
        ? "spread-rtl"
        : "spread-ltr"
      : slider.reflowable && !slider.fit
      ? "single-wide"
      : "single";
    return slider.ttb // Vertical tweaking
      ? m(
          "button#br-view__tweak",
          {
            key: "vertical-tweaks",
            onclick: () => {
              slider.toggleFit();
            },
            title: slider.fit
              ? publication.isScrollable
                ? t`Widen`
                : t`Fit to width`
              : publication.isScrollable
              ? t`Narrow`
              : t`Fit to height`,
          },
          [
            m("i", {
              class: slider.fit ? "br-i-wide" : "br-i-thin",
            }),
          ]
        )
      : // Horizontal tweaking
        m(
          "button#br-view__tweak",
          {
            key: "horizontal-tweaks",
            onclick: () => {
              slider.toggleSpread();
            },
            title:
              horState === "spread-ltr" || horState === "spread-rtl"
                ? t`Spread view`
                : horState === "single"
                ? t`Single page view`
                : t`Wide single page view`,
            "aria-label":
              horState === "spread-ltr" || horState === "spread-rtl"
                ? t`Spread view`
                : horState === "single"
                ? t`Single page view`
                : t`Wide single page view`,
          },
          [
            m("i", {
              class: `br-i-${horState}`,
              "aria-hidden": "true",
            }),
          ]
        );
  }

  renderBotbarControl(attrs: InterfaceAttrs): m.Vnode<any, any> {
    const ui = attrs.model;
    const slider = attrs.slider;
    const reader = attrs.reader;
    const publication = reader.publication;
    const brand = reader.config.state.brand;
    const config = attrs.config;
    const barClass =
      (ui.isHidden ? "hidden" : "shown") + (config.animate ? " animate" : "");

    const children: m.Children[] = [];

    if (publication) {
      children.push(this.sliderSystem(slider, publication, brand.embedded));

      if (!publication.isSmallToon) {
        const controlChilds: m.Children = [];

        if (!publication.isTtb || !publication.isSmallToon) {
          controlChilds.push(this.tweakButton(publication, slider));
        } else {
          controlChilds.push(m.fragment({ key: "no-tweak-button" }, []));
        }

        if (!publication.isTtb) {
          controlChilds.push(
            m(
              "button#br-view__rvm",
              {
                key: "reading-direction",
                title: t`Toggle reading direction`,
                onclick: () => {
                  slider.zoomer.scale = 1;
                  reader.switchDirection();
                },
              },
              [
                m("i#br-view__toggle", {
                  "aria-hidden": "true",
                  class: slider.ttb ? "br-i-horizontal" : "br-i-vertical",
                }),
              ]
            )
          );
        } else {
          controlChilds.push(
            m.fragment({ key: "no-reading-direction-button" }, [])
          );
        }

        const controls = m(
          "div.br-botbar-controls",
          {
            class: slider.portrait ? "portrait" : "landscape",
          },
          controlChilds
        );
        children.push(controls);
      }
    }

    const botbar = m(
      "div#br-botbar.noselect",
      {
        class: barClass,
        "aria-label": t`Bottom bar`,
      },
      children
    );

    return botbar;
  }

  renderTitlebar(attrs: InterfaceAttrs): m.Vnode<any, any> {
    const reader = attrs.reader;
    const series = reader.series;
    const brand = reader.config.state.brand;
    const firstSeries = series?.firstSeries;
    const publication = reader.publication;
    const childrens: m.Children[] = [];

    if (series && series.exists) {
      if (brand.embedded) {
        childrens.push(
          m(
            "span.br-toolbar__ellipsis",
            firstSeries ? (firstSeries.Name as Child) : null
          )
        );
      } else {
        childrens.push(
          m(
            "a.br-toolbar__ellipsis",
            {
              href:
                series && series.firstSeries
                  ? series.firstSeries.Identifier
                  : null,
              title: t`Series`,
              target: "_parent",
            },
            firstSeries ? (firstSeries.Name as Child) : null
          )
        );
        childrens.push(m("span.spacer", spacer));
      }
    } else {
      childrens.push(null);
    }

    if (brand.embedded) {
      childrens.push(
        m(
          "span#br-chapter",
          publication ? (publication.pmetadata.Title as Child) : null
        )
      );
    } else {
      childrens.push(series ? series.selector : null);
    }

    const topbar = m(
      "section.br-toolbar__tsection",
      { "aria-label": t`Title` },
      childrens
    );

    return topbar;
  }

  view(vnode: Vnode<InterfaceAttrs, this>) {
    const ui = vnode.attrs.model;
    const brand = vnode.attrs.reader.config.state.brand;
    const tabConfig = vnode.attrs.reader.config.state.tabs;
    const slider = vnode.attrs.slider;
    const config = vnode.attrs.config;

    const postTabs: Vnode[] = tabConfig
      .filter((t) => !t.prefix)
      .map((tab) =>
        m(
          "a.br-tab",
          {
            title: tab.title,
            href: tab.href,
            target:
              tab.target ??
              (tab.href.startsWith("javascript:") ? "_self" : "_parent"),
          },
          [
            m(`i.br-i-${tab.icon}`, {
              "aria-hidden": "true",
            }),
          ]
        )
      );
    const preTabs: Vnode[] = tabConfig
      .filter((t) => t.prefix)
      .map((tab) =>
        m(
          "a.br-tab",
          {
            title: tab.title,
            href: tab.href,
            target:
              tab.target ??
              (tab.href.startsWith("javascript:") ? "_self" : "_parent"),
          },
          [
            m(`i.br-i-${tab.icon}`, {
              "aria-hidden": "true",
            }),
          ]
        )
      );
    const tabBar = [];
    const tabToggle = [];
    if (postTabs.length > 0) {
      // Tabs exist, show tab functionality
      tabToggle.push(
        m(
          "button.br-tab.br-cmenu__toggle",
          {
            title: t`Menu`,
            onclick: () => {
              ui.toggleMenu();
            },
          },
          [
            m("i.br-i-apps", {
              "aria-hidden": "true",
            }),
          ]
        )
      );
      tabBar.push(m("nav.br-tab-bar", postTabs));
    }
    const startSection = [m(Logo, { brand: brand })];
    if (preTabs.length > 0) startSection.unshift(m("nav.br-tab-bar", preTabs));
    const barClass =
      (ui.isHidden ? "hidden" : "shown") + (config.animate ? " animate" : "");
    const botbar = this.renderBotbarControl(vnode.attrs);
    const titlebar = this.renderTitlebar(vnode.attrs);
    const retval = [
      m(
        "div.noselect#br-topbar",
        {
          class: barClass,
          "aria-label": t`Top bar`,
        },
        [
          m("div.br-topbar__row", [
            m(
              "section.br-toolbar__section.br-toolbar__section--align-start",
              {
                class: brand.embedded || !brand.logo ? "embedded" : "",
                "aria-label": t`Logo`,
              },
              startSection
            ),
            titlebar,
            m(
              "section.br-toolbar__section.br-toolbar__section--align-end.dhide",
              {
                class: brand.embedded ? "gone" : "",
                "aria-label": t`Menu toggle`,
              },
              [m("div", [m("nav.br-tab-bar", tabToggle)])]
            ),
            m(
              "section.br-toolbar__section.br-toolbar__section--align-end.br-cmenu",
              {
                class: brand.embedded
                  ? "gone"
                  : ui.menuShown
                  ? "shown"
                  : "sgone",
                "aria-label": t`Menu`,
              },
              [m("div", tabBar)]
            ),
          ]),
        ]
      ),
      // Botbar control
      botbar,
    ];

    if (ui.settingsShown)
      retval.push(
        m(Settings, {
          config,
          ui,
          slider,
        })
      );

    if (ui.dialogShown)
      retval.push(
        m(Dialog, {
          config,
          ui,
          slider,
        })
      );
    return retval;
  }
}
