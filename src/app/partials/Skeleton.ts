import m, { CVnode } from "mithril";

export interface SkeletonAttrs {
  readonly perPage: number;
  readonly margin: number;
}

export default {
  view: ({ attrs }: CVnode<SkeletonAttrs>): m.Vnode => {
    const arr = Array<number>(attrs.perPage);

    return m(
      "div.br-skeleton",
      {
        style: {
          "--xb-margin": `${attrs.margin}px`,
        },
      },
      arr.map((_val, n: number) =>
        m(
          attrs.perPage > 1 ? ".half" : "",
          {
            key: n,
          },
          ""
        )
      )
    );
  },
};
