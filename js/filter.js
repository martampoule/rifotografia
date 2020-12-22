google.maps.event.addDomListener(window, 'load', init);
var map;

function init() {
    var mapOptions = {
        center: new google.maps.LatLng(39.905643, 36.148673),
        zoom: 5,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
        },
        disableDoubleClickZoom: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        },
        scaleControl: true,
        scrollwheel: false,
        panControl: true,
        streetViewControl: false,
        draggable: true,
        overviewMapControl: true,
        overviewMapControlOptions: {
            opened: true,
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ featureType: "administrative", stylers: [{ visibility: "off" }] }, { featureType: "poi", stylers: [{ visibility: "simplified" }] }, { featureType: "road", stylers: [{ visibility: "simplified" }] }, {
            featureType: "water",
            stylers: [{ visibility: "simplified" }]
        }, { featureType: "transit", stylers: [{ visibility: "simplified" }] }, { featureType: "landscape", stylers: [{ visibility: "simplified" }] }, { featureType: "road.highway", stylers: [{ visibility: "off" }] }, { featureType: "road.local", stylers: [{ visibility: "on" }] }, { featureType: "road.highway", elementType: "geometry", stylers: [{ visibility: "on" }] }, { featureType: "water", stylers: [{ color: "#84afa3" }, { lightness: 52 }] }, { stylers: [{ saturation: -77 }] }, { featureType: "road" }],
    }
    var mapElement = document.getElementById('haritam');
    var map = new google.maps.Map(mapElement, mapOptions);
    var locations = [
        ['Location One', 'Description', 'img/before.jpg', 'info@mydomain.com', 'www.mydomain.com', 36.85915525936127, 30.79201858795159, 'https://www.cattaneomarta.it/wp-content/uploads/2020/12/osmark.png'],
        ['Location Two', 'Description', 'img/after.jpg', 'info@mydomain.com', 'www.mydomain.com', 37.009614, 27.257248, 'https://www.cattaneomarta.it/wp-content/uploads/2020/12/osmark.png']
    ];
    for (i = 0; i < locations.length; i++) {
        if (locations[i][1] == 'undefined') { description = ''; } else { description = locations[i][1]; }
        if (locations[i][2] == 'undefined') { image = ''; } else { image = locations[i][2]; }
        if (locations[i][3] == 'undefined') { email = ''; } else { email = locations[i][3]; }
        if (locations[i][4] == 'undefined') { web = ''; } else { web = locations[i][4]; }
        if (locations[i][7] == 'undefined') { markericon = ''; } else { markericon = locations[i][7]; }
        marker = new google.maps.Marker({
            icon: markericon,
            position: new google.maps.LatLng(locations[i][5], locations[i][6]),
            map: map,
            title: locations[i][0],
            desc: description,
            img: image,
            email: email,
            web: web
        });
        if (web.substring(0, 7) != "http://") {
            link = "http://" + web;
        } else {
            link = web;
        }
        bindInfoWindow(marker, map, locations[i][0], description, image, email, web, link);
    }

    function bindInfoWindow(marker, map, title, desc, image, web, link) {
        var infoWindowVisible = (function() {
            var currentlyVisible = false;
            return function(visible) {
                if (visible !== undefined) {
                    currentlyVisible = visible;
                }
                return currentlyVisible;
            };
        }());

        iw = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function() {
            if (infoWindowVisible()) {
                iw.close();
                infoWindowVisible(false);
            } else {
                var html = "<div style='color:#000;background-color:transparent;padding:2px;width:200px;'><h4>" + title + "</h4><p>" + desc + "<img src='" + image + "'' >" + "<a href='" + link + "'' >" + web + "</div>";
                iw = new google.maps.InfoWindow({ content: html });
                iw.open(map, marker);
                infoWindowVisible(true);
            }

        });


        google.maps.event.addListener(iw, 'closeclick', function() {
            infoWindowVisible(false);
        });


        google.maps.event.addListener(marker, 'click', function() {
            map.setZoom(8);
            map.setCenter(marker.getPosition());

        });
    }
}