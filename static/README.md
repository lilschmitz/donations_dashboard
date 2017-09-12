# Starrysky

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

=================================================================

# Project_1_Star_Gazing

Project is meant to demonstrate knowledge of an Angular JS build integrating an external API call and ultimately styling and rendering the pages in a HTML code and CSS. Bootstrap elements, Font-Awesome were used as well. 

# Site Outline 

## Landing Page - "Dashboard"

Screenshot avaible here:
[Dashboard](https://www.dropbox.com/s/ghlvc88r048bbsx/Screenshot%202017-06-29%2017.02.09.png?dl=0)

This page displays 4 out of the 9 planets that have been stored in a list/tuple. 

## Second Page - "Stars" 

### Stars Solar Planets List

Screenshot availabe here: 
[Stars List of Solar Planets](https://www.dropbox.com/s/xs550mlxtfu7d6d/Screenshot%202017-06-29%2017.02.15.png?dl=0)


This page shows the 9 solar planets in an ordered list with more detailed attributes pulled in from the list - namely distance from the sun. They are ordered that way. 


### Stars Links Detailed View

Screenshot availabe here: 
[Stars List Detailed View](https://www.dropbox.com/s/sxrny4f6pqw2vvz/Screenshot%202017-06-29%2017.02.42.png?dl=0)

List items are clickable and render section beneath list with short statement and further link to detailed page for that particular planet


## Third Page - "Pictures"

### Live NASA API Call

Screenshot availabe here: 
[Pictures of REAL Stars live from NASA](https://www.dropbox.com/s/yfsig66oujydsph/Screenshot%202017-06-29%2017.02.54.png?dl=0)

This page is an actual API call to the NASA website and pulls data from the backend using an API key in my name, which NASA is publishing here 
[NASAs Example of pubslished Pictures of the Day APOD](https://www.nasa.gov/multimedia/imagegallery/iotd.html)

The API can be obtained here 
[API Source](https://api.nasa.gov/)

The API used is the Astronomy Picture of the Day in short APOD. It has been supplemented with the actual time/date details. 
