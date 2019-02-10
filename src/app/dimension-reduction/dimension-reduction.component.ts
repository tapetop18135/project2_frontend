import { Component, OnInit } from '@angular/core';
import * as mapT from '../libCustom/mapR'
import * as chartT from '../libCustom/chartV'

@Component({
  selector: 'app-dimension-reduction',
  templateUrl: './dimension-reduction.component.html',
  styleUrls: ['./dimension-reduction.component.css']
})
export class DimensionReductionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    mapT.genMapOLV('mapV')
    var mock_data0 = this.mockup_data_gen()
    var mock_data1 = this.mockup_data_gen()
  
    chartT.genGraphV('graphV', mock_data0, mock_data1)

  }

  title = "Dimension Reduction"

  mockup_data_gen(){
    var mock_data = []
    for(var i = 0; i < 11; i++){
      mock_data.push(Math.floor(Math.random() * Math.floor(30)))
    }
    return mock_data
  }
  
}
