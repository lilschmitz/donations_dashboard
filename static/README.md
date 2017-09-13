# Project 2 Data Visualization Dashboard (US SCHOOL Donations Dashboard)

This project is a data visualization dashboard exercise that outlines various datapoints from the DonorsChoose.org dataset (55000 records were used as a subset) in interactive cross-linked charts based on non-relational database.
The DonorsChoose.org is a NPO/NGO non-profit organization/non-governmental organization managing an collecting donations from individuals for public school's projects' benefits. Their data is accessible to the public users and as mentioned before a subset was used here. 


# Site Outline 


 The outline will be described from top to bottom as this is a single page dashboard. There is an embedded info function that is guiding the users through the various charts step by step and the outline description will follow this path. 


## Navbar 

Screenshot avaible here:
[Navbar](https://www.dropbox.com/s/xs6ok40khr8cxlz/Screenshot%202017-09-12%2013.49.38.png?dl=0)

Title of the Dashboard and on the right two buttons. One 'Start Tour' is introjs based functionality/plug in - of a guided tour of the dashboard and a user can navigate from chart to chart to understand the background and interaction. 
The other button is a 'Reset All' button a dc.js method that allows the refresh of all graphs. The user will find similar buttons in other charts across the dashboard. This is also the way to reset set filters and if a subset of data was selected.


## First Row

Screenshot availabe here: 
[First Row](https://www.dropbox.com/s/7trih9l4s6tpzzu/Screenshot%202017-09-12%2013.49.44.png?dl=0)

The first row consist of four elements - the 'Information', 'Data Selection' and to metric boxes 'Number of Donations' and 'Total Donations USD'. 

### 'Information' - shows the current date, a link to the DonorsOrg Website from which the data subset was taken, a link to this dashboards overall code in github and finally the social media links from the dashboards author.

### 'Data Selection' - shows a live record count which is automatically adjusted if filters are used or interactive functionality of charts are clicked. Below the record count are four drop down selection filters based on four data points and aggregated at donation count against this datapoint and its attributes. 

### 'Number of Donations' is an overall count of lines donations made. Probably not absolutely useful/meaningful but this dashboard has to be regarded as a demonstration of code functionality and author's ability to integrate the code.

### 'Total Donations USD' this is the aggregated amount in US dollars of donations made in millions.


## Middle Section 

Screenshot availabe here: 
[Three middle Charts](https://www.dropbox.com/s/1vuy4nvvwlcn4c0/Screenshot%202017-09-12%2013.49.55.png?dl=0)

1st chart 'Number of Donations' shows the number of donations made over the course of the years in a line chart. This chart has a range functionality where the user can select a range of years when clicking into the chart. It also has a drop down filter option - to select specific states and the number of donations. 

The second chart on the far right - 'Origin States of Donations' is a row chart that shows the dollar count of donations made per US school state. 

The third chart, below the first chart - 'Donation State Map' is a geojson map that is interactive and the darker shaded the blue the higher the count of donations made in a particular state. 


## Second Row

[Second Row](https://www.dropbox.com/s/31vwenfodv0bzf2/Screenshot%202017-09-12%2013.50.04.png?dl=0)

This row consists of 4 different charts - pie chart 'Funding Status', row chart 'Poverty Level', row chart 'Area View' and lastly a row chart 'Resources Type'. These datapoints had been reflected in the selection drop downs previously. Again all four of them are interactive and they all have a 'reset' button on the top right corner in order to reset any selection made. 

## Data Table

Screenshot availabe here: 
[Data Table - top](https://www.dropbox.com/s/t20lj1f83x2dt03/Screenshot%202017-09-12%2013.50.16.png?dl=0)

This data table is based on the Dynatable plug in and this will be explained in more details in the technology stack section. It comes with features that can be enabled. In this instance the top shows a drop down that allows to select records in 2x increments -ish (50, 100, 200, 500, 1000, 2000, 5000, 10000) and on the right side it has a dynamic search window. Please beware that only string data can be searched for. In future releases of this dashboard numbers should be dynamically searchable as well. Each columns's title is enabled to be filtered ascending and descending when clicked.

[Data Table - bottom](https://www.dropbox.com/s/u5wfhkzrjszo579/Screenshot%202017-09-12%2013.50.24.png?dl=0)

At the bottom the Dynatable features are the record count display and on the far right the paging option. 



# Built || Technology 

## Database 

A subset from DONORS ORG was downloaded as a csv and then stored in MongoDB in a JSON format which is called in the Heroku deployment using mLab MongoDB.

## Project Structure 


[Project Structure](https://www.dropbox.com/s/hvd0plj1hfq5vok/Screenshot%202017-09-13%2013.23.23.png?dl=0)

Overall project name "DV_USA_Donations_KS"
holds: 
## - static

### - css
    - custom.css => custom styling to adjust layout/height/etc

### - geojson
    - us-states.json

### - js
    - graph.js => Python code for the graphs that use dc and d3 methods to instantiate the graphs and ultimately render them in html using id and class references
      See below for detailed outline! 


## - lib
   ### - css
       - bootstrap.min.css
       - dc.css
       - introjs.css
       - jquery.dynatable.css
       - keen-dashboards.css

   ### - js
       - d3.js
       - dc.js
       - intro.js
       - jquery.js
       - jquery.dynatable.js
       - keen.min.js
       - queue.js

 ## - templates
       - index.html => core HTML one pager that outlines the elements of the dashboard which is complemented by the plug ins in css/js for keen dashboards, jquery dynatable js and css, bootstrap and ultimately the d3 dc for the graph visualizations based on jquery and crossfilter backend code.

## - school_donations.py => python code that sets up the app route, connection, data call, field import 

## - fix_usa_ids.py => fixer python script to correct error in geojson for us-states

## - requirements.txt => outline of all technology used as pre-req for deployment
## - README.md => explanation of the project, its structure, its technology, how to deploy it etc
 

## Technology Stack 

# Deployment

# Authors 

# License 

# References