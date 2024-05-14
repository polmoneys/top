## TLDR

My favorite React LOC that live happily on prod. 

### Hooks (5)

Some **data structures** are better than others when dealing with **collections** that you can select and toggle. `useSet` and `useMap` at your disposal. 

`useLeader` wraps an item (usually a checkbox) and a collection of other checkboxes and keeps track of **indeterminate** state while selecting/unselecting them.

Most components with complex user interactions might need to track a user choice and output more components accordingly. `useLine` let user choose them own **line of thought**. 

Finally, `useItem` will help add temporary data to **T**.

### Components (4)

`<Group/>` can be used by itself or in any of it's specialized variants, usually with more **semantics**. It routes props into classNames from `src/index.css`, I've played with tailwind and **cva**, will stick to this file for now.

When working with complex collections and **lists** we may need a headless display of items, this is why `<Collection/>` exists. You can mix data sources and prepend collections with titles, dividers or maintain zebra backgrounds as them are parentless.`<Slot/>` adds start/end slots to an **item** of a `<Collection/>`, can be consumed as `<Collection.Item/>` for convenience.
 
**Text** is the most critical part of content so we need a  `<Font/>`for some sugar (hint: if you have lots of numbers to display have a prop for it). 


### Tests

I'm in `love` with Playwright **e2e** testing as it gives me a **user clicking on things in the screen** so probably will never write 1 more unit test ever again.  

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





