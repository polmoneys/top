## TLDR

**Top 10** favorite React LOC that live happily on prod. 

### Hooks (5)

Some **data structures** are better than others when dealing with **collections** that you can select and toggle. `useSet` and `useMap` is all you need.  

Another tool is `useLeader` that wraps an item (usually a checkbox) and a collection and keeps track of **indeterminate** state.

Most components with complex user interactions might need to track a user choice and output more components accordingly. `useLine` let user choose them own **line of thought**. 

Finally, `useItem` will help add temporary data to **T**.

### Components (5)

When working with complex collections and **lists** we may need a headless display of items, this is why `<Collection/>` exists. You can mix data sources and prepend collections with titles, dividers or maintain zebra backgrounds as them are parentless.`<Slot/>` adds start/end slots to an **item** of a `<Collection/>`.
 
**Text** is the most critical part of content so we need a  `<Font/>`for some sugar (hint: if you have lots of numbers to display have a prop for it). `<Paper/>` embraces intrinsic grids with [multi column layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_multicol_layout) to envelope `<Font/>`. 

`<Shape/>` will draw SVG shapes for us. 

### CSS

Dropping `src/index.css` onto your project will stabilize browsers. Omit if you have your own thing in place. 

### Run tests

I'm in `love` with Playwright **e2e** testing. 

```bash

$ yarn e2e

```

### Inspiration

> Our requirements are more modest but at the same time more responsible:
> buildings, furniture, drinking glasses may well be consumer items that
> we can destroy without regret after they have served for some short or
> long period, but while we use them we expect them to fullfill their role and serve us perfectly, so perfectly that we can also derive aesthetic
> enjoyment from observing them in use.

Erik Gunnar Asplund on **Swedish Grace**





