// -*- mode: javascript; indent-tabs-mode: nil; c-basic-offset: 8 -*-
"use strict";

//
// The idea behind the color legend traces back to a post by 'tedsluis' in this thread:
// http://discussions.flightaware.com/ads-b-flight-tracking-f21/altitude-color-legend-for-the-dump1090-mutability-v1-15-dev-t35805.html
// 

var myMarker = null;
var myColorZonesHTML = null;
var myColorZonesCSS = null;
var myRingRanges = null;

function getHueFromAltitude(altitude) {
	if (MetricAlt) altitude = Math.round(altitude * 3.2828);
	// find the pair of points the current altitude lies between,
	// and interpolate the hue between those points
	var hpoints = ColorByAlt.air.h;
	var h = hpoints[0].val;
	for (var i = hpoints.length-1; i >= 0; --i) {
		if (altitude > hpoints[i].alt) {
			if (i == hpoints.length-1) {
				h = hpoints[i].val;
			} else {
				h = hpoints[i].val + (hpoints[i+1].val - hpoints[i].val) * (altitude - hpoints[i].alt) / (hpoints[i+1].alt - hpoints[i].alt)
			} 
			break;
		}
	}
	return h;
}

var myAltitudeRow = 0;

function getNextAltitude(altitude) {
    var a;

	if (altitude == -1) {
        myAltitudeRow = 0;
        return AltitudeColorZones[0].alt;
    }
	if (AltitudeColorZones[myAltitudeRow].step == 0)
	    return -1;

	a = altitude + AltitudeColorZones[myAltitudeRow].step;
    if (a >= AltitudeColorZones[myAltitudeRow + 1].alt) {
	    myAltitudeRow ++;
	    a = AltitudeColorZones[myAltitudeRow].alt;
    }
	return a;
}

function getAltitudeZonesHTML() {
    var html = '';

	var unittype = ' ft';
	if (MetricAlt) unittype = ' m';

	// Create HTML code
	// create row for every altitude step
	for (var altitude = getNextAltitude(-1); altitude >= 0; altitude = getNextAltitude(altitude)) {
	    html='<li>' + altitude + unittype + '</li>' + html;
	}
	return html; 
}

function getAltitudeZonesCSS() {
    var html = '';
    var delim = '';
	var prevalti = 0;

	// create row for every altitude step
	for (var altitude = getNextAltitude(-1); altitude >= 0; altitude = getNextAltitude(altitude)) {
		// color
	    var h = getHueFromAltitude(Math.floor((altitude + prevalti) / 2));
		var s = ColorByAlt.air.s;
		var l = ColorByAlt.air.l;
		var zone_color = 'hsl(' + h.toFixed(0) + ',' + s.toFixed(0) + '%,' + l.toFixed(0) + '%)';

		// Create HTML code
	    html = zone_color + delim + html;
		delim = ',';

		prevalti = altitude;
	}
    return 'linear-gradient(' + zone_color + ',' + html + ')';
}

function setRangeRingsLegend() {
    var unittype = NBSP + 'NM';
    if (MetricDst) unittype = NBSP + 'km';

    // Create HTML code
	// Make a legend heading
    var html="";
    // html='<li class="color" style="color:white; background-color:green;">Range Rings</li>';
    for (var i=0;i<SiteCircle.length;i++) {
        html=html+'<li class="color" style="color:white; background-color:'+SiteCircle[i].color+';">'+SiteCircle[i].distance+unittype+'</li>';
    }
    
    $('#range_legend').html(html);
	return true;
}

function refresh_colored_altitude_zones() {

	if (!ShowAircraftColorLegend)
	    return;

    // Cache these computed strings for faster access.
	if (ShowAltitudesByColor) {
	    if (!myColorZonesHTML)
            myColorZonesHTML = getAltitudeZonesHTML();
	    if (!myColorZonesCSS)
            myColorZonesCSS = getAltitudeZonesCSS();

        $('#altitude_legend').html(myColorZonesHTML);
        $('#altitude_legend').css('background', myColorZonesCSS);

		console.log('MyColorZonesHTML: ' + myColorZonesHTML);
		console.log('MyColorZonesCSS: ' + myColorZonesCSS);
	} else {
        var html='<li class="color" style="color:black; background-color: #80ff80;">ADS-B Positions</li>' +
                 '<li class="color" style="color:black; background-color: #8080ff;">MLAT Positions</li>';
        $('#altitude_legend').html(html);
        $('#altitude_legend').css('background','');
	}
}

function refresh_range_legend() {
    if (!ShowSiteCirclesLegend)
	    return;

    if (!myRingRanges) 
	    myRingRanges = setRangeRingsLegend();

    $('#range_legend').css('display', ShowSiteCircles ? 'block' : 'none');
}

function toggleRings() {
    ShowSiteCircles = !ShowSiteCircles;
    if (SitePosition) refreshCircles(myMarker);
}

function toggleColors() {
    ShowAltitudesByColor = !ShowAltitudesByColor;
    refresh_colored_altitude_zones();
}

function refreshCircles(marker) {
    for (var i=0; i < SiteCircle.length; i++) 
        if (ShowSiteCircles) {
		    if (!SiteCircle[i].circle)
                 SiteCircle[i].circle = drawCircle(marker, SiteCircle[i].distance, SiteCircle[i].strokeweight, SiteCircle[i].color);
	    } else {
		    if (SiteCircle[i].circle) {
                SiteCircle[i].circle.setMap(null);
                SiteCircle[i].circle = null;
			}
		}
    refresh_range_legend();
}

