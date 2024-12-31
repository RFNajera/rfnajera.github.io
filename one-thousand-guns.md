# How Many Guns Were Within 1,000 Feet of Schools in Baltimore in 2018?

An Analysis of Open Data on Gun Violence in Baltimore Reveals a Staggering Number of Gun Crimes Very Close to Some of the Most Vulnerable of the Charmed City’s Residents

**Author**: René F. Najera, MPH, DrPH  
**Originally Published**: [December 13, 2019](https://medium.com/towards-data-science/how-many-guns-were-within-1-000-feet-of-schools-in-baltimore-in-2018-16deb60ff9db){:target="_blank"}. 

## Introduction

According to the Gun-Free School Zones Act of 1990, people may not possess a gun within 1,000 feet of a school if the gun traveled across state lines (regulated by interstate commerce) and if the person carrying the gun is unlicensed. This analysis, initially part of my dissertation but omitted due to constraints, revisits 2018 data on firearm homicides near schools in Baltimore.

---

## The Data

### Source
The data is sourced from the Baltimore City Open Data portal:

- [Baltimore City Open Data Portal](https://data.baltimorecity.gov/){:target="_blank"}.

### Summary
A total of 5,343 incidents involving firearms with location information were reported in 2018:

| Type of Crime          | Count |
|------------------------|-------|
| Aggravated Assault     | 1,474 |
| Homicide               | 273   |
| Robbery – Carjacking  | 337   |
| Robbery – Commercial  | 533   |
| Robbery – Residence   | 121   |
| Robbery – Street      | 1,928 |
| Shooting               | 677   |

These data include longitude and latitude for mapping and analysis.

---

## Methods

### Libraries Used

```r
# Load required libraries with annotations ----
library(sf)          # Simple Features for spatial data
library(dplyr)       # Data manipulation
library(tmap)        # Thematic maps
library(readr)       # Reading data files
```

### Data Import and Cleaning

```r
# Import the data ----
crimes <- read_csv("data/gun_crimes_2018.csv")

# Filter to retain rows with valid latitude and longitude ----
crimes <- crimes %>% filter(!is.na(Latitude) & !is.na(Longitude))

# Load Community Statistical Areas (CSAs) and school shapefiles ----
csas <- st_read("data/community_statistical_areas.shp")
schools <- st_read("data/schools.shp")

# Convert crimes data to spatial points ----
crimes_sf <- st_as_sf(crimes, coords = c("Longitude", "Latitude"), crs = 4326)
```

### Coordinate Reference System (CRS) Alignment

```r
# Ensure all spatial data layers use the same CRS ----
csas <- st_transform(csas, crs = st_crs(crimes_sf))
schools <- st_transform(schools, crs = st_crs(crimes_sf))
```

---

## Mapping

### Map of Firearm Crimes

```r
# Create a map of firearm crimes ----
tmap_mode("plot")
map_crimes <- tm_shape(csas) +
  tm_borders() +
  tm_shape(crimes_sf) +
  tm_dots("CrimeType", palette = "Set1", size = 0.1, title = "Crime Type") +
  tm_layout(
    title = "Firearm Crimes in Baltimore, 2018",
    legend.position = c("left", "bottom")
  )

tmap_save(map_crimes, "output/firearm_crimes_map.png", dpi = 300)
```

### Map of Schools

```r
# Create a map of school locations ----
map_schools <- tm_shape(csas) +
  tm_borders() +
  tm_shape(schools) +
  tm_dots(col = "red", size = 0.2, title = "Schools") +
  tm_layout(
    title = "School Locations in Baltimore, 2018",
    legend.position = c("left", "bottom")
  )

tmap_save(map_schools, "output/schools_map.png", dpi = 300)
```

### Combined Map: Crimes and Schools

```r
# Create a combined map of crimes and schools ----
map_combined <- tm_shape(csas) +
  tm_borders() +
  tm_shape(schools) +
  tm_dots(col = "red", size = 0.2, title = "Schools") +
  tm_shape(crimes_sf) +
  tm_dots("CrimeType", palette = "Set1", size = 0.1, title = "Crime Type") +
  tm_layout(
    title = "Firearm Crimes and Schools in Baltimore, 2018",
    legend.position = c("left", "bottom")
  )

tmap_save(map_combined, "output/combined_map.png", dpi = 300)
```

---

## Analysis

### Creating Buffers

```r
# Create 1,000-ft buffers around schools ----
# Note: 1,000 feet is approximately 304.8 meters
buffers <- st_buffer(schools, dist = 304.8)

# Plot the buffers ----
map_buffers <- tm_shape(csas) +
  tm_borders() +
  tm_shape(buffers) +
  tm_borders(col = "blue") +
  tm_shape(schools) +
  tm_dots(col = "red", size = 0.2, title = "Schools") +
  tm_layout(
    title = "1,000-ft Buffers Around Schools in Baltimore, 2018",
    legend.position = c("left", "bottom")
  )

tmap_save(map_buffers, "output/buffers_map.png", dpi = 300)
```

### Joining Crimes with Buffers

```r
# Identify crimes within the buffers ----
crimes_in_buffers <- st_join(crimes_sf, buffers, left = FALSE)

# Count crimes per school ----
crime_counts <- crimes_in_buffers %>%
  group_by(SchoolName) %>%
  summarise(CrimeCount = n()) %>%
  arrange(desc(CrimeCount))

# Save results ----
write_csv(crime_counts, "output/crime_counts_by_school.csv")
```

---

## Findings

- The school with the highest number of firearm-related crimes within 1,000 feet was **William Paca Elementary**, with **81 incidents**.

---

## Further Analysis

Consider exploring:

1. **Socioeconomic Analysis**: Use regression models to explore predictors of firearm crimes near schools.
2. **Time-Based Analysis**: Compare crimes during school hours versus after hours.
3. **Buffer Adjustments**: Explore alternative buffer distances to identify trends.

---

## References

- [Baltimore City Open Data Portal](https://data.baltimorecity.gov/){:target="_blank"}.
- [CRAN Spatial Packages](https://cran.r-project.org/){:target="_blank"}.

---

[Back Home](./)
