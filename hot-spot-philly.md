---

layout: project
title: "Hot Spots and Cold Spots of Criminal Homicides in Philadelphia (2023)"
permalink: /philly-homicides-2023/
description: "A geospatial analysis of criminal homicides in Philadelphia in 2023, exploring spatial clusters and the relationship between homicide rates and income."
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

<div class="project-hero">
  <div class="project-badge">Geospatial analysis • Philadelphia • 2023</div>
  <h1>{{ page.title }}</h1>
  <p class="project-subtitle">
    A spatial analysis of criminal homicides in Philadelphia using 2023 incident data, census statistics, and measures of spatial autocorrelation.
  </p>
  <div class="project-meta">
    <span><strong>Author:</strong> René F. Najera, MPH, DrPH</span>
    <span><strong>Originally published:</strong> <a href="https://medium.com/@epiren/hot-spots-and-cold-spots-of-criminal-homicides-in-philadelphia-2023-d8a7851cb16e" target="_blank" rel="noopener noreferrer">Medium</a></span>
  </div>
</div>

## Introduction

Understanding where homicides happen, and whether those patterns cluster in meaningful ways, is an important part of public health analysis. Violence is not randomly distributed across space, and neither are the conditions that shape it.

This project looks at criminal homicides in Philadelphia during 2023 using geospatial methods and census data. The goal was not just to map where homicides occurred, but also to explore whether homicide patterns were associated with neighborhood income and whether statistically meaningful hot spots and cold spots could be identified.

In other words, this is part crime map, part spatial epidemiology, and part reminder that place matters.

## Data and Preparation

The analysis combined homicide incident data with census tract-level population and median household income data.

### Libraries Used

First, I loaded the packages needed for data handling, census retrieval, spatial analysis, and mapping.

```r
packages <- c("tidyverse", "tidycensus", "sf", "tmap", "tmaptools", "RColorBrewer", "spdep")
sapply(packages, function(p) {
  if (!require(p, character.only = TRUE)) {
    install.packages(p)
    library(p, character.only = TRUE)
  }
})
```

### Crime Data

Next, I loaded the Philadelphia crime data for 2023 and filtered it to include only criminal homicides. One record also needed a manual latitude and longitude correction before converting the data to a spatial object.

```r
data_2023 <- read_csv("Crime Incidents Part 1 2.csv") %>%
  filter(text_general_code == "Homicide - Criminal") %>%
  mutate(
    lat = ifelse(objectid == 13739372, 40.053064, lat),
    lng = ifelse(objectid == 13739372, -75.1515456, lng)
  ) %>%
  st_as_sf(coords = c("lng", "lat")) %>%
  st_set_crs(4326)
```

### Census Data

To provide neighborhood context, I retrieved census tract-level data for total population and median household income in Philadelphia County.

```r
philadelphia_2022 <- get_acs(
  geography = "tract",
  variables = c("B01003_001", "B19013_001"),
  state = "PA",
  county = "Philadelphia",
  geometry = TRUE,
  year = 2022
) %>%
  st_set_crs(4326) %>%
  rename(population = "B01003_001", medianhhi = "B19013_001")
```

Using 2022 ACS data alongside 2023 homicide incidents is a practical compromise. Census estimates rarely line up perfectly with event-year data, but they still provide a useful snapshot of neighborhood characteristics.

## Visualizing Homicides

Before moving into formal spatial statistics, I created maps to get a basic visual sense of the distribution of homicides across the city.

### Homicide Locations

This first map shows the point locations of reported criminal homicides in Philadelphia during 2023.

```r
tm_shape(philadelphia_2022) +
  tm_borders() +
  tm_shape(data_2023) +
  tm_dots() +
  tm_layout(
    legend.outside = TRUE,
    main.title = "Location of Reported Criminal Homicides, Philadelphia, 2023",
    main.title.size = 0.8
  ) +
  tm_compass() +
  tm_scale_bar()
```

Even without formal clustering statistics, the visual pattern suggests that homicides are not evenly scattered across the city.

### Income and Homicides

The next map overlays homicide locations on census tract median household income.

```r
tm_shape(philadelphia_2022) +
  tm_fill("medianhhi", title = "Median Household Income") +
  tm_shape(data_2023) +
  tm_dots(title = "Homicides") +
  tm_layout(
    legend.outside = TRUE,
    main.title = "Median Household Income and Homicides",
    main.title.size = 0.8
  ) +
  tm_compass() +
  tm_scale_bar()
```

This map does not prove a causal relationship, but it does make it easier to see whether homicide locations appear to concentrate in lower-income parts of the city.

## Spatial Autocorrelation

To move beyond visual impression, I used Local Moran's I to identify spatial clustering.

Spatial autocorrelation asks a basic question: are nearby areas more similar to one another than we would expect by chance? In this case, the outcome of interest was homicide rate.

### Local Moran's I

The first step was to define neighborhood relationships among census tracts and create spatial weights.

```r
neighbors <- poly2nb(map_data_sp, queen = TRUE)
weights <- nb2listw(neighbors, style = "W", zero.policy = TRUE)
local_morans <- localmoran(map_data2$Rate, weights)

map_data2$local_morans_i <- local_morans[, 1]
```

### Mapping Local Moran's I

Once Local Moran's I values were calculated, they were mapped to show where homicide rates appeared to cluster.

```r
tm_shape(map_data2) +
  tm_fill(
    col = "local_morans_i",
    palette = "-RdBu",
    title = "Local Moran's I",
    style = "quantile"
  ) +
  tm_borders() +
  tm_layout(
    main.title = "Local Moran's I for Homicide Rate (2023)",
    legend.outside = TRUE
  ) +
  tm_compass() +
  tm_scale_bar()
```

Areas with higher positive values suggest spatial clustering, while lower or negative values suggest less similarity with neighboring areas. In plain language, this helps identify where homicide rates are part of a broader local pattern rather than isolated events.

## Income and Homicide Rate

Because neighborhood conditions often shape violence risk, I also looked at the relationship between median household income and homicide rate.

### Scatterplot of Income and Homicide Rate

```r
map_data %>%
  filter(!is.na(medianhhi)) %>%
  ggplot(aes(x = medianhhi, y = Rate)) +
  geom_point() +
  geom_smooth(method = "lm", color = "red", se = FALSE) +
  labs(
    x = "Median Household Income",
    y = "Homicide Rate per 10,000 Residents",
    title = "Scatterplot of Homicide Rate vs. Median Household Income (2023)"
  )
```

This plot provides a simple visual way to assess whether homicide rates tend to be higher in lower-income tracts. As always, a trend line is not a complete explanation. Income may be associated with homicide rate, but it is also tied up with many other structural factors, including housing conditions, disinvestment, segregation, policing, education, and access to resources.

## Why This Matters

This kind of analysis is useful because it shifts the conversation away from individual events and toward broader patterns.

Homicides are tragic at the level of the individual and the family, but they are also population-level events shaped by the environments in which people live. Mapping where homicide rates cluster, and how those clusters relate to socioeconomic conditions, helps public health professionals and policymakers think more clearly about prevention.

If we want targeted interventions, equitable resource allocation, and policies that respond to community conditions rather than stereotypes, this kind of spatial analysis is one place to start.

## Conclusion

This analysis shows that criminal homicides in Philadelphia during 2023 were spatially patterned and that those patterns could be examined in relation to neighborhood income and local clustering.

The point is not that maps solve violence. They do not. But maps, paired with census data and spatial statistics, can make hidden patterns more visible. And visible patterns are easier to study, question, and address.

## Data Source

The data used in this analysis came from [OpenDataPhilly](https://opendataphilly.org/).

## Further Reading

The original version of this piece was published on Medium: [Hot Spots and Cold Spots of Criminal Homicides in Philadelphia (2023)](https://medium.com/@epiren/hot-spots-and-cold-spots-of-criminal-homicides-in-philadelphia-2023-d8a7851cb16e)

[← Back Home](./)
