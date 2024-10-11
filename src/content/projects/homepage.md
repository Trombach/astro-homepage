---
title: My Homepage
description: A website built with Astro and Svelte
meta:
  repoLink: https://github.com/Trombach/astro-homepage
  tags: ["Front-end", "Personal"]
  tools: ["Astro", "Svelte", "Typescript", "Tailwind", "Vercel"]
cover:
  image: "@images/project-cover/homepage.svg"
  alt: Homepage on different screen sizes
---

<!--markdownlint-disable MD033 -->

Welcome to my personal homepage! In this article you can learn about how this website was built, and what drove my
decision making.

## Quick Facts

- mostly statically built for easy caching and fast page load speeds
- uses Astro's [content collections](https://docs.astro.build/en/guides/content-collections/) and
  [MDX](https://mdxjs.com/) for content
- takes advantage of `ViewTransitions` API for smoother page transitions
- interactive and animated using Svelte transitions and CSS animations

## Why Astro?

Astro is an opinionated open-source framework with the goal of building fast and cachable web pages. While it can be
used to dynamically render content server-side or client-side, its default behaviour is to render static HTML pages.
This simplifies prioritising loading speed and makes Astro one of the most capable and fastest static-site frameworks.

![Lighthouse score for page load of my homepage on desktop.](../../images/lighthouse.png)

One of the most powerful features of Astro is the ability to use components written for other front-end frameworks such
as Svelte or Vue. This hands an unprecedented amount of flexibility to developers to mix and match framework components
and choose whichever framework is suited best to solve a particular problem. For example, I chose Svelte because of its
feature rich animation library, but was also able to add a single component built in React when I couldn't find a
suitable library for Astro or Svelte.

## Why Svelte?

Svelte is one of my favourite front-end frameworks to work with. Besides the fact that it is blazingly fast, it also
comes with some great utility functions for building smooth animations.

<figure>
  <video autoplay loop muted>
    <source src="/hero-animation-short.webm" type="video/webm"></source>
    Your browser does not suppoert videos.
  </video>
  <figcaption>
    Animation on the landing page. Most animations are achieved with plain CSS transitions. The blur effect on the card
    content is created using Sveltes `transition` libraries. You can view this animation on the <a href="/">Hero page</a>.
  </figcaption>
</figure>

Svelte also features a powerful reactivity model that is very easy to use. While it would have been possible to build
reactive components with plain Astro code, Svelte brings some additional quality of life improvements to the table such
as stores and reactive statements.

To me Svelte and Astro are a perfect match, combining a powerful reactive framework with an easy-to-use and powerful
static-site generator.

_Feel free to explore!_

<small>
  <a href="https://www.freepik.com/free-psd/isolated-tablet-laptop-smartphone-composition_40505824.htm#query=laptop%20phone&position=2&from_view=keyword&track=ais&uuid=ec94706f-feeb-426f-b343-2db8ed620116">Cover image by Vectonauta</a> on Freepik
</small>
