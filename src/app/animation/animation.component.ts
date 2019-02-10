import { Component, OnInit } from '@angular/core';
import * as mapT from '../libCustom/mapA'

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    mapT.genMapOLV('mapV')
  }
  title = "Animation"
  
}
