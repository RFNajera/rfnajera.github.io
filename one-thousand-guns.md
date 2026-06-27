---
layout: project
title: "How Many Guns Were Within 1,000 Feet of Schools in Baltimore in 2018?"
permalink: /one-thousand-guns/
description: "An analysis of firearm crimes near schools in Baltimore using 2018 open data."
---

<div class="project-hero">
  <div class="project-badge">Geospatial analysis • Baltimore • 2018</div>
  <h1>{{ page.title }}</h1>
  <p class="project-subtitle">
    An analysis of open data on gun violence in Baltimore found a disturbing number of firearm-related crimes within 1,000 feet of schools.
  </p>
  <div class="project-meta">
    <span><strong>Author:</strong> René F. Najera, MPH, DrPH</span>
    <span><strong>Originally published:</strong> <a href="https://medium.com/towards-data-science/how-many-guns-were-within-1-000-feet-of-schools-in-baltimore-in-2018-16deb60ff9db" target="_blank" rel="noopener noreferrer">December 13, 2019</a></span>
  </div>
</div>

## Introduction

How close was gun violence to schools in Baltimore in 2018?

That was the question behind this analysis. The project grew out of work I did during my doctoral research. It did not make it into the final dissertation, mostly because dissertations, like closets and email inboxes, have limits. But the question stayed with me.

Under the Gun-Free School Zones Act of 1990, certain firearm possession within 1,000 feet of a school is prohibited under specific federal conditions, particularly when interstate commerce is involved and the person is unlicensed. Legal details aside, the broader public health question is easier to understand: what does it mean when firearm-related crimes happen within walking distance of children and schools?

Using open data from Baltimore City, I looked at firearm-related crimes in 2018 and mapped how many occurred within 1,000 feet of school locations across the city.

## The Data

### Source

The data came from the [Baltimore City Open Data Portal](https://data.baltimorecity.gov/), which provides public access to crime and geographic datasets.

### Summary

A total of 5,343 firearm-related incidents with usable location information were reported in 2018.

| Type of Crime | Count |
|---|---:|
| Aggravated Assault | 1,474 |
| Homicide | 273 |
| Robbery – Carjacking | 337 |
| Robbery – Commercial | 533 |
| Robbery – Residence | 121 |
| Robbery – Street | 1,928 |
| Shooting | 677 |

These records included latitude and longitude, which made it possible to map the incidents and measure how close they were to schools.

## Methods

To answer the question, I used spatial analysis in R. The general workflow was straightforward:

1. import firearm crime data
2. remove records without valid coordinates
3. load school and community area shapefiles
4. convert the crime data into spatial points
5. align all layers to the same coordinate reference system
6. create 1,000-foot buffers around schools
7. identify firearm crimes that fell inside those buffers
8. count how many incidents were associated with each school area

### Libraries Used

```r
library(tidyverse)   # Data manipulation and visualization (dplyr, readr, ggplot2, etc.)
library(sf)          # Simple Features for spatial data
library(tmap)        # Thematic maps (static and interactive)
library(tigris)      # Census geographies and boundary files
library(raster)      # Raster and spatial helpers
```

### Data Import and Cleaning

```r
# Load the boundary, water, and school shapefiles
baltimore.shape  <- st_read("Total_Population", "Total_Population")
water.shape      <- st_read("Water", "water")
schools          <- st_read("BCPSS_Schools", "BCPSS_Schools")

# Import the firearm crime data, keep records with valid coordinates,
# and convert to an sf object in one pipeline
crimes_sf <- read_csv("data/gun_crimes_2018.csv") %>%
  filter(!is.na(Latitude) & !is.na(Longitude)) %>%
  dplyr::select(CrimeType, Longitude, Latitude) %>%
  st_as_sf(
    coords = c("Longitude", "Latitude"),
    crs    = "+proj=longlat +datum=WGS84"
  )

# Quick sanity check that the points read in correctly
ggplot() +
  geom_sf(data = crimes_sf) +
  theme_minimal()
```

### Coordinate Reference System Alignment

Before doing any spatial operations, all layers needed to use the same coordinate reference system.

```r
# Ensure all spatial data layers use the same CRS as the crime points
baltimore.shape <- st_transform(baltimore.shape, crs = st_crs(crimes_sf))
water.shape     <- st_transform(water.shape,     crs = st_crs(crimes_sf))
schools         <- st_transform(schools,         crs = st_crs(crimes_sf))
```

## Mapping

I created several maps to understand the geographic pattern of the data before moving into the buffer analysis.

### Map of Firearm Crimes

```r
tmap_mode("plot")

map_crimes <- tm_shape(baltimore.shape) +
  tm_borders() +
  tm_shape(crimes_sf) +
  tm_dots("CrimeType", palette = "Set1", size = 0.05, title = "Crime Type") +
  tm_layout(
    main.title      = "Firearm Crimes in Baltimore, 2018",
    main.title.size = 1,
    legend.outside  = TRUE
  ) +
  tm_compass(type = "4star", position = c("left", "bottom")) +
  tm_scale_bar(
    text.size   = 0.5,
    color.dark  = "black",
    color.light = "yellow",
    lwd         = 1,
    position    = c("left", "bottom")
  ) +
  tmap_options(unit = "mi")

tmap_save(map_crimes, "output/firearm_crimes_map.png", dpi = 300)
```

### Map of Schools

```r
map_schools <- tm_shape(baltimore.shape) +
  tm_borders() +
  tm_shape(schools) +
  tm_symbols(col = "orange", shape = 24, size = 0.05) +
  tm_layout(
    main.title      = "School Locations in Baltimore, 2018",
    main.title.size = 1,
    legend.outside  = TRUE
  ) +
  tm_add_legend("symbol", col = "orange", shape = 17, size = 0.5, labels = "School") +
  tm_compass(type = "4star", position = c("left", "bottom")) +
  tm_scale_bar(
    text.size   = 0.5,
    color.dark  = "black",
    color.light = "yellow",
    lwd         = 1,
    position    = c("left", "bottom")
  ) +
  tmap_options(unit = "mi")

tmap_save(map_schools, "output/schools_map.png", dpi = 300)
```

### Combined Map of Crimes and Schools

```r
map_combined <- tm_shape(baltimore.shape) +
  tm_borders() +
  tm_shape(crimes_sf) +
  tm_dots("CrimeType", palette = "Set1", size = 0.05, title = "Crime Type") +
  tm_shape(schools) +
  tm_symbols(col = "orange", shape = 24, size = 0.05) +
  tm_shape(water.shape) +
  tm_polygons(col = "blue") +
  tm_layout(
    main.title      = "Firearm Crimes and Schools in Baltimore, 2018",
    main.title.size = 1,
    legend.outside  = TRUE
  ) +
  tm_add_legend("symbol", col = "orange", shape = 17, size = 0.5, labels = "School") +
  tm_add_legend("fill",   col = "blue",   size = 0.5, labels = "Body of Water") +
  tm_compass(type = "4star", position = c("left", "bottom")) +
  tm_scale_bar(
    text.size   = 0.5,
    color.dark  = "black",
    color.light = "yellow",
    lwd         = 1,
    position    = c("left", "bottom")
  ) +
  tmap_options(unit = "mi")

tmap_save(map_combined, "output/combined_map.png", dpi = 300)
```

These maps made the core problem visually obvious. Firearm-related crimes were not isolated in some distant corner of the city. Many were occurring in close proximity to places where children learn, gather, and move through daily life.

## Buffer Analysis

The next step was to create a 1,000-foot zone around each school and identify which firearm-related crimes occurred inside those zones.

### Creating Buffers Around Schools

Because the legal and policy standard often discussed is 1,000 feet, I used that distance for the analysis. In metric terms, that is about 304.8 meters.

```r
# Create 1,000-foot (304.8 m) buffers around schools, then
# return them to the lon/lat CRS used by the other layers
buffers <- st_buffer(schools, dist = 304.8) %>%
  st_transform(crs = "+proj=longlat +datum=WGS84")

# Quick check that the buffers were created correctly
ggplot() +
  geom_sf(data = buffers) +
  theme_minimal()

# Plot the buffers over the city, schools, and crimes
map_buffers <- tm_shape(baltimore.shape) +
  tm_borders() +
  tm_shape(crimes_sf) +
  tm_dots(col = "black", size = 0.025) +
  tm_shape(schools) +
  tm_symbols(col = "orange", shape = 24, size = 0.05) +
  tm_shape(buffers) +
  tm_borders(col = "blue") +
  tm_layout(
    main.title      = "1,000-foot Buffers Around Schools in Baltimore, 2018",
    main.title.size = 1,
    legend.outside  = TRUE
  ) +
  tm_add_legend("symbol", col = "orange", shape = 17, size = 0.5, labels = "School") +
  tm_add_legend("line",   col = "blue",   size = 0.5, labels = "1,000-ft Buffer") +
  tm_add_legend("symbol", col = "black",  shape = 21, size = 0.5, labels = "Firearm Crime") +
  tm_compass(type = "4star", position = c("left", "bottom")) +
  tm_scale_bar(
    text.size   = 0.5,
    color.dark  = "black",
    color.light = "yellow",
    lwd         = 1,
    position    = c("left", "bottom")
  ) +
  tmap_options(unit = "mi")

tmap_save(map_buffers, "output/buffers_map.png", dpi = 300)
```

### Joining Crimes to School Buffers

```r
# Spatially join the crime points to the school buffers.
# Points that fall inside a buffer pick up that school's attributes;
# points outside every buffer get NA for the school name.
crime.points <- st_join(crimes_sf, buffers)

# Keep only the crimes that landed inside a buffer (i.e., a named school)
school.crimes <- crime.points %>%
  filter(!is.na(name))

# Count crimes per school
crime_counts <- school.crimes %>%
  st_drop_geometry() %>%
  group_by(name) %>%
  summarise(CrimeCount = n()) %>%
  arrange(desc(CrimeCount))

# Save results
write_csv(crime_counts, "output/crime_counts_by_school.csv")
```

Finally, switching `tmap` into interactive mode makes it possible to pan, zoom, and click individual schools and crime points to inspect each location in more detail.

```r
# Switch to an interactive (leaflet-backed) map and redraw the buffer map
tmap_mode("view")
map_buffers
```

## Findings

The most striking result was this: **William Paca Elementary** had the highest number of firearm-related crimes within 1,000 feet, with **81 incidents**.

That number does not mean 81 incidents happened on school grounds. It means that the surrounding environment, within a distance that is easily walkable, experienced a large number of firearm-related crimes over the course of a single year.

From a public health perspective, that matters. Exposure to violence is not only about direct victimization. It also shapes stress, fear, neighborhood conditions, school experience, and the broader sense of safety that children and families carry with them every day.

## Why This Matters

This project sits at the intersection of violence prevention, neighborhood context, and spatial epidemiology.

Schools do not exist apart from their surroundings. They are embedded in communities, and the conditions around them affect students long before anyone starts talking about academic performance or school climate. Mapping firearm-related crimes near schools helps make those surrounding conditions visible.

It also raises useful questions for prevention. Are these patterns associated with neighborhood disadvantage? Are certain schools more exposed because of broader community conditions? Are incidents clustered at particular times of day? Those are all questions that spatial analysis can help explore.

## Further Analysis

This project could be extended in several useful directions.

1. **Socioeconomic analysis**  
   Neighborhood-level indicators could be incorporated into regression models to explore which structural factors are most strongly associated with firearm crimes near schools.

2. **Time-based analysis**  
   Crimes could be compared by time of day, school hours versus after hours, or weekday versus weekend patterns.

3. **Alternative buffer distances**  
   Additional analyses could examine whether the patterns hold at smaller or larger distances, such as 500 feet or a quarter mile.

4. **School-level context**  
   Future work could examine whether school type, enrollment, or neighborhood characteristics are associated with differences in nearby firearm crime counts.

## References

- [Baltimore City Open Data Portal](https://data.baltimorecity.gov/)
- [CRAN Spatial Packages](https://cran.r-project.org/)

[← Back Home](https://rfnajera.github.io/)

