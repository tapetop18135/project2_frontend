import { Component, OnInit } from '@angular/core';
import { DataMapService } from '../data-map.service'
// import * as mapT from '../libCustom/mapV'
import * as chartT from '../libCustom/chartV'
// import * as mapR from '../libCustom/mapreal/map'


import * as visualizeJS from '../libCustom/main/visualize.js'
import * as interactR from '../libCustom/main/mapInteract'

import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.css']
})
export class VisualizeComponent implements OnInit {
  
  title = "Visualization"
  private map
  private yearStart: string;
  private yearStop: string;

  selectArr = ["- Non select -","Select One Point", "Select Country", "Select Custom"]
  selectedOnMap: string = this.selectArr[0]

  selectPeriod = ["- Non select -","January", "February", "March", "April", "May", "June", "July", "August	", "September", "October", "November", "December"]
  selectedPeriod: string = this.selectPeriod[0]

  selectYear = this.genYear(1951, 2010)
  selectedYear: string = this.selectYear[0]

  selectPeriod2 = ["- Non select -","January", "February", "March", "April", "May", "June", "July", "August	", "September", "October", "November", "December"]
  selectedPeriod2: string = this.selectPeriod[0]

  selectYear2 = this.genYear(1951, 2010)
  selectedYear2: string = this.selectYear2[0]

  selectArea = ["- Non select -","World", "Asia", "Africa", "South America", "North America", "Australia", "Europe"]
  selectedArea: string = this.selectArea[0]

  select_dataType = ["- Non select -", "GHCN"]
  selecteddataType: string = this.select_dataType[0]

  select_dataTypeIndex = ["- Non select -", "TXx", "TNn", "TXx PCA", "TNn PCA"]
  selecteddataTypeIndex: string = this.select_dataType[0]


  // Step1Choose: string;
  // Step1Array = ['Dimension Reduction', 'Raw Data'];

  genYear(yinit, yend){
    var array = ["- Non select -"]
    var diff = yend - yinit
    for(var i = 0; i <= diff; i+= 1){
      array.push(yinit)
      yinit += 1
    }
    return array;
  }

  imagePath:string = "app/img/icon/angle-arrow-pointing-to-right.png" 



  constructor() {}

  ngOnInit() {
    // this.yearStart = "1950-02-01"
    // this.yearStop = "1950-02-01"
    // this.yearStart = "2010-08-01"
    // this.yearStop = "2010-08-01"
    // this.map = this.onloadMap(true, this.yearStart, this.yearStop, this.selecteddataType) 
    // console.log(this.map )
    // this.onSelectFeature(this.selectedOnMap)

   

    // var mock_data0 = this.mockup_data_gen()
    // var mock_data1 = this.mockup_data_gen()
    // // mapT.genMapOLV('mapV')
    // chartT.genGraphV('graphV', mock_data0, mock_data1)
    // // mock_data = []
    // var mock_data0 = this.mockup_data_gen()
    // var mock_data1 = this.mockup_data_gen()
    
    // chartT.genGraphV('graphV1', mock_data0, mock_data1)
    
    visualizeJS
  }
  

  onSelectFeature(name_select){
    if(this.map === undefined){
      this.map = visualizeJS.map
    }
    
    if(name_select === "Select One Point"){
      interactR.selectOnePoint(this.map)
    }
    else if(name_select === "Select Custom"){
      interactR.selectCustom(this.map, visualizeJS.GeoJsonList, visualizeJS.grid)
    }
    else if(name_select === "Select Country"){
      var vectorGeo = visualizeJS.vectorLayerGeo 
      interactR.selectFeatureCountry(this.map, visualizeJS.GeoJsonList, vectorGeo, visualizeJS.grid, this.yearStart, this.selecteddataType)
    }else{
      console.log("############## No select #################")
    }
    
    // debugger
  }
  onClickMe(){
    console.log(this.selecteddataType)
    console.log(this.selectedPeriod)
    console.log(this.selectedYear)
    this.onSelectMap
  }

  onSelectMap(name_t){
    // this.map = this.onloadMap(true, '1990-06-1', name) 
    visualizeJS.update_getGee(true, this.yearStart, this.yearStop, name_t, this.map)
  }


  // mockup_data_gen(){
  //   var mock_data = []
  //   for(var i = 0; i < 11; i++){
  //     mock_data.push(Math.floor(Math.random() * Math.floor(30)))
  //   }
  //   return mock_data
  // }

  onloadMap(isReduce, year1, year2, type_data): void{
    // return visualizeJS.getGee(isReduce, year1, year2, type_data)
  }

}

