## TLDR

**Top 10** favorite React LOC that live happily on prod. 

### Hooks (5)

Some **data structures** are better than others when dealing with **collections** that you can select and toggle. `useSet` and `useMap` is all you need. Ofc feel free to use a Redux store instead of local state if you need to. 

Another tool is `useLeader` that wraps an item (usually a checkbox) and a collection and keeps track of **indeterminate** state. 

Most components with complex user interactions might need to track a user choice and output more components accordingly. `useLine` is a lil' abstraction to let user choose them own **line of thought**. 

Finally, `useBrowserTab` adds playfulness and intention to opening a new tab. 

Bonus: `useItem` will help add temporary data to **T**.

### Components (5)

When working with complex collections and **lists** we may need a headless display of items, this is why `<Collection/>` exists. You can mix data sources and prepend collections with titles, dividers or maintain zebra backgrounds as them are parentless. 

Up next `<Slot/>`, which will work nicely as **item** of a `<Collection/>` but it's application is limitless as it provides a flexible start/end slot anywhere (hint: label + input, label + input + icon).
 
Text is the most critical part of content so we abstract into `<Font/>` for some sugar (hint: if you have lots of numbers to display have a prop for it). `<Picture/>` sort of same, and `<Shape/>` will draws SVG for us. 

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





