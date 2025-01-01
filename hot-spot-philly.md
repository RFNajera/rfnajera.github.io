## Hot Spots and Cold Spots of Criminal Homicides in Philadelphia (2023)

Understanding crime patterns is essential for targeted public health interventions and policymaking. This analysis focuses on criminal homicides in Philadelphia during 2023, leveraging geospatial data and census statistics to explore relationships between crime, income, and spatial clusters.

---

### Libraries and Data Preparation

First, we ensured all necessary libraries were loaded:

```r
packages <- c("tidyverse", "tidycensus", "sf", "tmap", "tmaptools", "RColorBrewer", "spdep")
sapply(packages, function(p) {
  if (!require(p, character.only = TRUE)) {
    install.packages(p)
    library(p, character.only = TRUE)
  }
})
```

Next, the crime data for 2023 was loaded and filtered for homicides:

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

Census data for population and median household income was retrieved:

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

---

### Visualizing Homicides

We created maps to visualize the distribution of homicides:

#### Homicide Locations

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

#### Income and Homicides

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

---

### Spatial Autocorrelation

Spatial analysis tools like Moran's I help us detect clusters of high or low homicide rates.

#### Local Moran's I

```r
neighbors <- poly2nb(map_data_sp, queen = TRUE)
weights <- nb2listw(neighbors, style = "W", zero.policy = TRUE)
local_morans <- localmoran(map_data2$Rate, weights)

map_data2$local_morans_i <- local_morans[, 1]
```

We visualized the Moran's I values:

```r
tm_shape(map_data2) +
  tm_fill(
    col = "local_morans_i",
    palette = "-RdBu",
    title = "Local Moran's I",
    style = "quantile"
  ) +
  tm_borders() +
  tm_layout(main.title = "Local Moran's I for Homicide Rate (2023)",
            legend.outside = TRUE) +
  tm_compass() +
  tm_scale_bar()
```

---

### Income and Homicide Rate Correlation

A scatterplot was used to examine the relationship between median household income and homicide rate:

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

---

### Conclusion

This analysis highlights the spatial distribution of homicides in Philadelphia and their correlation with socioeconomic factors. Such insights are vital for targeted interventions and equitable resource allocation.

---

### Data Source

The data used in this analysis was obtained from the [OpenDataPhilly portal](https://opendataphilly.org/).

---

### Further Reading

You can find the original blog post on Medium: [Hot Spots and Cold Spots of Criminal Homicides in Philadelphia (2023)](https://medium.com/@epiren/hot-spots-and-cold-spots-of-criminal-homicides-in-philadelphia-2023-d8a7851cb16e).

[Back Home](./)
