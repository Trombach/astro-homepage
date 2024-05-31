---
title: ResearchHub & HubGraph
description: A content focussed website for researchers
meta:
  tags: ["Front-end"]
  tools:
    [
      "Angular",
      "Typescript",
      "Sass",
      "AWS Lambda",
      "Contentful",
      "elasticsearch",
    ]
  repoLink: https://github.com/UoA-eResearch/hub-stack
cover:
  image: ./images/hub-logo.png
  alt: ResearchHub logo
---

<!--markdownlint-disable MD033-->

During my time working for the Centre for eResearch at the University of Auckland I contributed significantly to the
[ResearchHub](https://research-hub.auckland.ac.nz) project. The project aimed to develop a modern content platform for
researchers at the university, that would speed up access to information critical for the researchers success. For a
period of about a year I was the ResearchHub's main front-end developer and I helped the team with releasing and
improving version 2.0.

Besides general refactoring and elimination of technological debt, I worked on a few major features which are
explained in more detail in this article.

## Search

The ResearchHub's content model allows for grouping of articles in topics and subtopics. While this enables some level
of discoverability, search is always an important tool to enable content access. When I joined the ResearchHub team
basic search functionality was available, however, it was limited to the landing page and lacked filtering capabilities.

I implemented a redesign, which enabled global search from the navigation bar and standardised search URLs such they
could be shared with other people. To improve the filter UX I added a mega menu which allowed for quick filtering by the
many categories and sections the content model provided.

![ResearchHub search in navigation bar with filter mega menu.](@images/rh-search-menu.png)

I made further contributions to the search results page, for instance, I updated the result loading to use
infinite scrolling instead of pagination using RXJS and `IntersectionObserver`.

## Data Analysis

Contentful CMS allows content writers to create links between different pages. On the ResearchHub this is used to
suggest other topics of interests to the visitor. This can result in a complex mesh like content structure representable
by a graph that can be hard to keep track of. Another problem content centred pages commonly face is how to ensure that
content is as fresh as possible. This problem isn't easily solvable with technology, as humans are important for writing
and updating content pages. However, a technical solution can assist content writers and managers to pinpoint areas that
require attention.

### Content Reporting

To tackle these problems, I devised a [reporting
system](https://github.com/UoA-eResearch/research-hub-contentful-reporting) that fetches every content page from
Contentful and generates CSV files collecting information about the freshness of the content and its degree of
connectivity. I achieved this using an AWS Lambda serverless function which periodically fetched content from Contentful
using the GraphQL API and then uploaded the results to AWS S3 and Google Sheets. To make it easier for content managers
to analyse and understand the data, a Google data studio dashboard was also created.

### HubGraph

The second function of the reporting lambda was to aid with visualising the graph structure of the content. I used the
[force-graph](https://github.com/vasturiano/force-graph) library to visualise the data created by the reporting feature.
This library assists in creating a force-directed graph which is a very common way of visualising arbitrary graph
structures.

![Graph visualisation of ResearchHub content.](@images/rh-graph.png)

The graph is fully interactive and displays information about an articles connections and links to its Contentful pages
for easy access to editing.
