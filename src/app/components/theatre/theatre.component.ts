import { Component, OnInit, Input } from '@angular/core';
import { Theatre } from '../../model/theatre.model';
import {Router, ActivatedRoute} from '@angular/router';
import { TheatreService } from '../../services/theatre.service';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {



  @Input() theatre: Theatre;
  latitude : number =  45.2671;
  longitude : number =  19.8335;
  message: string;
  id: number;
  theatres : Theatre[] = [];
  showmap = false;
  openPl = false;
  openPr = false;
  week = false;
  day = false;
  year = false;

  //za NEDELJNU STATISTIKU
 public lineChartData:Array<any> = [
  {data: [4, 5, 1, 4, 10, 14, 19], label: 'Weekly stat'}
];
public lineChartLabels:Array<any> = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'];
public lineChartOptions:any = {
  responsive: true
};
public lineChartColors:Array<any> = [
  { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  { // dark grey
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: 'rgba(77,83,96,1)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
  { // grey
    backgroundColor: 'rgba(148,148,148,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
];
public lineChartLegend:boolean = true;
public lineChartType:string = 'line';

//zA GODISNJU STATISTIKU
public lineChartData1:Array<any> = [
  [65, 59, 80, 81, 56, 55, 40, 12, 35, 45, 45, 59, 90],
];
public lineChartLabels1:Array<any> = ['Annualy stat', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
public lineChartType1:string = 'line';
public pieChartType:string = 'pie';

//ZA DNEVNU STATISTIKU
public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels:string[] = ['12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

public barChartData:any[] = [
  {data: [12, 15, 28, 29, 47, 49, 46, 51, 57, 62, 56], label: 'Daily stat'},
];



  constructor(public theatreService: TheatreService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(window.location.href);
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
       this.theatreService.getOne(this.id).subscribe(
        (resp: Theatre) => {
          this.theatre = resp;
        }, error => {
          this.message = error;
        }
      );
   });
   console.log(window.location.href);
  }
  openPlays() {
    this.openPr = false;
    this.openPl = true;
   
  
  }
  openProjection(){
    this.openPl = false;
    this.openPr = true;
 
  }

  showMap(){
    if(this.showmap) {
      this.showmap = false;
    } else {
      this.showmap = true;
    }
  }
  onChooseLocation(event){
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }


  

  annuallyStat() {
    if(this.year) {
      this.year = false;
    } else {
      this.year = true;
    }
  }
 

  weeklyStat() {
    if(this.week) {
      this.week = false;
    } else {
      this.week = true;
    }
  }
  dailyStat() {
    if(this.day) {
      this.day = false;
    } else {
      this.day = true;
    }
  }

//ZA MESECNU
public randomize():void {
  let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  for (let i = 0; i < this.lineChartData.length; i++) {
    _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    for (let j = 0; j < this.lineChartData[i].data.length; j++) {
      _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    }
  }
  this.lineChartData = _lineChartData;
}

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

//ZA GODISNJU
public randomizeType():void {
  this.lineChartType1 = this.lineChartType1 === 'line' ? 'bar' : 'line';
  this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
}

public chartClicked1(e:any):void {
  console.log(e);
}

public chartHovered1(e:any):void {
  console.log(e);
}


//ZA DNEVNU STATISTIKU
 
  // events
  public chartClicked2(e:any):void {
    console.log(e);
  }
 
  public chartHovered2(e:any):void {
    console.log(e);
  }
 
  public randomize2():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
  

 
}
