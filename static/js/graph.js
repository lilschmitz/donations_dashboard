

$(document).ready(function() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = day + "-" + month + "-" + year;
    $("#theDate").attr("value", today);
});

queue()
    .defer(d3.json, "donorsUS/projects")
    .defer(d3.json, "static/geojson/us-states.json")
    .await(makeGraphs);
function makeGraphs(error, projectsJson, statesJson) {


    //Clean projectsJson data and parse as well as transform data
    var donorsUSProjects = projectsJson;
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    var yearFormat = d3.time.format("%Y");
    var monthFormat = d3.time.format("%m");
    donorsUSProjects.forEach(function (d) {
        d["date_posted"] = dateFormat.parse(d["date_posted"]);
        d["date_posted"].setDate(1);
        d["total_donations"] = +d["total_donations"];
        // d.year = d["date_posted"].getFullYear();
        // d.month = d["date_posted"].getMonth() + 1;
        // d.date = d["date_posted"].getDate(d);
    });



    //Create a Crossfilter instance
    var ndx = crossfilter(donorsUSProjects);
    var all = ndx.groupAll();





    //Define Dimensions
    var dateDim = ndx.dimension(function (d) {
        return d["date_posted"];
    });

    var resourceTypeDim = ndx.dimension(function (d) {
        return d["resource_type"];
    });
    var povertyLevelDim = ndx.dimension(function (d) {
        return d["poverty_level"];
    });
    var stateDim = ndx.dimension(function (d) {
        return d["school_state"];
    });
    var totalDonationsDim = ndx.dimension(function (d) {
        return d["total_donations"];
    });

    var fundingStatus = ndx.dimension(function (d) {
        return d["funding_status"];
    });
    var primaryFocAreaDim = ndx.dimension(function (d) {
        return d["primary_focus_area"];
    });




    //Calculate metrics
   var numProjectsByMonth = dateDim.group(monthFormat);
    var numProjectsByDate = dateDim.group();
    var numProjectsByYear = dateDim.group(yearFormat);
    var numProjectsByResourceType = resourceTypeDim.group();
    var numProjectsByPovertyLevel = povertyLevelDim.group();
    var numProjectsByFundingStatus = fundingStatus.group();
    var numProjectsByArea = primaryFocAreaDim.group();
    var totalDonationsByState = stateDim.group().reduceSum(function (d) {
        return d["total_donations"];
    });



    var stateGroup = stateDim.group();







    var totalDonations = ndx.groupAll().reduceSum(function (d) {
        return d["total_donations"];
    });






    //records count to be displayed dynamically in html
    dc.dataCount('.dc-data-count')
        .dimension(ndx)
        .group(all)
        .html({
            Selected: '<strong>%filter-count</strong> Total: <strong>%total-count</strong>'
        });

    //Ordering data in this instance total Donations per State
    var max_state = totalDonationsByState.top(1)[0].value;

    //Min and Max for Date Dimension
    var minDate = dateDim.bottom(1)[0]["date_posted"];
    var maxDate = dateDim.top(1)[0]["date_posted"];






    //Charts dc type defined and bound to html id
    var timeChart = dc.lineChart("#time-chart");
    var resourceTypeChart = dc.rowChart("#resource-type-row-chart");
    var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
    var numberProjectsND = dc.numberDisplay("#number-projects-nd");
    var totalDonationsND = dc.numberDisplay("#total-donations-nd");
    var fundingStatusChart = dc.pieChart("#funding-chart");
    var areaTypeChart = dc.rowChart("#area-row-chart");
    var usaChart = dc.geoChoroplethChart("#us-chart");
    var stateChart = dc.rowChart("#state-row-chart");
    var selectFieldYear  = dc.selectMenu("#field-year");
    var selectFieldResource = dc.selectMenu("#field-resource");
    var  selectAreaType  = dc.selectMenu("#field-area");
    var selectFieldFunding =  dc.selectMenu("#field-funding");
    var selectPovertyLevel =  dc.selectMenu("#field-poverty");
    var selectFieldMonth =  dc.selectMenu("#field-month");




    //Outline and definition of chart properties


    numberProjectsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);

    totalDonationsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalDonations)
        .formatNumber(d3.format(".3s"));


    var adjustX = 10, adjustY = 40;


    timeChart
        .ordinalColors(["#C96A23"])
        .width(800)
        .height(300)
        .margins({top: 30, right: 20, bottom: 30, left: 80})
        .dimension(dateDim)
        .group(numProjectsByDate)
        .renderArea(true)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Years")
        .yAxisLabel("Number of Donations")
        .yAxis().ticks(6);


    resourceTypeChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(300)
        .height(250)
        .dimension(resourceTypeDim)
        .group(numProjectsByResourceType)
        .xAxis().ticks(4);

    povertyLevelChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(300)
        .height(250)
        .dimension(povertyLevelDim)
        .group(numProjectsByPovertyLevel)
        .xAxis().ticks(4);

    fundingStatusChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .height(250)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(fundingStatus)
        .group(numProjectsByFundingStatus)
        .legend(dc.legend());

    areaTypeChart
        .width(300)
        .height(250)
        .dimension(primaryFocAreaDim)
        .group(numProjectsByArea)
        .xAxis().ticks(4);

    stateChart
        .width(400)
        .height(745)
        .colorDomain([0, max_state])
        .dimension(stateDim)
        .group(stateGroup)
        .xAxis().ticks(9);

    usaChart
        .width(860)
        .height(390)
        .dimension(stateDim)
        .group(totalDonationsByState)
        .colors(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"])
        .colorDomain([0, max_state])
        .overlayGeoJson(statesJson["features"], "state", function (d) {
            return d.properties.name;
        })
        .projection(d3.geo.albersUsa()
            .scale(810)
            .translate([410, 180]))
        .on('renderlet', function (chart) {
            chart.selectAll('rect').on("click", function (d) {
                //console.log("click!", d)
                chart.filter(d.data.key)
                    .redrawGroup();
            })
        });
// Using Dynatable to display data table with dynamic features in html
var dynatable = $('#dc-data-table').dynatable({
                features: {
                    // pushState: false
                    paginate: true,
    sort: true,
    pushState: true,
    search: true,
    recordCount: true,
    perPageSelect: true,
                    inputsSearch:true
                },
                dataset: {
                    records: dateDim.top(Infinity),
                    perPageDefault: 50,
                    perPageOptions: [50, 100, 200, 500, 1000, 2000, 5000 ,10000]
                },
     inputs: {
                         queryEvent: 'blur change',
    queries: $('school_state', 'date_posted', 'primary_focus_area', 'resource_type','funding_status', 'total_donations')

    }

            }).data('dynatable');
function RefreshTable() {
                dc.events.trigger(function () {
                    dynatable.settings.dataset.originalRecords = dateDim.top(Infinity);
                    dynatable.process();
                });
            };

         for (var i = 0; i < dc.chartRegistry.list().length; i++) {
                var chartI = dc.chartRegistry.list()[i];
                chartI.on("filtered", RefreshTable);
            }
        RefreshTable();


  //Drop Down for Nbr of Donations Graph

    selectField = dc.selectMenu('#menu-select')
        .dimension(stateDim)
        .group(stateGroup);


         //Selection and Filter Options

    selectFieldResource
        .dimension(resourceTypeDim)
        .group(numProjectsByResourceType);

    selectAreaType
        .dimension(primaryFocAreaDim)
        . group(numProjectsByArea);

    selectFieldFunding
        .dimension(fundingStatus)
        .group(numProjectsByFundingStatus);

    selectPovertyLevel
        .dimension(povertyLevelDim)
        .group(numProjectsByPovertyLevel);


    selectFieldYear
        .dimension(dateDim)
        .group(numProjectsByYear);

    selectFieldMonth
        .dimension(dateDim)
        .group(numProjectsByMonth);

    dc.renderAll();

}