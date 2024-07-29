// *****************************************************************************
// *******************************  Graphique 1  *******************************
// *****************************************************************************

var options = {
    series: [],
    chart: {
        width: 500,
        type: 'pie',
        events: {
          // click: function(event, chartContext, config) {
          //   //console.log(event);
          //   console.log("le click marche");
          //     if (event["target"]["parentNode"]["attributes"]["data:realIndex"]) { // pour gérer les cas où les clics ne sont pas au bon endroit
          //         let index = event["target"]["parentNode"]["attributes"]["data:realIndex"]["nodeValue"];
          //         //console.log(index);
          //         cache(index);
          //     }
          // }
        },
    },
    
    labels: [],
    title: {
      text: ""
    },
    responsive: [{
        breakpoint: 480,
    options: {
        chart: {
        width: 500
        },
        legend: {
        position: 'bottom'
        }
        }
    }]
};

options["series"] = Object.values(valeurs1);
options["labels"] = Object.values(cles1);
// console.log(options);

var chart = new ApexCharts(document.querySelector("#pie"), options);
chart.render();

// *****************************************************************************
// *******************************  Graphique 2  *******************************
// *****************************************************************************

var options = {
  series: [
  ],
  chart: {
      width: 500,
      type: 'donut',
      events: {
      },
  },
  
  labels: [],
  title: {
    text: ""
  },
  responsive: [{
      breakpoint: 480,
  options: {
      chart: {
      width: 500
      },
      legend: {
      position: 'bottom'
      }
      }
  }]
};

options["series"] = Object.values(valeurs2);
options["labels"] = Object.values(cles2);
// console.log(options);

var chart = new ApexCharts(document.querySelector("#pie2"), options);
chart.render();
        
// *****************************************************************************
// *******************************  Graphique 3  *******************************
// *****************************************************************************

var options = {
  series: [
  ],
  chart: {
      width: 500,
      type: 'donut',
      events: {
      },
  },
  
  labels: [],
  title: {
    text: ""
  },
  responsive: [{
      breakpoint: 480,
  options: {
      chart: {
      width: 500
      },
      legend: {
      position: 'bottom'
      }
      }
  }]
};


options["series"] = Object.values(valeurs3);
options["labels"] = Object.values(cles3);
// console.log(options);

var chart = new ApexCharts(document.querySelector("#pie3"), options);
chart.render();
        
// *****************************************************************************
// *******************************  Graphique 4  *******************************
// *****************************************************************************

var colors = ['#FF4560', '#00E396', '#008FFB', '#FEB019', '#FF4560', '#775DD0', '#3F51B5', '#03A9F4', '#4CAF50', '#F9CE1D'];
var options = {
  series: [{
    data: Object.values(valeurs4)
  }],
  chart: {
    height: 350,
    type: 'bar',
    events: {
      click: function(chart, w, e) {
        // console.log(chart, w, e)
      }
    }
  },
  colors: colors,
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: Object.values(cles4),
    labels: {
      style: {
        colors: colors,
        fontSize: '12px'
      }
    }
  }
};

// console.log(options);

var chart = new ApexCharts(document.querySelector("#pie4"), options);
chart.render();

// *****************************************************************************
// *******************************  Graphique 5  *******************************
// *****************************************************************************

var options = {
  series: [{
    data: Object.values(valeurs5)
  }],
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: 'end',
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: Object.values(cles5)
  }
};

// console.log(options);

var chart = new ApexCharts(document.querySelector("#pie5"), options);
chart.render();

// *****************************************************************************
// *******************************  Graphique 6  *******************************
// *****************************************************************************

var options = {
  series: [
  ],
  chart: {
      width: 500,
      type: 'donut',
      events: {
      },
  },
  
  labels: [],
  title: {
    text: ""
  },
  responsive: [{
      breakpoint: 480,
  options: {
      chart: {
      width: 500
      },
      legend: {
      position: 'bottom'
      }
      }
  }]
};

options["series"] = Object.values(valeurs6);
options["labels"] = Object.values(cles6);
// console.log(options);

var chart = new ApexCharts(document.querySelector("#pie6"), options);
chart.render();

// *****************************************************************************
// *******************************  Graphique 7  *******************************
// *****************************************************************************

// var options = {
//   series: [],
//   chart: {
//   width: 500,
//   type: 'polarArea'
// },
// labels: [],
// fill: {
//   opacity: 1
// },
// stroke: {
//   width: 1,
//   colors: undefined
// },
// yaxis: {
//   show: false
// },
// legend: {
//   position: 'bottom'
// },
// plotOptions: {
//   polarArea: {
//     rings: {
//       strokeWidth: 0
//     },
//     spokes: {
//       strokeWidth: 0
//     },
//   }
// },
// theme: {
//   monochrome: {
//     enabled: true,
//     shadeTo: 'light',
//     shadeIntensity: 0.6
//   }
// }
// };

// options["series"] = Object.values(valeurs7);
// options["labels"] = Object.values(cles7);
// // console.log(options);

// var chart = new ApexCharts(document.querySelector("#pie7"), options);
// chart.render();