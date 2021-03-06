// --------------------------------------------------------
//
// This file is to configure the configurable settings.
// Load this file before script.js file at gmap.html.
//
// --------------------------------------------------------

// -- Title Settings --------------------------------------
// Show number of aircraft and/or messages per second in the page title
PlaneCountInTitle = true;
MessageRateInTitle = false;

// -- Output Settings -------------------------------------
// Show metric values
// The Metric setting controls whether metric (m, km, km/h) or
// imperial (ft, NM, knots) units are used in the plane table
// and in the detailed plane info. If ShowOtherUnits is true,
// then the other unit will also be shown in the detailed plane
// info.
MetricAlt = false;
MetricSpd = false;
MetricDst = false;
ShowOtherUnits = true;

// -- Map settings ----------------------------------------
// These settings are overridden by any position information
// provided by dump1090 itself. All positions are in decimal
// degrees.

// Default center of the map.
DefaultCenterLat = 45.0;
DefaultCenterLon = 9.0;
// The google maps zoom level, 0 - 16, lower is further out
DefaultZoomLvl   = 7;

// Center marker. If dump1090 provides a receiver location,
// that location is used and these settings are ignored.

SiteShow    = false;           // true to show a center marker
SiteLat     = 45.0;            // position of the marker
SiteLon     = 9.0;
SiteName    = "My Radar Site"; // tooltip of the marker


// -- Marker settings -------------------------------------

// These settings control the coloring of aircraft by altitude.
// All color values are given as Hue (0-359) / Saturation (0-100) / Lightness (0-100)
ColorByAlt = {
        // HSL for planes with unknown altitude:
        unknown : { h: 0,   s: 0,   l: 40 },

        // HSL for planes that are on the ground:
        ground  : { h: 120, s: 100, l: 30 },

        air : {
                // These define altitude-to-hue mappings
                // at particular altitudes; the hue
                // for intermediate altitudes that lie
                // between the provided altitudes is linearly
                // interpolated.
                //
                // Mappings must be provided in increasing
                // order of altitude.
                //
                // Altitudes below the first entry use the
                // hue of the first entry; altitudes above
                // the last entry use the hue of the last
                // entry.
                h: [ { alt: 2000,  val: 20 },    // orange
                     { alt: 10000, val: 140 },   // light green
                     { alt: 40000, val: 300 } ], // magenta
                s: 85,
                l: 50,
        },

        // Changes added to the color of the currently selected plane
        selected : { h: 0, s: -10, l: +20 },

        // Changes added to the color of planes that have stale position info
        stale :    { h: 0, s: -10, l: +30 }
};

// For a monochrome display try this:
// ColorByAlt = {
//         unknown :  { h: 0, s: 0, l: 40 },
//         ground  :  { h: 0, s: 0, l: 30 },
//         air :      { h: [ { alt: 0, val: 0 } ], s: 0, l: 50 },
//         selected : { h: 0, s: 0, l: +30 },
//         stale :    { h: 0, s: 0, l: +30 }
// };

// -- Aircraft coloring by altitude options --------------
ShowAltitudesByColor = true;    // true or false -- Color the aircraft markers by altitude
ShowAircraftColorLegend = true; // true or false -- Display aircraft color legend
AltitudeColorZones = [
        { alt:      0, step: 1000 },  // altitude in feet or meters (depending on 'MetricAlt')
        { alt:  18000, step: 2000 },  // step is altitude increment to use
        { alt:  42000, step: 0 }      // -- top altitude is marked by step value of '0'
];

ShowSiteCircles = true; // true to show circles (only shown if the center marker is shown)
ShowSiteCirclesLegend = true; // true to show circle distance legend
// Circle radius in nautical miles or km (depending on settings value 'MetricDst')
SiteCircle = [
        { distance:  50, strokeweight: 2, color: "black" },
        { distance: 100, strokeweight: 2, color: "OrangeRed" },
        { distance: 150, strokeweight: 2, color: "red" },
        { distance: 200, strokeweight: 2, color: "purple" },
        { distance: 250, strokeweight: 2, color: "green" },
        { distance: 300, strokeweight: 3, color: "DeepSkyBlue" },
        { distance: 350, strokeweight: 2, color: "navy" }
];

// Show the clocks at the top of the righthand pane. You can disable the clocks if you want here
// Click on clocks to change to next available skin.
ShowClocks = true;
ClockSkin = "swissRail";

// Controls page title, righthand pane when nothing is selected
PageName = "dump1090-mutability";

// Show country flags by ICAO addresses?
ShowFlags = true;

// Path to country flags (can be a relative or absolute URL; include a trailing /)
FlagPath = "flags-tiny/";
