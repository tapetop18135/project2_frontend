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

export var domainIP = "http://127.0.0.1:3200"//"http://13.251.157.101:8080" //"http://127.0.0.1:8080" //"" // "http://127.0.0.1:3200" //"http://18.136.209.215:8080"// //

export var tempSend = {
    "mapAVG": undefined,
    "mapTREND": undefined,
    "mapPCA": undefined,
    "mapPCA_RAW": undefined,
    "mapTrend_X": undefined,

    "graphAVG": {
        "axisX": undefined,
        "axisY": undefined,
        "reg" : undefined,
    },
    "graphSeasonal": {
        "axisX": undefined,
        "axisY": undefined
    },
    "graphAVG_ann": {
        "axisX": undefined,
        "axisY": undefined,
        "reg" : undefined,
    },

    "graphPCA": {
        "time": { "axisX": undefined, "axisY": undefined },
        "variance": { "axisX": undefined, "axisY": undefined }
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

    "gridDataTrend_X": undefined,
    "geojsonlayer": undefined,

    "interactiveGeoCountry": undefined,

    "drawingLayer": undefined,
}

export var tempSourceLayer = {
    "baseGeoAll": undefined,
    "baselayer": undefined,
    "sourceDataColorAVG": undefined,
    "sourceDataColorTrend": undefined,
    "sourceDataColorPCA": undefined,
    "sourceDataColorPCA_RAW": undefined,

    "sourceData_trend_X": undefined,

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
    "geojson_Trend_X": undefined
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

var tempColors = {
    "AVG_colors": [
        "#9f0000", "#d50000", "#ff0000", "#ff4900", "#ff9000", "#ffc400", "#ffec00", "#ffff66",
        "#cfffff", "#aff6ff", "#9defff", "#86daff", "#6dc1ff", "#4297ff", "#2050ff", "#050fd9"
    ].reverse(),

    "Trend_colors_python": [
        "#796022", "#9F1228", "#BA2823", "#CC4C44", "#DD7059", "#EC9374", "#F6B394", "#FBCCB4",
        "#FCE2D2", "#F9F0EB", "#EDF2F5", "#DAE9F2", "#C2DDEC", "#A2CDE3", "#7EB8D7", "#569FC9",
        "#3A87BD", "#2870B1", "#1A5899", "#0C3D73"
    ].reverse(),
    "Trend_colors_pynoply": [
        "#B2182B", "#D6604D", "#F4A582", "#FDDBC7", "#F7F7F7", "#CADDE8", "#92C5DE", "#4393C3",
        "#2166AC"
    ].reverse(),
    "Trend_colors_climdex": [
        "#000032", "#104E8B", "#1774CD", "#5BACED", "#D1EDED", "#F2FFFF", "#FDF5E6", "#F3A460",
        "#CD661D", "#ED0000", "#CD0000", "#320000"
    ].reverse()
}

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
        alert("Have Graph Data")
        // if (dataset == "GHCN") {

        tempSend["graphAVG"]["axisX"] = result["graph"]["graphAVG"]["axisX"]
        tempSend["graphAVG"]["axisY"] = result["graph"]["graphAVG"]["axisY"]
        tempSend["graphAVG"]["reg"] = result["graph"]["graphAVG"]["TaxisY"]

        tempSend["graphSeasonal"]["axisX"] = result["graph"]["graphSeasonal"]["axisX"]
        tempSend["graphSeasonal"]["axisY"] = result["graph"]["graphSeasonal"]["axisY"]

        tempSend["graphAVG_ann"]["axisX"] = result["graph"]["graphAVGAnn"]["axisX"]
        tempSend["graphAVG_ann"]["axisY"] = result["graph"]["graphAVGAnn"]["axisY"]
        tempSend["graphAVG_ann"]["reg"] = result["graph"]["graphAVGAnn"]["TaxisY"]

        // Detail 

        // tempSend["date_list"] = result["detail"]["date_list"]
        tempSend["index_name"] = result["detail"]["detail"]["index_name"]
        tempSend["short_name"] = result["detail"]["detail"]["short_name"]
        tempSend["type_measure"] = result["detail"]["detail"]["type_measure"]
        tempSend["method"] = result["detail"]["detail"]["method"]
        tempSend["unit"] = result["detail"]["detail"]["unit"]
        tempSend["description"] = result["detail"]["detail"]["description"]

        tempSend["datasetName"] = result["detail"]["detail"]["dataset"]
        if (tempSend["graphSeasonal"]["axisY"].length > 1) {
            tempSend["season"] = tempSend["graphSeasonal"]["axisY"]
        }

        // } else {

        // }
        setDisplay(tempSend["datasetName"], tempSend["index_name"], tempSend["year1"], tempSend["year2"])

        var descript_index = `
            <p>Index is ${tempSend["short_name"]} ( ${tempSend["index_name"]} )</p>
            <p>Method is ${tempSend["method"]}</p>
            <p>Unit is ${tempSend["unit"]}</p>
            <p>Dataset is ${tempSend["datasetName"]}</p>
            <p>Measure is ${tempSend["type_measure"]}</p>
            <p>Description :</p>
            <p>  ${tempSend["description"]}<p>
        `
        $(".description_index").html(descript_index)


        highchartsModule["HighchartAVG_ANN"] = genChart(
            "chartAvgANN",
            tempSend["graphAVG_ann"]["axisY"],
            tempSend["graphAVG_ann"]["axisX"],
            tempSend["index_name"],
            "Graph Ann Average Global",
            `period ${year1} - ${year2}`,
            tempSend["type_measure"], tempSend["unit"], "#908F8F", "line"
        )

        highchartsModule["HighchartAVG_ANN"].addSeries({
            name: `linear ${result["detail"]["detail"]["index_name"]}`,
            data: tempSend["graphAVG_ann"]["reg"],
            color: "red"
        })

        highchartsModule["HighchartAVG"] = genChart(
            "chartAvg",
            tempSend["graphAVG"]["axisY"],
            tempSend["graphAVG"]["axisX"],
            tempSend["index_name"],
            "Graph Average Global",
            `period ${year1} - ${year2}`,
            tempSend["type_measure"], tempSend["unit"], "black", "line"
        )
        highchartsModule["HighchartAVG"].addSeries({
            name: `linear ${result["detail"]["detail"]["index_name"]}`,
            data: tempSend["graphAVG"]["reg"],
            color: "red"
        })

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
        alert("Have Average Map")
        // if (dataset == "GHCN") {
        // debugger
        tempSend["unit"] = result["detail"]["detail"]["unit"]
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


        // tempMapLayer["gridDataTrend_X"] = genGeojson(tempSend["lat_list"], tempSend["lon_list"], tempSend["mapAVG"])


        // } else {

        // }
        var gridSize = [2.7, 2.7]

        // var ary_color = ["#9f0000", "#d50000", "#ff0000", "#ff4900", "#ff9000", "#ffc400", "#ffec00", "#ffff66",
        // "#cfffff", "#aff6ff", "#9defff", "#86daff", "#6dc1ff", "#4297ff", "#2050ff", "#050fd9"].reverse()

        tempMapLayer["gridDataColorAVG"] = genGridData(
            tempGeojson["geojsonAVG"],
            gridSize,
            temp_max_min["max_minAVG"],
            "sourceDataColorAVG",
            tempColors["AVG_colors"]
        )

        map_all["map_avg"].addLayer(tempMapLayer["gridDataColorAVG"])
        map_all["map_avg"].addLayer(tempMapLayer["baselayer"])


        setRightDisplay(find_AVG_2D(tempSend["mapAVG"]), temp_max_min["max_minAVG"][0], temp_max_min["max_minAVG"][1], "AVG")
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

    fetch(urldataTrend).then(function (res) {
        return res.json();
    }).then(function (result) {
        alert("Have Map Trend")
        // debugger
        // if (dataset == "GHCN") {
        console.log("Trend", result)
        // alert("TREND")
        tempSend["lat_list"] = result["detail"]["lat_list"]
        tempSend["lon_list"] = result["detail"]["lon_list"]
        tempSend["mapTREND"] = result["map"]["mapTREND"]

        // var colors = [ 
        //     "#796022" ,"#9F1228", "#BA2823", "#CC4C44", "#DD7059" ,"#EC9374" , "#F6B394", "#FBCCB4",
        //     "#FCE2D2" ,"#F9F0EB", "#EDF2F5", "#DAE9F2", "#C2DDEC", "#A2CDE3", "#7EB8D7", "#569FC9", 
        //     "#3A87BD", "#2870B1", "#1A5899", "#0C3D73"
        // ]

        temp_max_min["max_minTREND"] = find_max_min(tempSend["mapTREND"])
        tempGeojson["geojsonTREND"] = genGeojson(tempSend["lat_list"], tempSend["lon_list"], tempSend["mapTREND"], tempSend["data_list"])
        // debugger

        // } else {

        // }
        var gridSize = [2.7, 2.7]

        tempMapLayer["gridDataColorTREND"] = genGridData(
            tempGeojson["geojsonTREND"],
            gridSize,
            temp_max_min["max_minTREND"],
            "sourceDataColorTrend",
            tempColors["Trend_colors_pynoply"]
        )

        // debugger
        map_all["map_trend"].addLayer(tempMapLayer["gridDataColorTREND"])
        map_all["map_trend"].addLayer(tempMapLayer["baselayer"])


        var styles = {
            'MultiLineString': new Style({
                stroke: new Stroke({
                    color: 'black',
                    width: 1
                })
            })
        }

        tempSend["mapTrend_X"] = result["map"]["hiypo"]
        tempSend["geojson_Trend_X"] = gen_geoTrend_X(tempSend["mapTrend_X"], result["detail"]["lat_list"], result["detail"]["lon_list"], 2)

        tempSourceLayer["sourceData_trend_X"] = new souceVector({
            features: (new GeoJSON()).readFeatures(tempSend["geojson_Trend_X"]),
        })

        var styleFunction = function (feature) {
            return styles[feature.getGeometry().getType()];
        };

        tempMapLayer["gridDataTrend_X"] = new Vector({
            source: tempSourceLayer["sourceData_trend_X"],
            style: styleFunction
        });

        map_all["map_avg"].addLayer(tempMapLayer["gridDataTrend_X"])

        setRightDisplay(find_AVG_2D(tempSend["mapTREND"]), temp_max_min["max_minTREND"][0], temp_max_min["max_minTREND"][1], "TREND")
        // setRightDisplay(find_AVG_2D(tempSend["mapAVG"]), temp_max_min["max_minAVG"][0], temp_max_min["max_minAVG"][1])
        // alert("SSSSSSSSSSSSSSSSSSSXXXXXXXXXXXXXXXXXXXX")
    })

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
        alert("Have Map Pca and Graph Pca")
        // debugger
        // if (dataset == "GHCN") {
        console.log("PCA", result)
        // alert("PCA")
        tempSend["lat_list"] = result["detail"]["lat_list"]
        tempSend["lon_list"] = result["detail"]["lon_list"]
        tempSend["mapPCA"] = result["map"]["mapPCA"]

        temp_max_min["max_minPCA"] = find_max_min(tempSend["mapPCA"][0])
        tempGeojson["geojsonPCA"] = genGeojson(tempSend["lat_list"], tempSend["lon_list"], tempSend["mapPCA"][0], true)
        // debugger


        // } else {

        // }
        var gridSize = [2.7, 2.7]

        tempMapLayer["gridDataColorPCA"] = genGridData(
            tempGeojson["geojsonPCA"],
            gridSize,
            temp_max_min["max_minPCA"],
            "sourceDataColorPCA",
            tempColors["Trend_colors_pynoply"]
        )

        // debugger
        map_all["map_pca"].addLayer(tempMapLayer["gridDataColorPCA"])
        map_all["map_pca"].addLayer(tempMapLayer["baselayer"])


        $(".eof_index").html(1)

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
        for (var i = 1; i < tempSend["graphPCA"]["variance"]["axisY"].length; i += 1) {
            // debugger
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

function gen_geoTrend_X(data_list, list_lat, list_lon, size = 2.5) {
    var size_half = size / 2
    var points = {
        type: 'FeatureCollection',
        features: []
    };
    // debugger
    //  
    for (var lat_index = 0; lat_index < list_lat.length; lat_index += 1) {
        for (var lot_index = 0; lot_index < list_lon.length; lot_index += 1) {

            if (data_list[lat_index][lot_index] == 0) {

                var lon = (list_lon[lot_index] >= 180) ? list_lon[lot_index] - 360 : list_lon[lot_index]
                var lat = list_lat[lat_index]

                points.features.push({
                    type: 'Feature',
                    geometry: {
                        type: 'MultiLineString',
                        coordinates: [
                            [[lon - size_half, lat + size_half], [lon + size_half, lat - size_half]],
                            [[lon - size_half, lat - size_half], [lon + size_half, lat + size_half]],
                        ]
                    }
                })
            }

        }
    }

    return points
}

function removeAll_layer() {
    for (var k_map in map_all) {
        for (var k_layer in tempMapLayer) {
            map_all[k_map].removeLayer(tempMapLayer[k_layer])
        }
    }
}
export function setRightDisplay(avg, max, min, name) {
    $(`.mean${name}Stat`).html(`${avg.toFixed(2)} ${(name == "AVG") ? tempSend["unit"] : `${tempSend["unit"]} / Year`}`)
    $(`.max${name}Stat`).html(`${max.toFixed(2)} ${(name == "AVG") ? tempSend["unit"] : `${tempSend["unit"]} / Year`}`)
    $(`.min${name}Stat`).html(`${min.toFixed(2)} ${(name == "AVG") ? tempSend["unit"] : `${tempSend["unit"]} / Year`}`)
}

export function updateMapWithDate(map, data, geojsonNow) {


    tempMapLayer["geojsonlayer"].clear()



    var tempNewGeojson = new GeoJSON().readFeatures(geojsonNow)

    tempMapLayer["geojsonlayer"].addFeatures(tempNewGeojson)


}

export function genGeojson(list_lat, list_lon, data_list = "", typePca_or_trend = false, date = "") {
    var multi = 1
    if (typePca_or_trend) {
        multi = 100
    }

    // debugger
    var points = {
        type: 'FeatureCollection',
        features: []
    };
    //  
    // var ti = 0
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
    // var totalE = tempSend["lat_list"].length * tempSend["lon_list"].length
    var total = 0
    for (var i = 0; i < array.length; i += 1) {
        for (var j = 0; j < array[i].length; j += 1) {
            if (array[i][j] != -99.99) {
                total += 1
                sum += array[i][j]
            }
        }
    }
    debugger
    return sum / total
}

var find_max_min = function (allGrid) {
    // debugger
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

    // var colorScale = d3.scaleLinear()
    //     .domain(domainScale)
    //     .range(colorScale)
    //     .interpolate(d3.interpolateHcl);
    return colorScale
}
function createLegend(colorScale, domainScale, target) {

    var width = Math.floor(100 / domainScale.length)
    for (var i = 0; i < colorScale.length; i += 1) {
        var temDiv = `<div 
            style=" 
                height:60%; 
                width: ${width}%; 
                border: 1px solid black;
                font-size: 10px; 
                color: ${(i == Math.floor(colorScale.length / 2)) ? "black" : "white"};
                background: ${colorScale[i]}; 
                float: left"
                >${(i == 0 || i == colorScale.length - 1 || i == Math.floor(colorScale.length / 2)) ? domainScale[i].toFixed(1) : ""}</div>`

        $(`#${target}_legend`).append(temDiv)
    }

    // var colorTh = d3.scaleThreshold()
    // .domain(domainScale)
    // .range(colorScale)


    // var x = d3.scaleLinear()
    //     .domain(domainScale)
    //     .range(colorScale)

    // var xAxis = d3.axisBottom()
    //     .scale(x)
    //     .tickSize(14)
    //     .tickValues(x.domain());
    // console.log(`#${target}_legend`)
    // var svg = d3.select(`#${target}_legend`);
    // debugger
    // svg.selectAll('rect')
    //     .data(colorTh.range().map(function(color) {
    //         var d = colorTh.invertExtent(color);
    //         if (d[0] == null) d[0] = x.domain()[0];
    //         if (d[1] == null) d[1] = x.domain()[1];
    //         return d;
    //     }))
    //     .enter().append('rect')
    //     .attr('height', 10)
    //     .attr("x", function(d) { return x(d[0]); })
    //     .attr('width', function(d) { return x(d[1]) - x(d[0]); })
    //     .style('fill', function(d) { return colorTh(d[0]); });

    // svg.call(xAxis);

    debugger
}

export function genGridData(geojson, gridSize, max_min, name, ary_color) {

    var max = max_min[0]
    var min = max_min[1]

    var absMin = Math.abs(min)
    var absMax = Math.abs(max)
    if (absMax > absMin) {
        max = absMax
        min = absMax * -1
    } else {
        max = absMin
        min = absMin * -1

    }
    debugger
    var tem = []
    if (name == "sourceDataColorAVG") {
        var val_max = max + Math.abs(min)
        for (let i = 0; i < ary_color.length; i++) {
            tem.push(max - i * (val_max / ary_color.length))
        }
        tem = tem.sort((a, b) => a - b)
        console.log(tem)
    } else {
        var temp0 = max / Math.floor(ary_color.length / 2)
        for (let i = 0; i < ary_color.length; i++) {
            tem.push(min)
            min += temp0
        }
    }

    debugger
    // var val_max = max + Math.abs(min)
    // for (let i = 0; i < ary_color.length; i++) {
    //     tem.push(max - i * (val_max / ary_color.length))
    // }
    // tem = tem.sort((a, b) => a - b)
    // console.log(tem)

    // var temp0 = Math.floor(max / 2)

    createLegend(ary_color, tem, name)

    debugger
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
    $(".Refresh").on("click", function(e){
        e.preventDefault()
        // alert("Reflesh Page")
        location.reload();
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
