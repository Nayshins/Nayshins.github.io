function initialize() {

  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });


  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(67.13582938531948, -159.345703125),
      new google.maps.LatLng(-43.96119063892025, -76.376953125));
  map.fitBounds(defaultBounds);
  map.setZoom(6);

  // Create the search box and link it to the UI element.
  var input = (document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox((input));

  function clearOverlays() {
    for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
    }
    markers.length = 0;
  }

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // For each place, get the icon, place name, and location.
    var point = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
        point.extend(place.geometry.location);
    }

    clearOverlays();
    markers = [];
    map.fitBounds(point);
    map.setZoom(9);

    var coords = map.getBounds();
    console.log(coords);
    
    $.ajax({
      url: "http://api.geonames.org/earthquakesJSON?north="+coords.xa.j+"&south="+coords.xa.k+"&east="+coords.pa.k+"&west=" + coords.pa.j + "&maxRows=20&username=jnations1214",
      success: function(data) {
        $.each(data.earthquakes, function( index, value ) {
          var point = new google.maps.LatLng(value.lat,value.lng);
          var marker = new google.maps.Marker({
            map: map,
            title: value.datetime,
            position: point,
            clickable: true
          });
          marker.info = new google.maps.InfoWindow({
           content: '<p><b>Date: </b>' + value.datetime+ '</p><p><b>Magnitude: </b>' + value.magnitude + '</p>'
          });
          markers.push(marker);
          google.maps.event.addListener(marker, 'mouseover', function() {
            marker.info.open(map, marker);
          });
          google.maps.event.addListener(marker, 'mouseout', function() {
            marker.info.close(map, marker);
          });
        });
      }
    });
  });
}
google.maps.event.addDomListener(window, 'load', initialize);