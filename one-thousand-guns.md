---
layout: project
title: "How Many Guns Were Within 1,000 Feet of Schools in Baltimore in 2018?"
permalink: /guns-baltimore-2018/
description: "An analysis of open data on firearm crimes near schools in Baltimore in 2018."
---

<div class="project-hero">
  <div class="project-badge">Geospatial analysis • Baltimore • 2018</div>
  <h1>{{ page.title }}</h1>
  <p class="project-subtitle">
    An analysis of open data on gun violence in Baltimore reveals a staggering number of gun crimes
    very close to some of the city’s most vulnerable residents.
  </p>
  <div class="project-meta">
    <span><strong>Author:</strong> René F. Najera, MPH, DrPH</span>
    <span><strong>Originally published:</strong> <a href="https://medium.com/towards-data-science/how-many-guns-were-within-1-000-feet-of-schools-in-baltimore-in-2018-16deb60ff9db" target="_blank" rel="noopener noreferrer">December 13, 2019</a></span>
  </div>
</div>

## Introduction

According to the Gun-Free School Zones Act of 1990, people may not possess a gun within 1,000 feet of a school if the gun traveled across state lines and if the person carrying the gun is unlicensed. This analysis, initially part of my dissertation but omitted due to space constraints, revisits 2018 data on firearm crimes near schools in Baltimore.

## The Data

### Source

- [Baltimore City Open Data Portal](https://data.baltimorecity.gov/)

### Summary

A total of 5,343 incidents involving firearms with location information were reported in 2018:

| Type of Crime | Count |
|---|---:|
| Aggravated Assault | 1,474 |
| Homicide | 273 |
| Robbery – Carjacking | 337 |
| Robbery – Commercial | 533 |
| Robbery – Residence | 121 |
| Robbery – Street | 1,928 |
| Shooting | 677 |

These data include longitude and latitude for mapping and analysis.

## Methods

### Libraries Used

```r
# Load required libraries with annotations ----
library(sf)          # Simple Features for spatial data
library(dplyr)       # Data manipulation
library(tmap)        # Thematic maps
library(readr)       # Reading data files
