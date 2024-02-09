var nodes = null;
var edges = null;
var network = null;
var colID = null; //variable for node click ID
var assetsDataArray = []; //array for data set
//Data array starts here
var assetsDataArray = {
  "101": {
    "CarBrands": {
      "101": {
        "Audi": {
          "201": "Maintenance",
          "202": "Repair",
          "203": "Parts Replacement"
        },
        "BMW": {
          "301": "Oil Change",
          "302": "Tire Rotation",
          "303": "Brake Service"
        }
      }
    }
  },
  "202": {
    "CarBrands": {
      "202": {
        "Volkswagen": {
          "401": "Diagnostic Check",
          "402": "Engine Tune-up",
          "403": "Electrical Repair"
        },
        "Benz": {
          "501": "Transmission Service",
          "502": "Suspension Repair"
        }
      }
    }
  },
  "303": {
    "CarBrands": {
      "303": {
        "Porsche": {
          "601": "AC Repair",
          "602": "Alignment"
        },
        "Bugatti": {
          "701": "Cooling System Service",
          "702": "Fuel Injection Cleaning"
        }
      }
    }
  }
}
//Data array ends here
var nodes = new vis.DataSet(); 
var edges = new vis.DataSet();
if(assetsDataArray != ''){ 
  callDataArray(); //called function to retrive the array data
}
//function for array call starts here
function callDataArray(colID = '', toggle = ''){ 
  if(colID != '' && assetsDataArray.hasOwnProperty(colID) ){
    toggle = !toggle;
  }else{
    toggle = false;
  } 
  var arrayDataNodesCount =  Object.keys(assetsDataArray).length; //count of array
  jQuery.each(assetsDataArray, function(assetid) { 
    if(colID != ''){
      if(colID == assetid) {
        assetid = !colID; //taking the selected asset
      } else {
        assetid = colID;
      }
    } else {
      var initialID = Object.keys(assetsDataArray)[0]; //console.log(initialID+'-'+ assetid);
    }
    var WIDTH_SCALE = 0.5;
    var arrayDataNodesCount =  Object.keys(assetsDataArray).length; //count of array
    if(arrayDataNodesCount <= 2 )
      var lengthEdge = 130;
    else
      var lengthEdge = (arrayDataNodesCount * 130);
    var assetsLinksData = assetsDataArray[assetid];
    jQuery.each(assetsLinksData, function(assetLink) { 
      var assetsLinksObjects = assetsLinksData[assetLink];
      jQuery.each(assetsLinksObjects, function(assetnodeKey) { 
        var assetsTypeObjects = assetsLinksObjects[assetnodeKey];
        var nodesObjCount = Object.keys(assetsTypeObjects).length;
        if(nodesObjCount <= 3)
          var LENGTH_MAIN = 120; 
        else
          var LENGTH_MAIN = (nodesObjCount*50); 
        jQuery.each(assetsTypeObjects, function(assetTypeName) { 
          var assetsTypeValues = assetsTypeObjects[assetTypeName]; 
          if(colID != ''){
            var nodeLength = Object.keys(assetsTypeValues).length*70;  
          }
          //console.log(assetid +'-'+Object.keys(assetsTypeValues)[0]);
          switch(assetTypeName)
          {
            case 'Audi':
              var shapeIconlabel = '\uf109';
              var shapeIconColor = '#10b2fe';
              break;
            case 'BMW':
              var shapeIconlabel = '\uf233';
              var shapeIconColor = '#690e6d';
              break;
            case 'Volkswagen':
              var shapeIconlabel = '\uf28d';
              var shapeIconColor = '#000000';
              break;
            case 'Benz':
              var shapeIconlabel = '\uf19c';
              var shapeIconColor = '#f19814';
              break;
            case 'Porsche':
              var shapeIconlabel = '\uf19c';
              var shapeIconColor = '#ff1493';
              break;
            case 'Bugatti':
              var shapeIconlabel = '\uf19c';
              var shapeIconColor = '#2d8c0d';
              break;
            case 'vtProcessors':
              var shapeIconlabel = '\uf1e0';
              var shapeIconColor = '#808000';
              break;
            case 'bProcesses':
              var shapeIconlabel = '\uf1e0';
              var shapeIconColor = '#ffd700';
              break;
            case 'itProcesses':
              var shapeIconlabel = '\uf1e0';
              var shapeIconColor = '#00fa9a';
              break;
            case 'informationCategories':
              var shapeIconlabel = '\uf19c';
              var shapeIconColor = '#ffa07a';
              break;  
            case 'tasks':
              var shapeIconlabel = '\uf14a';
              var shapeIconColor = '#ff4500';
              break;
            case 'default':
              var shapeIconlabel = '\uf03a';
              var shapeIconColor = '#800000';
              break;                       
          }
          jQuery.each(assetsTypeValues, function(assetsTypeValueId,typeLabel) {
            //console.log(assetid +'-'+ assetsTypeValueId);
            let drawitem = true; 
            var nodeArray = nodes.get(nodes[0]); //checking duplicate ids from nodes
            $.each(nodeArray, function(nodesid,nodesitem){  
              if(nodesitem.value == assetsTypeValueId && colID == '') {
                //console.log(nodesitem.value +'-'+ assetsTypeValueId);
                drawitem = false; 
              }
              else if(colID == assetsTypeValueId && colID != '') {
                //console.log(nodesitem.value +'-'+ assetsTypeValueId);
                drawitem = false; 
              } 
            });  //console.log(drawitem+'-'+assetid +'-'+ assetsTypeValueId);
            if(drawitem) {
              if(colID != ''){ 
                if(assetsDataArray.hasOwnProperty(assetsTypeValueId) && toggle == true) {
                  assetsTypeValueId = null;
                } 

                if(assetsDataArray.hasOwnProperty(assetsTypeValueId)){
                  var nodeColor = '#153c65'; //asset color to identify
                  var fontColor = '#153c65';
                  var physicsSet = true;
                  var lengthSet = lengthEdge;
                  var iconSize = 50;
                } else {
                  var nodeColor = shapeIconColor;
                  var fontColor = '#153c65';
                  var physicsSet = null;
                  var lengthSet = LENGTH_MAIN;
                  var iconSize = 50;
                }
                //console.log(toggle+'-'+assetid +'-'+ assetsTypeValueId);
                nodes.update([
                  {id: assetsTypeValueId, title:assetTypeName, label: typeLabel, value: assetsTypeValueId,hidden:toggle,physics:physicsSet , shape:'icon',icon: { face: "'FontAwesome'", code: shapeIconlabel, size: iconSize, color: nodeColor }, font: { color:fontColor}}, 
                ]); 
                edges.update([
                  {id:assetsTypeValueId,from: colID, to: assetsTypeValueId,hidden:toggle, smooth: false,fixed:true, length: lengthSet }, 
                ]);
              } 
              if(colID == '') {
                if( assetsDataArray.hasOwnProperty(assetsTypeValueId) ){
                  nodes.update([
                    {id: assetsTypeValueId, title:assetTypeName, label: typeLabel, value: assetsTypeValueId,hidden:toggle,physics:false, shape:'icon',icon: { face: "'FontAwesome'", code: shapeIconlabel, size: 50, color: '#153c65' }, font:{ color:'#153c65'} }, 
                  ]); 
                }
                edges.update([
                  {id:assetsTypeValueId,from: assetid, to: assetsTypeValueId, smooth: false,hidden:toggle,color:'#153c65', width: WIDTH_SCALE * 3, length: lengthEdge}, 
                ]);
              }
            }
          }); 
        });
      });
    });
  });
}
//function for array call ends here
var containerShow = document.getElementById('assetsVisJs');
var dataDrawCategories = {
  nodes: nodes,
  edges: edges
};
var options = {
  edges: {
    color: '#153c65',
    arrows: {
      //to: { enabled:true, scaleFactor:0.5, type: 'arrow'},
    }
  },
  interaction: { hover: true },
  physics: {
    forceAtlas2Based: {
      gravitationalConstant: -15,
      centralGravity: 0.005,
      springLength: 120,
      springConstant: 0.18,
      avoidOverlap: 1.5
    },
    maxVelocity: 12,
    timestep: 0.35,
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 1
    }
  }
};
var network = new vis.Network(containerShow, dataDrawCategories, options);
//code to disable the physics 
network.on("stabilizationIterationsDone", function () {
  network.setOptions( { physics: true } );
});
//code to disable the physics 
//hovernode & blur node to change the cursor while moving over the nodes
network.on("hoverNode", function (params) {
  network.canvas.body.container.style.cursor = 'pointer'
});
network.on("blurNode", function (params) {
  network.canvas.body.container.style.cursor = 'default'
});
var toggle = true; // true=hide; false=show
network.on("click", function(e) { //console.log(toggle);
  var nodeCollapseArray = nodes.get(e.nodes[0]); //alert(JSON.stringify(nodeCollapseArray));
  //console.log(nodeCollapseArray);
  if(e.nodes[0] != '' && e.nodes[0] != undefined){
    var clickCalID = e.nodes[0]; 
    callDataArray(clickCalID,toggle); //function call to retrieve assets nodes
  }
  //network.fit();
  toggle = !toggle; // switching toggle
});
