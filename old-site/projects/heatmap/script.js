var map
  , heatmap
  , data
  , nextTornado = 0
  , month = 1
  , table = $('#results table tbody')
  , currCell = table.find("tr:eq(0) td:eq(1)")
  , currMonthTornados = 0
  ;

function initialize() {
  
  data = new google.maps.MVCArray();
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(40,-96),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{
      stylers: [{saturation: -50}]
    }],
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    draggable: false,
    scrollwheel: false
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    map: map,
    data: data,
    radius: 16,
    dissipate: false,
    maxIntensity: 8,
    gradient: [
      'rgba(0, 0, 0, 0)',
      'rgba(255, 0, 0, 0.50)',
      'rgba(255, 255, 0, 1.0)'
    ]
  });
  
  google.maps.event.addListener(map, 'tilesloaded', function() {
        
  });
  
  $("#submit.btn-primary").on('click', function(e){
    e.preventDefault();
    $(this).addClass('disabled');    
    start();
  });
}

function start() {
  nextDay();
}

function nextDay() {
  if ( !( nextTornado < tornados.length )) {
    table.find("tr.info").removeClass("info");
    $("#submit").removeClass("btn-primary").addClass("btn-success");
    $("#submit").text('Complete');
    return;
  }
  
  var d = tornados[nextTornado].Date.split("/");
  
  if (d[0] > month){
    month++;        
    setTimeout(addData, 2000);        
  }else{
    addData(1);
  }
  
  //console.log(tornados[nextTornado]);
  function addData(clearIt){
    if(!(clearIt == 1)){
      table.find("tr.info").removeClass("info");
      table.find("tr:eq("+(d[0]-1)+")").addClass("info");
      currCell = table.find("tr:eq("+(d[0]-1)+") td:eq(1)");
      data.clear();
      currMonthTornados = 0;
    }
    //console.log(tornados[nextTornado], nextTornado);
    data.push(new google.maps.LatLng(tornados[nextTornado].Lat, tornados[nextTornado].Lng));
    currCell.text(++currMonthTornados);
    nextTornado++;              
    setTimeout(nextDay, 15);
  }
}