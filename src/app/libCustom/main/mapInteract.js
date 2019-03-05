import Vector from 'ol/layer/Vector'
import sourceVector from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Draw, Select } from 'ol/interaction'
import Overlay from 'ol/Overlay'
import { click, pointerMove, altKeyOnly } from 'ol/events/condition.js';
import souceVector from 'ol/source/Vector'

import { boundingExtent } from 'ol/extent'
import { fromLonLat, toLonLat } from 'ol/proj'
import { genChart, tempSend, tempMapLayer, tempInteract, tempSourceLayer, domainIP, highchartsModule } from './visualize'
import { Circle as CircleStyle, RegularShape, Fill, Stroke, Style } from 'ol/style.js';


import * as $ from 'jquery'

export function selectCustom(map) {
  debugger
  if (tempMapLayer["interactive"] != undefined) {
    map.removeLayer(tempMapLayer["interactive"])
    tempMapLayer["interactive"] = undefined
  }
  if (tempInteract["interactive"] != undefined) {
    map.removeInteraction(tempInteract["interactive"])
    tempInteract["interactive"] = undefined
  }

  map.addLayer(tempMapLayer["baselayer"])

  console.log("################### Select Custom #########################")

  var gjson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "MultiPoint",
          "coordinates": [[102.584932, 12.186595], [101.687158, 12.64574], [100.83181, 12.627085], [100.978467, 13.412722], [100.097797, 13.406856], [100.018733, 12.307001], [99.478921, 10.846367], [99.153772, 9.963061], [99.222399, 9.239255], [99.873832, 9.207862], [100.279647, 8.295153], [100.459274, 7.429573], [101.017328, 6.856869], [101.623079, 6.740622], [102.141187, 6.221636], [101.814282, 5.810808], [101.154219, 5.691384], [101.075516, 6.204867], [100.259596, 6.642825], [100.085757, 6.464489], [99.690691, 6.848213], [99.519642, 7.343454], [98.988253, 7.907993], [98.503786, 8.382305], [98.339662, 7.794512], [98.150009, 8.350007], [98.25915, 8.973923], [98.553551, 9.93296], [99.038121, 10.960546], [99.587286, 11.892763], [99.196354, 12.804748], [99.212012, 13.269294], [99.097755, 13.827503], [98.430819, 14.622028], [98.192074, 15.123703], [98.537376, 15.308497], [98.903348, 16.177824], [98.493761, 16.837836], [97.859123, 17.567946], [97.375896, 18.445438], [97.797783, 18.62708], [98.253724, 19.708203], [98.959676, 19.752981], [99.543309, 20.186598], [100.115988, 20.41785], [100.548881, 20.109238], [100.606294, 19.508344], [101.282015, 19.462585], [101.035931, 18.408928], [101.059548, 17.512497], [102.113592, 18.109102], [102.413005, 17.932782], [102.998706, 17.961695], [103.200192, 18.309632], [103.956477, 18.240954], [104.716947, 17.428859], [104.779321, 16.441865], [105.589039, 15.570316], [105.544338, 14.723934], [105.218777, 14.273212], [104.281418, 14.416743], [102.988422, 14.225721], [102.348099, 13.394247], [102.584932, 12.186595]]
        },
        "properties": {
          "f": "th",
          "value": 43.2,
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [101.523186, 14.736717]
        },
        "properties": {
          "f": "th",
          "value": 45.3
        }
      }
      ///////////// Ch 
      ,
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [114.363625, 42.913818]
        },
        "properties": {
          "f": "ch",
          "value": 23.5
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [100.363625, 30.913818]
        },
        "properties": {
          "f": "ch",
          "value": 22.1
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [85.363625, 35.913818]
        },
        "properties": {
          "f": "ch",
          "value": 20
        }
      }
      /////////////// Brazil
      ,
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-46.625290, -10.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 1
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-44.625290, -15.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 2
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-56.625290, -10.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 3
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-48.625290, -23.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 4
        }
      },
      //////////////////////////////////////
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-60.625290, -25.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-61.625290, -21.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-57.625290, -23.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-65.625290, -19.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-66.625290, -11.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 0
        }
      }

      ////////////////// Brazil
      ,
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [139.839478, 35.652832]
        },
        "properties": {
          "f": "jp",
          "value": 100.5
        }
      }
    ]
  }

  debugger

  // var image = new CircleStyle({
  //   radius: 5,
  //   stroke: new Stroke({ color: 'red', width: 1 })
  // });

  var stylesNew = {
    'Point': new Style({
      image: new RegularShape({
        fill: new Fill({ color: [255, 255, 255, 1] }),
        stroke: new Stroke({ color: [0, 0, 0, 1] }),
        points: 4,
        radius: 10,
        radius2: 0,
        angle: Math.PI / 4
      })
    }),
    'LineString': new Style({
      stroke: new Stroke({
        color: 'green',
        width: 1
      })
    }),
    'MultiLineString': new Style({
      stroke: new Stroke({
        color: 'green',
        width: 1
      })
    }),
    // 'MultiPoint': new Style({
    //   image: image
    // }),
    'MultiPolygon': new Style({
      stroke: new Stroke({
        color: 'yellow',
        width: 1
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 0, 0.1)'
      })
    }),
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'blue',
        lineDash: [4],
        width: 3
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      })
    }),
    'GeometryCollection': new Style({
      stroke: new Stroke({
        color: 'magenta',
        width: 2
      }),
      fill: new Fill({
        color: 'magenta'
      }),
      image: new CircleStyle({
        radius: 10,
        fill: null,
        stroke: new Stroke({
          color: 'magenta'
        })
      })
    }),
    'Circle': new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.2)'
      })
    })
  };

  debugger

  var styleFunction = function (feature) {
    return stylesNew[feature.getGeometry().getType()];
  };

  var gridtest = new sourceVector({
    features: (new GeoJSON()).readFeatures(gjson),
    // wrapX: false
  })
  debugger
  var gridLayer = new Vector({
    source: tempSourceLayer["baseGeoAll"]
    // style: styleFunction
  });
  debugger
  // map.addLayer(gridLayer)
  debugger
  var select = new Select();
  map.addInteraction(select);

  //////////////// ADD Drawing /////////////////

  var drawingSource = new sourceVector();

  /////   Add drawing layer

  var drawingLayer = new Vector({
    source: drawingSource
  });
  tempMapLayer["drawingLayer"] = drawingLayer

  map.addLayer(tempMapLayer["drawingLayer"]);
  console.log(tempMapLayer)
  debugger

  // Drawing interaction
  var draw = new Draw({
    source: drawingSource,
    type: 'Polygon',
    //only draw when Ctrl is pressed.
    // condition : ol.events.condition.platformModifierKeyOnly
  });

  tempInteract["interactive"] = draw
  map.addInteraction(tempInteract["interactive"]);

  debugger
  draw.on('drawstart', function (e) {
    // debugger
    drawingSource.forEachFeature((r) => {
      drawingSource.removeFeature(r)
    })
    select.setActive(false);
  })

  draw.on('drawend', function (e) {
    debugger
    e.preventDefault();

    // features that intersect the box are added to the collection of
    // selected features, and their names are displayed in the "info"
    // div



    var poly = e.feature.getGeometry()


    // var tempFeatrueinpoly = []
    ///////////////////////// Map Now //////////////////////
    // tempFeatrueinpoly.push("ssss")
    var temp_lat_long_index0 = []
    var features = tempSourceLayer["baseGeoAll"].getFeatures()
    for (var i = 0; i < features.length; i++) {
      if (poly.intersectsExtent(features[i].getGeometry().getExtent())) {
        var obj = features[i].getProperties()
        var temp = find_index_lat_long(obj["lat"], obj["lon"])
        temp_lat_long_index0.push(temp)

      }
    }

    console.log(temp_lat_long_index0)
    fetch(`${domainIP}/api/getdata/selectGraph/`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          custom: temp_lat_long_index0,
          type_dataset: tempSend["dataset"],
          yearInit: tempSend["year_global"][0],
          yearEnd: tempSend["year_global"][1],
          type_index: tempSend["index_name"]
        }
      )
    }).then(function (res) {
      // debugger
      return res.json();
    }).then(function (result) {
      alert("Have Graph Custom Data ")
      debugger
      highchartsModule["HighchartAVG"].addSeries({
        name: `${result["detail"]["detail"]["index_name"]} Custom`,
        data: result["graph"]["graphAVG"]["axisY"],
        color: "green"
      })
      highchartsModule["HighchartAVG_ANN"].addSeries({
        name: `${result["detail"]["detail"]["index_name"]} Custom`,
        data: result["graph"]["graphAVGAnn"]["axisY"],
        color: "purple"
      })
      highchartsModule["HighchartSeason"].addSeries({
        name: `${result["detail"]["detail"]["index_name"]} Custom`,
        data: result["graph"]["graphSeasonal"]["axisY"],
        color: "black"
      })

      highchartsModule["HighchartAVG_ANN"].addSeries({
        name: `linear ${result["detail"]["detail"]["index_name"]} Custom`,
        data: result["graph"]["graphAVGAnn"]["TaxisY"],
        color: "red"
      })

      highchartsModule["HighchartAVG"].addSeries({
        name: `linear ${result["detail"]["detail"]["index_name"]} Custom`,
        data: result["graph"]["graphAVG"]["TaxisY"],
        color: "red"
      })

    })

    var features = tempSourceLayer["sourceDataColorAVG"].getFeatures()
    debugger
    console.log(tempSend["lat_list"])
    console.log(tempSend["lon_list"])

    var state = 0
    var sum = 0
    var max = 0
    var min = 0

    var temp_lat_long_index = []
    // var features = grid.getFeatures()
    for (var i = 0; i < features.length; i++) {
      if (poly.intersectsExtent(features[i].getGeometry().getExtent())) {
        var obj = features[i].getProperties()
        if (state == 0) {
          max = obj["value"]
          min = obj["value"]
          state += 1
        }
        if (obj["value"] > max) {
          max = obj["value"]
        } else if (obj["value"] < min) {
          min = obj["value"]
        }
        // debugger
        sum += obj["value"]
        var temp = find_index_lat_long(obj["lat"], obj["lon"])
        temp_lat_long_index.push(temp)

      }
    }
    debugger
    setRightDisplayC((sum / temp_lat_long_index.length), max, min, "AVG")




  });
}


var find_index_lat_long = function (lat, lon, lat_list = tempSend["lat_list"], lon_list = tempSend["lon_list"]) {
  var index_lat = lat_list.indexOf(lat)
  var index_lon = lon_list.indexOf(lon)
  return [index_lat, index_lon]
}

function AsynTest(callback) {
  setTimeout(function () {
    return callback()
  }, 1)
}

// function calSeasonCustom(listData, seasonArr, poly) {
//   var tempSeasonData = []
//   seasonArr = seasonArr.slice(1, seasonArr.length)
//   for (var i = 0; i < seasonArr.length; i++) {
//     tempSeasonData.push(undefined)
//   }

//   for (var i = 0; i < seasonArr.length; i++) {
//     var sumout = 0
//     var tempFeature = []
//     // debugger
//     for (var k = 0; k < listData[seasonArr[i]].length; k++) {
//       var sumin = 0
//       var gridTemp = new souceVector({
//         features: (new GeoJSON()).readFeatures(listData[seasonArr[i]][k]),
//       })
//       var features = gridTemp.getFeatures()
//       // debugger
//       for (var j = 0; j < features.length; j++) {
//         if (poly.intersectsExtent(features[j].getGeometry().getExtent())) {
//           tempFeature.push(features[j])
//           sumin += features[j].getProperties().value
//           // console.log(seasonArr[i], k, features[j].getProperties().value)
//         }
//       }
//       // debugger
//       sumout += (sumin / tempFeature.length)
//       tempFeature = []
//       // tempSeasonData[i] = parseFloat((sumin / tempFeature.length).toFixed(2))
//       // tempFeature = []
//       // arrayAvgGraph.push(parseFloat((sumt / tempFeature.length).toFixed(2)))
//     }
//     tempSeasonData[i] = parseFloat((sumout / listData[seasonArr[i]].length).toFixed(2))
//   }
//   console.log(tempSeasonData)
//   // debugger
//   // var arrayMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//   // AsynTest(function(){
//   //   var index = 0
//   genChart("graphSelectSeasonal",
//     tempSeasonData,
//     seasonArr,
//     tempSend["name_index"],
//     "Seasonal Select Custom",
//     tempSend["name_graphS"],
//     tempSend["ylabel"],
//     tempSend["unit"],
//     "#FEBDBD",
//     "spline"
//   )
//   tempSeasonData = []
//   // })
// }

export function selectOnePoint(map) {
  console.log("################### Select One Point ###################")
  var container = document.getElementById('popup');
  var content = document.getElementById('popup-content');
  var closer = document.getElementById('popup-closer');

  var overlay = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });

  // closer.onclick = function() {
  //     overlay.setPosition(undefined);
  //     closer.blur();
  //     return false;
  //   };


  // closer.onclick = function() {
  //   overlay.setPosition(undefined);
  //   closer.blur();
  //   return false;
  // };

  map.addOverlay(overlay)

  map.on('click', function (evt) {

    var coordinate = evt.coordinate;
    // var hdms = toStringHDMS(toLonLat(coordinate));
    var hdms = coordinate
    console.log(hdms)

    // var pos = fromLonLat([16.3725, 48.208889]);

    // // Vienna marker
    // var marker = new Overlay({
    //     position: pos,
    //     positioning: 'center-center',
    //     element: document.getElementById('marker'),
    //     stopEvent: false
    // });
    // map.addOverlay(marker);


    $("#popup-content").innerHTML = "sdsadsa"
    content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
      '</code>';

    overlay.setPosition(coordinate);
  });

}


export function selectFeatureCountry(map, geoVector, typeUse) {

  console.log("################### Select Country #########################")

  map.removeLayer(tempMapLayer["baselayer"])
  if (tempMapLayer["interactive"] != undefined) {
    map.removeLayer(tempMapLayer["interactive"])
    tempMapLayer["interactive"] = undefined
    console.log(tempMapLayer)
  }
  if (tempInteract["interactive"] != undefined) {
    map.removeInteraction(tempInteract["interactive"])
    tempInteract["interactive"] = undefined
  }
  debugger
  var gjson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "MultiPoint",
          "coordinates": [[102.584932, 12.186595], [101.687158, 12.64574], [100.83181, 12.627085], [100.978467, 13.412722], [100.097797, 13.406856], [100.018733, 12.307001], [99.478921, 10.846367], [99.153772, 9.963061], [99.222399, 9.239255], [99.873832, 9.207862], [100.279647, 8.295153], [100.459274, 7.429573], [101.017328, 6.856869], [101.623079, 6.740622], [102.141187, 6.221636], [101.814282, 5.810808], [101.154219, 5.691384], [101.075516, 6.204867], [100.259596, 6.642825], [100.085757, 6.464489], [99.690691, 6.848213], [99.519642, 7.343454], [98.988253, 7.907993], [98.503786, 8.382305], [98.339662, 7.794512], [98.150009, 8.350007], [98.25915, 8.973923], [98.553551, 9.93296], [99.038121, 10.960546], [99.587286, 11.892763], [99.196354, 12.804748], [99.212012, 13.269294], [99.097755, 13.827503], [98.430819, 14.622028], [98.192074, 15.123703], [98.537376, 15.308497], [98.903348, 16.177824], [98.493761, 16.837836], [97.859123, 17.567946], [97.375896, 18.445438], [97.797783, 18.62708], [98.253724, 19.708203], [98.959676, 19.752981], [99.543309, 20.186598], [100.115988, 20.41785], [100.548881, 20.109238], [100.606294, 19.508344], [101.282015, 19.462585], [101.035931, 18.408928], [101.059548, 17.512497], [102.113592, 18.109102], [102.413005, 17.932782], [102.998706, 17.961695], [103.200192, 18.309632], [103.956477, 18.240954], [104.716947, 17.428859], [104.779321, 16.441865], [105.589039, 15.570316], [105.544338, 14.723934], [105.218777, 14.273212], [104.281418, 14.416743], [102.988422, 14.225721], [102.348099, 13.394247], [102.584932, 12.186595]]
        },
        "properties": {
          "f": "th",
          "value": 43.2,
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [101.523186, 14.736717]
        },
        "properties": {
          "f": "th",
          "value": 45.3
        }
      }
      ///////////// Ch 
      ,
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [114.363625, 42.913818]
        },
        "properties": {
          "f": "ch",
          "value": 23.5
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [100.363625, 30.913818]
        },
        "properties": {
          "f": "ch",
          "value": 22.1
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [85.363625, 35.913818]
        },
        "properties": {
          "f": "ch",
          "value": 20
        }
      }
      /////////////// Brazil
      ,
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-46.625290, -10.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 1
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-44.625290, -15.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 2
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-56.625290, -10.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 3
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-48.625290, -23.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 4
        }
      },
      //////////////////////////////////////
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-60.625290, -25.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-61.625290, -21.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-57.625290, -23.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-65.625290, -19.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 0
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-66.625290, -11.533773]
        },
        "properties": {
          "f": "Brazil",
          "value": 0
        }
      }

      ////////////////// Brazil
      ,
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [139.839478, 35.652832]
        },
        "properties": {
          "f": "jp",
          "value": 100.5
        }
      }
    ]
  }

  var gridtest = new sourceVector({
    features: (new GeoJSON()).readFeatures(gjson),
    // wrapX: false
  })

  // var gridLayer = new Vector({
  //   source: gridData
  // });

  // map.addLayer(gridLayer)

  tempMapLayer["interactiveGeoCountry"] = geoVector
  map.addLayer(tempMapLayer["interactiveGeoCountry"])

  var selectClick = new Select({
    condition: click
  })

  tempInteract["interactive"] = selectClick
  map.addInteraction(tempInteract["interactive"])
  debugger
  // console.log(year)
  // console.log(typeUse)

  selectClick.on('select', function (e) {
    debugger
    var feature_name = e.target.getFeatures().array_[0].values_.name
    var feature_id = e.target.getFeatures().array_[0].getId()
    // var coors = e.selected[0].getGeometry().getCoordinates()
    // var temp = {'data': coors, 'typeUse': typeUse, 'year': year}
    // console.log(coors)
    // console.log(find_lat_lon(coors[0][0][1]))
    // console.log(coors.length)
    // var features = tempSourceLayer["baseGeoAll"].getFeatures()

    var poly = e.selected[0].getGeometry()



    debugger
    console.log(tempSend["lat_list"])
    console.log(tempSend["lon_list"])

    var temp_lat_long_index0 = []
    var features = tempSourceLayer["baseGeoAll"].getFeatures()
    for (var i = 0; i < features.length; i++) {
      if (poly.intersectsExtent(features[i].getGeometry().getExtent())) {
        var obj = features[i].getProperties()
        var temp = find_index_lat_long(obj["lat"], obj["lon"])
        temp_lat_long_index0.push(temp)

      }
    }

    console.log(temp_lat_long_index0)
    fetch(`${domainIP}/api/getdata/selectGraph/`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          custom: temp_lat_long_index0,
          type_dataset: tempSend["dataset"],
          yearInit: tempSend["year_global"][0],
          yearEnd: tempSend["year_global"][1],
          type_index: tempSend["index_name"]
        }
      )
    }).then(function (res) {
      // debugger
      return res.json();
    }).then(function (result) {
      alert("Have Graph Country Data ")
      debugger
      highchartsModule["HighchartAVG"].addSeries({
        name: `${result["detail"]["detail"]["index_name"]} ${feature_name}`,
        data: result["graph"]["graphAVG"]["axisY"],
        color: "green"
      })
      highchartsModule["HighchartAVG_ANN"].addSeries({
        name: `${result["detail"]["detail"]["index_name"]} ${feature_name}`,
        data: result["graph"]["graphAVGAnn"]["axisY"],
        color: "purple"
      })
      highchartsModule["HighchartSeason"].addSeries({
        name: `${result["detail"]["detail"]["index_name"]} ${feature_name}`,
        data: result["graph"]["graphSeasonal"]["axisY"],
        color: "black"
      })

      highchartsModule["HighchartAVG_ANN"].addSeries({
        name: `linear ${result["detail"]["detail"]["index_name"]} Custom`,
        data: result["graph"]["graphAVGAnn"]["TaxisY"],
        color: "red"
      })

      highchartsModule["HighchartAVG"].addSeries({
        name: `linear ${result["detail"]["detail"]["index_name"]} Custom`,
        data: result["graph"]["graphAVG"]["TaxisY"],
        color: "red"
      })

    })

    var state = 0
    var sum = 0
    var max = 0
    var min = 0

    var features = tempSourceLayer["sourceDataColorAVG"].getFeatures()
    var temp_lat_long_index = []

    // var features = grid.getFeatures()
    for (var i = 0; i < features.length; i++) {
      if (poly.intersectsExtent(features[i].getGeometry().getExtent())) {

        var obj = features[i].getProperties()
        if (state == 0) {
          max = obj["value"]
          min = obj["value"]
          state += 1
        }
        if (obj["value"] > max) {
          max = obj["value"]
        } else if (obj["value"] < min) {
          min = obj["value"]
        }
        debugger
        sum += obj["value"]
        var temp = find_index_lat_long(obj["lat"], obj["lon"])
        temp_lat_long_index.push(temp)

      }
    }
    debugger
    setRightDisplayC((sum / temp_lat_long_index.length), max, min, "AVG")
    // setRightDisplay((sum / temp_lat_long_index.length), max, min, "Trend")

    // console.log(temp_lat_long_index)
    // fetch(`${domainIP}/api/getdata/selectGraph/`, {
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(
    //     {
    //       custom: temp_lat_long_index,
    //       type_dataset: tempSend["dataset"],
    //       yearInit: tempSend["year_global"][0],
    //       yearEnd: tempSend["year_global"][1],
    //       type_index: tempSend["index_name"]
    //     }
    //   )
    // }).then(function (res) {
    //   return res.json();
    // }).then(function (result) {

    //   highchartsModule["HighchartAVG"].addSeries({
    //     name: `${result["detail"]["detail"]["index_name"]} Custom`,
    //     data: result["graph"]["graphAVG"]["axisY"],
    //     color: "green"
    //   })
    //   highchartsModule["HighchartAVG_ANN"].addSeries({
    //     name: `${result["detail"]["detail"]["index_name"]} Custom`,
    //     data: result["graph"]["graphAVGAnn"]["axisY"],
    //     color: "purple"
    //   })
    //   highchartsModule["HighchartSeason"].addSeries({
    //     name: `${result["detail"]["detail"]["index_name"]} Custom`,
    //     data: result["graph"]["graphSeasonal"]["axisY"],
    //     color: "black"
    //   })

    // })

    debugger

    // var i =0
    // g.forEachFeatureIntersectingExtent(ext, (f)=>{
    //     console.log(i,f)
    //     i++
    // })

    // for(var i = 0; i < features.length; i++){
    //     if(poly.intersectsExtent(features[i].getGeometry().getExtent())){
    //         console.log(features[i])	
    //     }
    // }

    // if(coors.length == 1){
    //     var N = coors[0].length
    //     var tempArr = []
    //     var data = coors[0] 
    //     for(var i = 0 ; i < N; i++){
    //         var coor = data[i]
    //         tempArr.push([find_lat_lon(coor[0]), find_lat_lon(coor[1])])
    //     }
    // }
    // console.log(tempArr)

    // else:
    //     data = jsond['data']
    //     N = len(data)
    //     tempArr = []
    //     for i in range(0, N):
    //         for j in range(0, len(data[i][0])):
    //             coor = data[i][0][j]
    //             tempArr.append([find_lat_lon(coor[0]), find_lat_lon(coor[1])])

    // debugger
    // $.ajax({
    //     url: "http://127.0.0.1:3000/api/findCoor",
    //     type: "post",
    //     data: JSON.stringify(temp),
    //     success: function(rsult){
    //         console.log("SSSSS")
    //         console.log(rsult)
    //     }
    // });
    // debugger
    // var extent = e.target.getFeatures().array_[0].geometryChangeKey_.target.extent_
    // debugger
    // gridData.forEachFeatureIntersectingExtent(extent, function(feature){
    //     featureTemp.push(feature.values_.f)
    // })

  })
}
function setRightDisplayC(avg, max, min, name) {
  $(`.mean${name}Stat`).html(`${avg.toFixed(2)} ${(name == "AVG") ? tempSend["unit"] : `${tempSend["unit"]} / Year`}`)
  $(`.max${name}Stat`).html(`${max.toFixed(2)} ${(name == "AVG") ? tempSend["unit"] : `${tempSend["unit"]} / Year`}`)
  $(`.min${name}Stat`).html(`${min.toFixed(2)} ${(name == "AVG") ? tempSend["unit"] : `${tempSend["unit"]} / Year`}`)
}