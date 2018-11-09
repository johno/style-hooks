# :flags: style-hooks

> CSS-in-Hooks

:warning: This is an experiment with React Hooks (alpha) to implement a subset of CSS-in-JS.
Please don't use this in production, styled-components and emotion are much better for that.

## Why?

I've been pondering a lighter-weight CSS-in-JS for a while, when I saw Hooks announced it seemed like a nice new API to give something new a try.
This is intended as a project to learn how Hooks work while scratching an itch regarding some of my dissatisfaction with existing CSS-in-JS solutions.

If we were to get really weird, we could potentially perform analysis on apps using this API at compile time and generate static CSS for components.

## Goals

Firstly, I'd like to continue working on this project and measuring the performance to see how it affects performance in the browser and overall bundle sizes.

Natively tie into styled-system.

## Installation

```
npm i -S style-hooks react@next react-dom@next
```

## Usage



## Related

The following talks and projects have served as an inspiration and/or resource for this project.

- https://github.com/ryanflorence/react-conf-2018
- cxs
- nano-style
- styled-system
- the-platform
- glamor
- emotion
- styled-components