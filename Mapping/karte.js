//Map erstellen
var map = L.map('map').setView([51.8045913, 10.3340471] , 15);


//Layer auf den Map hinfügen
       L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=qNbBXUXpLTMxSKYDu8IA' , {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(map);

//Marker erstellen
        var marker = L.marker([51.8045913, 10.3340471]).addTo(map);

//Popup auf den Marker einfügen
        marker.bindPopup("<b>Technische Universitaet Clausthal</b><br>Adolph-Roemer-Strasse 2A").openPopup();

//circle mit Popup erstellen        
        var circle = L.circle([51.80637, 10.352468], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1,
            radius: 100
        }).addTo(map);
        circle.bindPopup("Sportplatz.");


// Zwei Polygon erstellen
        var polygon1 = L.polygon([
            [51.806786, 10.357522],
            [51.80607, 10.355349],
            [51.805449, 10.35521],
            [51.805572, 10.356631]
        ]).addTo(map);
        polygon1.bindPopup("Institut fuer Informatik.");

        var polygon2 = L.polygon([
            [51.799882, 10.347705],
            [51.798391, 10.347067],
            [51.7986, 10.351449],
            [51.799719, 10.351685]
        ]).addTo(map);
        polygon2.bindPopup("Studentenwohnheim.");


//Beispiel von funktion mit Leaflet 
        var popup = L.popup();
        function onMapClick(e) {
          popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
        }
        map.on('click', onMapClick);


//Funktion für die Live Location
        function onLocationFound(e) {
		var radius = e.accuracy ;
		L.marker(e.latlng).addTo(map)
            .bindPopup("Hier bin ich ungefaehr!!").openPopup();
		L.circle(e.latlng, radius).addTo(map);
	    }

	    function onLocationError(e) {
		alert(e.message);
	    }
	    map.on('locationfound', onLocationFound);
	    map.on('locationerror', onLocationError);
        map.locate({setView: true, maxZoom: 16});
        
 
//eigene Icon erstellen
        var myIcon = L.icon({
            iconUrl: 'smicon.png',
            iconSize: [30, 30],})

//GeoJSon mit Leaflet
        L.geoJSON( supermarkt , {
            onEachFeature: function(Feature, layer){
                if(Feature.geometry.type == 'Point'){
                    layer.bindPopup("<b>" + Feature.properties.name +"</b>"+"<br>"+ Feature.properties.address );
                    layer.setIcon(myIcon);
                }
            }
        }).addTo(map);