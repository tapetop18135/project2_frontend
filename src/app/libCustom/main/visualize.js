////////////////////// MAP ///////////////////////////

import * as $ from 'jquery'
// import * as d3 from 'd3'
import * as d3 from 'd3'

import Map from 'ol/Map'
import View from 'ol/View'
import Tile from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Vector from 'ol/layer/Vector'
import souceVector from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import WebGLMap from 'ol/WebGLMap'
import Polygon from 'ol/geom/Polygon'
import { Fill, Stroke, Style, Text, RegularShape } from 'ol/style.js';

import * as Highcharts from 'highcharts'

export var domainIP = "http://13.251.157.101:8080" //"http://127.0.0.1:8080" //"" // "http://127.0.0.1:3200" //"http://18.136.209.215:8080"// //

export var tempSend = {
    "mapAVG": undefined,
    "mapTREND": undefined,
    "mapPCA": undefined,
    "mapPCA_RAW": undefined,

    "graphAVG": {
        "axisX": undefined,
        "axisY": undefined
    },
    "graphSeasonal": {
        "axisX": undefined,
        "axisY": undefined
    },
    "graphAVG_ann": {
        "axisX": undefined,
        "axisY": undefined
    },

    "graphPCA": {
        "time": {"axisX": undefined, "axisY": undefined},
        "variance": {"axisX": undefined, "axisY": undefined}
    },
    // "graphSeasonal": undefined,

    "SelectgraphAVG": undefined,
    "SelectgraphSeasonal": undefined,

    "lat_list": undefined,
    "lon_list": undefined,

    "date_list": [],
    "datasetName": undefined,
    "index_name": undefined,
    "short_name": undefined,
    "type_measure": undefined,
    "method": undefined,
    "unit": undefined,
    "season": undefined,

    "year_global": [],

    "dataset": "- Non select -",
    "year1": "- Non select -",
    "month1": "- Non select -",
    "day1": "- Non select -",
    "year2": "- Non select -",
    "month2": "- Non select -",
    "day2": "- Non select -",
    "type_index": "- Non select -",

    "ylabel": undefined,

}
export var highchartsModule = {
    "HighchartAVG": undefined,
    "HighchartSeason": undefined,
    "HighchartAVG_ANN": undefined,

    "HighchartPCA_time": undefined,
    "HighchartPCA_variance": undefined,
}
export var tempMapLayer = {
    "baselayer": undefined,

    "gridDataColorAVG": undefined,
    "gridDataColorTREND": undefined,
    "gridDataColorPCA": undefined,
    "gridDataColorPCA_RAW": undefined,

    "geojsonlayer": undefined,
    "interactive": undefined,
}

export var tempSourceLayer = {
    "baseGeoAll": undefined,
    "baselayer": undefined,
    "sourceDataColorAVG": undefined,
    "sourceDataColorTrend": undefined,
    "sourceDataColorPCA": undefined,
    "sourceDataColorPCA_RAW": undefined,
    "geojsonlayer": undefined,
    "interactive": undefined,
}


export var tempInteract = {
    "interactive": undefined,
}

export var tempGeojson = {
    "geojsonBase": undefined,
    "geojsonAVG": undefined,
    "geojsonTREND": undefined,
    "geojsonPCA": undefined,
    "geojsonPCA_RAW": undefined,
}

export var temp_max_min = {
    "max_minAVG": undefined,
    "max_minTREND": undefined,
    "max_minPCA": undefined,
    "max_minPCA_RAW": undefined,
}

export var grid;


export var map_all = {
    "map_avg": undefined,
    "map_trend": undefined,
    "map_pca": undefined,
    "map_pca_real": undefined
}

// var styleGeoe = new Style({
//     fill: new Fill({
//         color: 'rgba(255, 255, 255, 0)'
//     }),
//     stroke: new Stroke({
//         color: '#000',
//         width: 1
//     })
// });


var styles_for_hypotesis_test = {
    'MultiLineString': new Style({
        stroke: new Stroke({
            color: 'green',
            width: 2
        })
    })
};

export var vectorLayerGeo = new Vector({
    source: new souceVector({
        url: `${domainIP}/api/getgeocountry`,
        format: new GeoJSON(),
        // wrapX: false
    }),
    opacity: 0.6,
})


export var AVG_map = function (year1, year2, dataset, index_ = "") {
    tempSend["data_list"] = []
    tempSend["year_global"] = [year1, year2]

    if ((dataset == "ghcndex" || dataset == "GHCN") && index_ != "") {
        // debugger
        var urldataAVG = `${domainIP}/api/getmap/mapAVG/${dataset}/${year1}/${year2}/${index_}/`
        var urldataTrend = `${domainIP}/api/getmap/mapTrend/${dataset}/${year1}/${year2}/${index_}/`
        var urldataPCA = `${domainIP}/api/getmap/mapPCA/${dataset}/${year1}/${year2}/${index_}/`
        var urldataPCA_real = `${domainIP}/api/getmap/mapPCA_real/${dataset}/${year1}/${year2}/${index_}/`

        var urldataGRAPH = `${domainIP}/api/getData/Graph/${dataset}/${year1}/${year2}/${index_}/`


    }
    else {
        var urldata = `${domainIP}/api/getmap/reduce/${year1}/${year2}/${dataset}`
    }


    removeAll_layer()

    console.log(urldataAVG)

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*                                                 GRAPH                                                                          */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    fetch(urldataGRAPH).then(function (res) {
        return res.json();
    }).then(function (result) {

        // if (dataset == "GHCN") {

        tempSend["graphAVG"]["axisX"] = result["graph"]["graphAVG"]["axisX"]
        tempSend["graphAVG"]["axisY"] = result["graph"]["graphAVG"]["axisY"]

        tempSend["graphSeasonal"]["axisX"] = result["graph"]["graphSeasonal"]["axisX"]
        tempSend["graphSeasonal"]["axisY"] = result["graph"]["graphSeasonal"]["axisY"]

        tempSend["graphAVG_ann"]["axisX"] = result["graph"]["graphAVGAnn"]["axisX"]
        tempSend["graphAVG_ann"]["axisY"] = result["graph"]["graphAVGAnn"]["axisY"]

        // Detail 

        // tempSend["date_list"] = result["detail"]["date_list"]
        tempSend["index_name"] = result["detail"]["detail"]["index_name"]
        tempSend["short_name"] = result["detail"]["detail"]["short_name"]
        tempSend["type_measure"] = result["detail"]["detail"]["type_measure"]
        tempSend["method"] = result["detail"]["detail"]["method"]
        tempSend["unit"] = result["detail"]["detail"]["unit"]
        tempSend["datasetName"] = result["detail"]["detail"]["dataset"]
        if (tempSend["graphSeasonal"]["axisY"].length > 1) {
            tempSend["season"] = tempSend["graphSeasonal"]["axisY"]
        }

        // } else {

        // }
        setDisplay(tempSend["datasetName"], tempSend["index_name"], tempSend["year1"], tempSend["year2"])



        highchartsModule["HighchartAVG_ANN"] = genChart(
            "chartAvgANN",
            tempSend["graphAVG_ann"]["axisY"],
            tempSend["graphAVG_ann"]["axisX"],
            tempSend["index_name"],
            "Graph Ann Average Global",
            `period ${year1} - ${year2}`,
            tempSend["type_measure"], tempSend["unit"], "#908F8F", "line"
        )

        highchartsModule["HighchartAVG"] = genChart(
            "chartAvg",
            tempSend["graphAVG"]["axisY"],
            tempSend["graphAVG"]["axisX"],
            tempSend["index_name"],
            "Graph Average Global",
            `period ${year1} - ${year2}`,
            tempSend["type_measure"], tempSend["unit"], "black", "line"
        )
        // setTimeout(() => {
        //     console.log(highchartsModule)
        //      
        //     highchartsModule["HighchartAVG"].addSeries({
        //         name: "ssssssssss",
        //         data: tempSend["graphAVG"],
        //         color: "red"
        //     })
        //      
        // }, 5000)
        // console.log(tempSend)
        if (tempSend["season"] != undefined) {
            highchartsModule["HighchartSeason"] = genChart(
                "chartSeason",
                tempSend["graphSeasonal"]["axisY"],
                tempSend["graphSeasonal"]["axisX"],
                tempSend["index_name"],
                "Graph Seasonal Global",
                `${year1} - ${year2}`,
                tempSend["type_measure"], tempSend["unit"], "green", "line"
            )
        }

    })

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*                                                 AVG MAP                                                                         */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    fetch(urldataAVG).then(function (res) {
        return res.json();
    }).then(function (result) {
        // if (dataset == "GHCN") {
        // debugger
        console.log("AVG", result)
        tempSend["lat_list"] = result["detail"]["lat_list"]
        tempSend["lon_list"] = result["detail"]["lon_list"]

        // MAP
        tempSend["mapAVG"] = result["map"]["mapAVG"]

        tempGeojson["geojsonBase"] = genBaseGeojson(tempSend["lat_list"], tempSend["lon_list"])

        tempSourceLayer["baseGeoAll"] = new souceVector({
            features: (new GeoJSON()).readFeatures(tempGeojson["geojsonBase"])
        })

        temp_max_min["max_minAVG"] = find_max_min(tempSend["mapAVG"])
        tempGeojson["geojsonAVG"] = genGeojson(tempSend["lat_list"], tempSend["lon_list"], tempSend["mapAVG"])


        // } else {

        // }
        var gridSize = [2.7, 2.7]

        tempMapLayer["gridDataColorAVG"] = genGridData(tempGeojson["geojsonAVG"], gridSize, temp_max_min["max_minAVG"], "sourceDataColorAVG")
        
        map_all["map_avg"].addLayer(tempMapLayer["gridDataColorAVG"])
        map_all["map_avg"].addLayer(tempMapLayer["baselayer"])

        setRightDisplay(find_AVG_2D(tempSend["mapAVG"]), temp_max_min["max_minAVG"][0], temp_max_min["max_minAVG"][1])
        // alert("AVG")
        // debugger

    })
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*                                                 TREND MAP                                                                         */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // fetch(urldataTrend).then(function (res) {
    //     return res.json();
    // }).then(function (result) {
    //     debugger
    //     if (dataset == "GHCN") {
    //         console.log("Trend", result)
    //         // alert("TREND")
    //         tempSend["lat_list"] = result["detail"]["lat_list"]
    //         tempSend["lon_list"] = result["detail"]["lon_list"]
    //         tempSend["mapTREND"] = result["map"]["mapTREND"]

    //         temp_max_min["max_minTREND"] = find_max_min(tempSend["mapTREND"])
    //         tempGeojson["geojsonTREND"] = genGeojson(tempSend["lat_list"], tempSend["lon_list"], tempSend["mapTREND"], tempSend["data_list"])
    //         debugger


    //     } else {

    //     }
    //     var gridSize = [2.7, 2.7]

    //     tempMapLayer["gridDataColorTREND"] = genGridData(tempGeojson["geojsonTREND"], gridSize, temp_max_min["max_minTREND"])

    //     debugger
    //     map_all["map_trend"].addLayer(tempMapLayer["gridDataColorTREND"])
    //     map_all["map_trend"].addLayer(tempMapLayer["baselayer"])


    //     // setRightDisplay(find_AVG_2D(tempSend["mapAVG"]), temp_max_min["max_minAVG"][0], temp_max_min["max_minAVG"][1])
    //     // alert("SSSSSSSSSSSSSSSSSSSXXXXXXXXXXXXXXXXXXXX")
    // })

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*                                                 PCA MAP                                                                         */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    fetch(urldataPCA).then(function (res) {
        return res.json();
    }).then(function (result) {
        debugger
        // if (dataset == "GHCN") {
        console.log("PCA", result)
        // alert("PCA")
        tempSend["lat_list"] = result["detail"]["lat_list"]
        tempSend["lon_list"] = result["detail"]["lon_list"]
        tempSend["mapPCA"] = result["map"]["mapPCA"]

        temp_max_min["max_minPCA"] = find_max_min(tempSend["mapPCA"][0])
        tempGeojson["geojsonPCA"] = genGeojson(tempSend["lat_list"], tempSend["lon_list"], tempSend["mapPCA"][0], true)
        debugger


        // } else {

        // }
        var gridSize = [2.7, 2.7]

        tempMapLayer["gridDataColorPCA"] = genGridData(tempGeojson["geojsonPCA"], gridSize, temp_max_min["max_minPCA"], "sourceDataColorPCA")

        debugger
        map_all["map_pca"].addLayer(tempMapLayer["gridDataColorPCA"])
        map_all["map_pca"].addLayer(tempMapLayer["baselayer"])


        $(".eof_index").html(0)

        tempSend["graphPCA"]["time"]["axisY"] = result["graph"]["time"]["axisY"]
        tempSend["graphPCA"]["time"]["axisX"] = result["graph"]["time"]["axisX"]
        
        tempSend["graphPCA"]["variance"]["axisX"] = result["graph"]["ratio"]["axisX"]
        tempSend["graphPCA"]["variance"]["axisY"] = result["graph"]["ratio"]["axisY"]

        highchartsModule["HighchartPCA_time"] = genChart(
            "chartPCA",
            tempSend["graphPCA"]["time"]["axisY"][0],
            tempSend["graphPCA"]["time"]["axisX"],
            "Pca 0",
            "Graph PCA Time Series",
            `period ${year1} - ${year2}`,
            tempSend["type_measure"], tempSend["unit"], "red", "line"
        )
        var colors = ["blue", "green", "pink", "black", "yellow"]
        for(var i = 1; i < tempSend["graphPCA"]["variance"]["axisY"].length; i+=1){
            debugger
            highchartsModule["HighchartPCA_time"].addSeries({
                name: `Pca ${i}`,
                data: tempSend["graphPCA"]["time"]["axisY"][i],
                color: colors[i]
            })
        }
        

        highchartsModule["HighchartPCA_variance"] = genChart(
            "chartPCA_variance",
            tempSend["graphPCA"]["variance"]["axisY"],
            tempSend["graphPCA"]["variance"]["axisX"],
            "Variance",
            "Graph PCA Variance",
            `period ${year1} - ${year2}`,
            tempSend["type_measure"], tempSend["unit"], "orange", "line"
        )
        
        // setRightDisplay(find_AVG_2D(tempSend["mapAVG"]), temp_max_min["max_minAVG"][0], temp_max_min["max_minAVG"][1])
        // alert("")
    })

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*                                                 PCA_real MAP                                                                         */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // fetch(urldataPCA_real).then(function (res) {
    //     return res.json();
    // }).then(function (result) {
    //     debugger
    //     // if (dataset == "GHCN") {
    //     console.log("PCARAW", result)
    //     // alert("PCA REAL")
    //     tempSend["lat_list"] = result["detail"]["lat_list"]
    //     tempSend["lon_list"] = result["detail"]["lon_list"]
    //     tempSend["mapPCA_RAW"] = result["map"]["mapPCA_RAW"]

    //     temp_max_min["max_minPCA_RAW"] = find_max_min(tempSend["mapPCA_RAW"])
    //     tempGeojson["geojsonPCA_RAW"] = genGeojson(tempSend["lat_list"], tempSend["lon_list"], tempSend["mapPCA_RAW"], tempSend["data_list"])
    //     debugger


    //     // } else {

    //     // }
    //     var gridSize = [2.7, 2.7]

    //     tempMapLayer["gridDataColorPCA_RAW"] = genGridData(tempGeojson["geojsonPCA_RAW"], gridSize, temp_max_min["max_minPCA_RAW"])

    //     debugger
    //     map_all["map_pca_real"].addLayer(tempMapLayer["gridDataColorPCA_RAW"])
    //     map_all["map_pca_real"].addLayer(tempMapLayer["baselayer"])


    //     // setRightDisplay(find_AVG_2D(tempSend["mapAVG"]), temp_max_min["max_minAVG"][0], temp_max_min["max_minAVG"][1])
    //     // alert("SSSSSSSSSSSSSSSSSSSXXXXXXXXXXXXXXXXXXXX")
    // })

    // }

}


function removeAll_layer() {
    for (var k_map in map_all) {
        for (var k_layer in tempMapLayer) {
            map_all[k_map].removeLayer(tempMapLayer[k_layer])
        }
    }
}
export function setRightDisplay(avg, max, min) {
    $('.meanStat').html(avg.toFixed(2))
    $(".maxStat").html(max.toFixed(2))
    $(".minStat").html(min.toFixed(2))
}

export function updateMapWithDate(map, data, geojsonNow) {


    tempMapLayer["geojsonlayer"].clear()



    var tempNewGeojson = new GeoJSON().readFeatures(geojsonNow)

    tempMapLayer["geojsonlayer"].addFeatures(tempNewGeojson)


}

export function genGeojson(list_lat, list_lon, data_list = "", typePca_or_trend= false, date = "") {
    var multi = 1
    if (typePca_or_trend) {
        multi = 100
    }

    debugger
    var points = {
        type: 'FeatureCollection',
        features: []
    };
    //  
    for (var lat_index = 0; lat_index < list_lat.length; lat_index += 1) {
        for (var lot_index = 0; lot_index < list_lon.length; lot_index += 1) {

            if (data_list[lat_index][lot_index] != -99.99) {
                points.features.push({
                    type: 'Feature',
                    properties: { "value": data_list[lat_index][lot_index] * multi, "lat": list_lat[lat_index], "lon": list_lon[lot_index], "date": date },
                    geometry: {
                        type: 'Point',
                        coordinates: [(list_lon[lot_index] >= 180) ? list_lon[lot_index] - 360 : list_lon[lot_index]
                        // coordinates: [list_lon[lot_index] 
                            ,
                        list_lat[lat_index]
                        ]
                    }
                })
            }

        }
    }

    return points

}

export function genBaseGeojson(list_lat, list_lon) {
    var points = {
        type: 'FeatureCollection',
        features: []
    };
    for (var lat_index = 0; lat_index < list_lat.length; lat_index += 1) {
        for (var lot_index = 0; lot_index < list_lon.length; lot_index += 1) {

            // if (data_list[lat_index][lot_index] != -999.999) {
            points.features.push({
                type: 'Feature',
                properties: { "lat": list_lat[lat_index], "lon": list_lon[lot_index] },
                geometry: {
                    type: 'Point',
                    coordinates: [(list_lon[lot_index] >= 180) ? list_lon[lot_index] - 360 : list_lon[lot_index]
                        ,
                    list_lat[lat_index]
                    ]
                }
            })
            // }

        }
    }

    return points

}

var styleGeo = new Style({
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0)'
    }),
    stroke: new Stroke({
        color: '#000',
        width: 1
    })
});


export function genMap(target) {
    console.log("--------- GEN MAP ---------")
    var basesource = new Tile({
        source: new OSM({})
    })
    if (tempMapLayer["baselayer"] == undefined) {
        var BasevectorLayerGeo = new Vector({
            source: new souceVector({
                url: `${domainIP}/api/getgeocountry`,
                format: new GeoJSON(),
                // wrapX: false
            }),
            style: function (feature) {
                // styleGeo.getText().setText(feature.get('name'));
                return styleGeo;
            }
            // opacity: 0.7
        })
        tempMapLayer["baselayer"] = BasevectorLayerGeo//basesource
        // debugger
    }


    var map = new WebGLMap({
        target: target,
        // layers: [
        //     new Tile({
        //         source: new OSM({})
        //     }),
        // ],
        view: new View({
            projection: 'EPSG:4326',
            center: [0, 0], // [155,0]
            maxZoom: 6.5,
            minZoom: 1,
            zoom: 1
        })
    });

    console.log("============== BEFORE ==============")
    // map.addLayer(tempMapLayer["baselayer"])
    return map
}


export function find_AVG_2D(array) {
    var sum = 0
    var totalE = tempSend["lat_list"].length * tempSend["lon_list"].length
    for (var i = 0; i < array.length; i += 1) {
        for (var j = 0; j < array.length; j += 1) {
            sum += array[i][j]
        }
    }
    return sum / totalE
}

var find_max_min = function (allGrid) {
    debugger
    var array = allGrid
    var max = array[0][0]
    var min = array[0][0]

    var i = 0


    while (i < array.length) {
        var j = 0
        while (j < array[i].length) {
            if (array[i][j] == -99.99) {

            }
            else {
                if (max == -99.99) {
                    max = array[i][j]
                    min = max
                }
                if (array[i][j] > max) {
                    max = array[i][j]
                } else if (array[i][j] < min) {
                    min = array[i][j]
                }
            }
            j += 1
        }
        i += 1
    }

    // $(".maxStat").html(max.toFixed(2))
    // $(".minStat").html(min.toFixed(2))
    var multi = 1
    if (tempSend["typeMap"] == "avg") {
        multi = 1
    } else if (tempSend["typeMap"] == "dm" || tempSend["typeMap"] == "trend") {
        multi = 100
    }

    return [max * multi, min * multi]

}

function colorSelect(colorScale, domainScale) {

    var colorScale = d3.scaleThreshold()
        .domain(domainScale)
        .range(colorScale);

    return colorScale
}

export function genGridData(geojson, gridSize, max_min, name) {

    var max = max_min[0]
    var min = max_min[1]
    var tem = []
    var ary_color = ["#9f0000", "#d50000", "#ff0000", "#ff4900", "#ff9000", "#ffc400", "#ffec00", "#ffff66",
        "#cfffff", "#aff6ff", "#9defff", "#86daff", "#6dc1ff", "#4297ff", "#2050ff", "#050fd9"].reverse()

    var val_max = max + Math.abs(min)
    for (let i = 0; i < ary_color.length; i++) {
        tem.push(max - i * (val_max / ary_color.length))
    }
    tem = tem.sort((a, b) => a - b)
    console.log(tem)
    //  
    var gridStyle = function (feature) {

        var coordinate = feature.getGeometry().getCoordinates()

        var x = coordinate[0] - gridSize[0] / 2
        var y = coordinate[1] - gridSize[1] / 2
        var pop = parseInt(feature.getProperties().value)
        //  
        var rgb = d3.rgb(colorSelect(ary_color, tem)(pop))

        var scaleX = 0
        var scaleY = 0


        var pos1 = [x - scaleX, y - scaleY]
        var pos2 = [x - scaleX, y + gridSize[1] + scaleY]
        var pos3 = [x + scaleX + gridSize[0], y + gridSize[1] + scaleY]
        var pos4 = [x + scaleX + gridSize[0], y - scaleY]
        var pos5 = pos1

        return [
            new Style({
                fill: new Fill({
                    color: [rgb.r, rgb.g, rgb.b, 1]
                }),
                geometry: new Polygon([[
                    pos1, pos2, pos3, pos4, pos5
                ]])
            })
        ];
    };



    grid = new souceVector({
        features: (new GeoJSON()).readFeatures(geojson),
        // wrapX: false
    })

    tempSourceLayer[name] = grid

    var gridLayer = new Vector({
        source: grid,
        style: gridStyle
    });


    return gridLayer

}


/////////////////////////////////////////////////////////
///////////////////////// CHART /////////////////////////
/////////////////////////////////////////////////////////


export function genChart(target, data1, period, nameData1, nameGraph, nameSub, titleY, unit, color, type) {
    var chart = Highcharts.chart(target, {
        chart: {
            type: type
        },
        title: {
            text: nameGraph
        },
        subtitle: {
            text: "Period " + nameSub
        },
        xAxis: {
            categories: period
        },
        yAxis: {
            title: {
                text: titleY
            },
            labels: {
                formatter: function () {
                    return this.value + unit;
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (e) {
                            // var index = tempSend["date_list"].findIndex(function (m) {
                            //     return m === e.point.category
                            // })
                            // var dataU = tempSend["data_list"][index]
                            // updateMapWithDate(map, dataU, GeoJsonList["Ann"][index])
                        }
                    }
                }
            },
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [
            {
                name: nameData1,
                marker: {
                    symbol: 'square'
                },
                color: color,
                data: data1

            },
        ]
    });

    return chart
}

export function genChartDM(target, data1, data2, nameData1, nameData2, period, nameGraph, nameSub, titleY, unit, color1, color2, type) {
    console.log(data1)
    Highcharts.chart(target, {
        chart: {
            type: type
        },
        title: {
            text: nameGraph
        },
        subtitle: {
            text: "Period " + nameSub
        },
        xAxis: {
            categories: period
        },
        yAxis: {
            title: {
                text: titleY
            },
            labels: {
                formatter: function () {
                    return this.value + unit;
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: nameData1,
            marker: {
                symbol: 'square'
            },
            color: color,
            data: data1

        }, {
            name: nameData2,
            marker: {
                symbol: 'square'
            },
            color: color,
            data: data2

        }
        ]
    });
}



/////////////////////////////////////////////////////
////////////////// VISUALIZE ///////////////////////
//////////////////////////////////////////////////////


$(document).ready(function () {
    //  
    $(".customize .step2 .next").hide()

    setDisplay(tempSend["typeMap"], tempSend["year1"], tempSend["year2"])


    $(".ShowDM").on("click", function () {
        console.log(GeoJsonList)
        //  
        update_getGee(undefined, undefined, "pca", map, "sst")

    })

    $(".S1").on("change", function () {
        tempSend["modeUSE"] = $(this).val()
        console.log(tempSend)
    })

    $(".customize .next").on("click", function (e) {

        e.preventDefault()
        console.log(tempSend)
        console.log("SSSSSSSSSSSSSSS")
        var temp = $(this).parent().parent()
        if (temp.next().attr("class") !== undefined) {
            if (temp.next().attr("class") == "step3") {

                if (map_all["map_avg"] === undefined &&
                    map_all["map_trend"] === undefined &&
                    map_all["map_pca"] === undefined &&
                    map_all["map_pca_real"] === undefined
                ) {
                    map_all["map_avg"] = genMap("mapAVG")
                    map_all["map_trend"] = genMap("mapTrend")
                    map_all["map_pca"] = genMap("mapPCA")
                    map_all["map_pca_real"] = genMap("mapPCA_real")
                }

                // var year1Start = `${tempSend["year1"]}-${getMonth(tempSend["month1"])}-01`
                // var year2Start = `${tempSend["year2"]}-${getMonth(tempSend["month2"])}-01`
// 
                var year1Start = `${tempSend["year1"]}-${getMonth(tempSend["month1"])}`
                var year2Start = `${tempSend["year2"]}-${getMonth(tempSend["month2"])}`

                var temp_index = tempSend["type_index"]
                AVG_map(year1Start, year2Start, tempSend["dataset"], temp_index)

                console.log(tempSend)
            }
            temp.hide()
            temp.next().fadeIn(500)
        }
    })

    $(".customize .pre").on("click", function (e) {
        e.preventDefault()
        var temp = $(this).parent().parent()

        if (temp.prev().attr("class") !== undefined) {
            temp.hide()
            temp.prev().fadeIn(500)
        }
    })

    $(".yearS").on("change", function () {
        $(".yearS option:selected").each(function (index) {
            console.log(this)
            tempSend["year1"] = this.value
            checkStep2()
        })
    })

    $(".monthS").on("change", function () {
        $(".monthS option:selected").each(function (index) {
            console.log(this)
            tempSend["month1"] = this.value
            checkStep2()
        })
    })

    $(".yearS2").on("change", function () {
        $(".yearS2 option:selected").each(function (index) {
            console.log(this)
            tempSend["year2"] = this.value
            console.log(tempSend["year2"])
            checkStep2()

        })
    })

    $(".monthS2").on("change", function () {
        $(".monthS2 option:selected").each(function (index) {
            console.log(this)
            tempSend["month2"] = this.value
            checkStep2()
        })
    })

    $(".typeMap").on("change", function () {
        $(".typeMap option:selected").each(function (index) {
            console.log(this)
            tempSend["dataset"] = this.value
            checkStep2()
        })
    })

    $(".type_index").on("change", function () {
        $(".type_index option:selected").each(function (index) {
            console.log(this)
            tempSend["type_index"] = this.value

            checkStep2()
        })
    })

});

function setDisplay(dataset, index_, date_range1, date_range2) {
    $(".typeMapShow").html(dataset)
    $(".typeIndex").html(index_)
    $(".dateRange1").html(date_range1)
    $(".dateRange2").html(date_range2)
}

function getMonth(monthName) {
    var monthArr = ["- Non select -", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    // console.log(monthArr.indexOf(monthName))
    var result = ""
    if (monthArr.indexOf(monthName) <= 9) {
        result = `${monthArr.indexOf(monthName)}`
        // result = `0${monthArr.indexOf(monthName)}`
    } else {
        result = `${monthArr.indexOf(monthName)}`
    }
    return result
}

function checkStep2() {
    if (tempSend["year1"] === "- Non select -" || tempSend["month1"] === "- Non select -" || tempSend["year2"] === "- Non select -" || tempSend["month2"] === "- Non select -" || tempSend["dataset"] === "- Non select -" || tempSend["type_index"] === "- Non select -") {
        console.log("cant next")
        $(".customize .step2 .next").hide()
        return
    }

    $(".customize .step2 .next").fadeIn(500)
    $(".step2 p.statusCant").html("Can next")
}
