
"use strict";

// This code supports the display of flag icons and country names in the DUMP1090 web interface.
// 
// Based on work posted by DinoM in this thread:
// http://discussions.flightaware.com/ads-b-flight-tracking-f21/adding-country-flags-to-dump1090-mutability-v1-14-t35792.html
// 
// Some modifications are by toverfield. https://github.com/toverfield/dump1090.git
//
// Additional mods taken from https://github.com/Dynomity/dump1090.git
//
// The flags are supplied by
// Free Country Flags by Gang of the Coconuts and is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
// 
// Free Country Flags: 
// http://www.free-country-flags.com/

// Creative Commons Attribution-ShareAlike 3.0 Unported License
// http://creativecommons.org/licenses/by-sa/3.0/

// Find the flag (Binary Search, requires sorted array)
// Look up the country of registration from icao address in array
function ICAOLookup(icao) {
    var min = 0;
	var max = ICAO_Codes.length - 1;
	var guess;

	while (min <= max) {
	    guess = Math.floor((min + max) / 2);
		if (icao >= ICAO_Codes[guess].start && icao < ICAO_Codes[guess].end)
		    return ICAO_Codes[guess];
        else
		    if (icao < ICAO_Codes[guess].start)
			    max = guess - 1;
            else
                min = guess + 1;
    }
	return null;
}

// Declare ICAO registration address ranges and country
// install the flag images in flag_dir subdirectory. 
var ICAO_Codes = [
{start:0x700000, end:0x701000, Country: "Afghanistan", icon_fn: "Afghanistan.png"}, 
{start:0x501000, end:0x501400, Country: "Albania", icon_fn: "Albania.png"}, 
{start:0x0A0000, end:0x0A8000, Country: "Algeria", icon_fn: "Algeria.png"}, 
{start:0x090000, end:0x091000, Country: "Angola", icon_fn: "Angola.png"}, 
{start:0x0CA000, end:0x0CA400, Country: "Antigua and Barbuda", icon_fn: "Antigua_and_Barbuda.png"}, 
{start:0xE00000, end:0xE40000, Country: "Argentina", icon_fn: "Argentina.png"}, 
{start:0x600000, end:0x600400, Country: "Armenia", icon_fn: "Armenia.png"}, 
{start:0x7C0000, end:0x800000, Country: "Australia", icon_fn: "Australia.png"}, 
{start:0x440000, end:0x448000, Country: "Austria", icon_fn: "Austria.png"}, 
{start:0x600800, end:0x600C00, Country: "Azerbaijan", icon_fn: "Azerbaijan.png"}, 
{start:0x0A8000, end:0x0A9000, Country: "Bahamas", icon_fn: "Bahamas.png"}, 
{start:0x894000, end:0x895000, Country: "Bahrain", icon_fn: "Bahrain.png"}, 
{start:0x702000, end:0x703000, Country: "Bangladesh", icon_fn: "Bangladesh.png"}, 
{start:0x0AA000, end:0x0AA400, Country: "Barbados", icon_fn: "Barbados.png"}, 
{start:0x510000, end:0x510400, Country: "Belarus", icon_fn: "Belarus.png"}, 
{start:0x448000, end:0x450000, Country: "Belgium", icon_fn: "Belgium.png"}, 
{start:0x0AB000, end:0x0AB400, Country: "Belize", icon_fn: "Belize.png"}, 
{start:0x094000, end:0x094400, Country: "Benin", icon_fn: "Benin.png"}, 
{start:0x400080, end:0x4001C0, Country: "Bermuda", icon_fn: "Bermuda.png"},   // Some ranges borrowed from UK
{start:0x424000, end:0x4240FF, Country: "Bermuda", icon_fn: "Bermuda.png"}, 
{start:0x680000, end:0x680400, Country: "Bhutan", icon_fn: "Bhutan.png"}, 
{start:0xE94000, end:0xE95000, Country: "Bolivia", icon_fn: "Bolivia.png"}, 
{start:0x513000, end:0x513400, Country: "Bosnia", icon_fn: "Bosnia.png"}, 
{start:0x030000, end:0x030400, Country: "Botswana", icon_fn: "Botswana.png"}, 
{start:0xE40000, end:0xE80000, Country: "Brazil", icon_fn: "Brazil.png"}, 
{start:0x895000, end:0x895400, Country: "Brunei", icon_fn: "Brunei.png"}, 
{start:0x450000, end:0x458000, Country: "Bulgaria", icon_fn: "Bulgaria.png"}, 
{start:0x09C000, end:0x09D000, Country: "Burkina Faso", icon_fn: "Burkina_Faso.png"}, 
{start:0x032000, end:0x033000, Country: "Burundi", icon_fn: "Burundi.png"}, 
{start:0x70E000, end:0x70F000, Country: "Cambodia", icon_fn: "Cambodia.png"}, 
{start:0x034000, end:0x035000, Country: "Cameroon", icon_fn: "Cameroon.png"}, 
{start:0xC00000, end:0xC40000, Country: "Canada", icon_fn: "Canada.png"}, 
{start:0x096000, end:0x096400, Country: "Cape Verde", icon_fn: "Cape_Verde.png"}, 
{start:0x06C000, end:0x06D000, Country: "Central African Republic", icon_fn: "Central_African_Republic.png"}, 
{start:0x084000, end:0x085000, Country: "Chad", icon_fn: "Chad.png"}, 
{start:0xE80000, end:0xE81000, Country: "Chile", icon_fn: "Chile.png"}, 
{start:0x780000, end:0x7C0000, Country: "China", icon_fn: "China.png"}, 
{start:0x0AC000, end:0x0AD000, Country: "Colombia", icon_fn: "Colombia.png"}, 
{start:0x035000, end:0x035400, Country: "Comoros", icon_fn: "Comoros.png"}, 
{start:0x036000, end:0x037000, Country: "Democratic Republic of the Congo", icon_fn: "Democratic_Republic_of_the_Congo.png"}, 
{start:0x901000, end:0x901400, Country: "Cook Islands", icon_fn: "Cook_Islands.png"}, 
{start:0x0AE000, end:0x0AF000, Country: "Costa Rica", icon_fn: "Costa_Rica.png"}, 
{start:0x038000, end:0x039000, Country: "Cote d'Ivoire", icon_fn: "Cote_d_Ivoire.png"}, 
{start:0x501C00, end:0x502000, Country: "Croatia", icon_fn: "Croatia.png"}, 
{start:0x0B0000, end:0x0B1000, Country: "Cuba", icon_fn: "Cuba.png"}, 
{start:0x4C8000, end:0x4C8400, Country: "Cyprus", icon_fn: "Cyprus.png"}, 
{start:0x498000, end:0x4A0000, Country: "Czech Republic", icon_fn: "Czech_Republic.png"}, 
{start:0x720000, end:0x728000, Country: "Democratic People's Republic of Korea", icon_fn: "North_Korea.png"}, 
{start:0x08C000, end:0x08D000, Country: "Democratic Republic of the Congo", icon_fn: "Democratic_Republic_of_the_Congo.png"}, 
{start:0x458000, end:0x460000, Country: "Denmark", icon_fn: "Denmark.png"}, 
{start:0x098000, end:0x098400, Country: "Djibouti", icon_fn: "Djibouti.png"}, 
{start:0x0C4000, end:0x0C5000, Country: "Dominican Republic", icon_fn: "Dominican_Republic.png"}, 
{start:0xE84000, end:0xE85000, Country: "Ecuador", icon_fn: "Ecuador.png"}, 
{start:0x010000, end:0x018000, Country: "Egypt", icon_fn: "Egypt.png"}, 
{start:0x0B2000, end:0x0B3000, Country: "El Salvador", icon_fn: "El_Salvador.png"}, 
{start:0x042000, end:0x043000, Country: "Equatorial Guinea", icon_fn: "Equatorial_Guinea.png"}, 
{start:0x202000, end:0x202400, Country: "Eritrea", icon_fn: "Eritrea.png"}, 
{start:0x511000, end:0x511400, Country: "Estonia", icon_fn: "Estonia.png"}, 
{start:0x040000, end:0x041000, Country: "Ethiopia", icon_fn: "Ethiopia.png"}, 
{start:0xC88000, end:0xC89000, Country: "Fiji", icon_fn: "Fiji.png"}, 
{start:0x460000, end:0x468000, Country: "Finland", icon_fn: "Finland.png"}, 
{start:0x380000, end:0x3C0000, Country: "France", icon_fn: "France.png"}, 
{start:0x03E000, end:0x03F000, Country: "Gabon", icon_fn: "Gabon.png"}, 
{start:0x09A000, end:0x09B000, Country: "Gambia", icon_fn: "Gambia.png"}, 
{start:0x514000, end:0x514400, Country: "Georgia", icon_fn: "Georgia.png"}, 
{start:0x3C0000, end:0x400000, Country: "Germany", icon_fn: "Germany.png"}, 
{start:0x044000, end:0x045000, Country: "Ghana", icon_fn: "Ghana.png"}, 
{start:0x468000, end:0x470000, Country: "Greece", icon_fn: "Greece.png"}, 
{start:0x0CC000, end:0x0CC400, Country: "Grenada", icon_fn: "Grenada.png"}, 
{start:0x0B4000, end:0x0B5000, Country: "Guatemala", icon_fn: "Guatemala.png"}, 
{start:0x046000, end:0x047000, Country: "Guinea", icon_fn: "Guinea.png"}, 
{start:0x048000, end:0x048400, Country: "Guinea Bissau", icon_fn: "Guinea_Bissau.png"}, 
{start:0x0B6000, end:0x0B7000, Country: "Guyana", icon_fn: "Guyana.png"}, 
{start:0x0B8000, end:0x0B9000, Country: "Haiti", icon_fn: "Haiti.png"}, 
{start:0x0BA000, end:0x0BB000, Country: "Honduras", icon_fn: "Honduras.png"}, 
{start:0x470000, end:0x478000, Country: "Hungary", icon_fn: "Hungary.png"}, 
{start:0x4CC000, end:0x4CD000, Country: "Iceland", icon_fn: "Iceland.png"}, 
{start:0x800000, end:0x840000, Country: "India", icon_fn: "India.png"}, 
{start:0x8A0000, end:0x8A8000, Country: "Indonesia", icon_fn: "Indonesia.png"}, 
{start:0x730000, end:0x738000, Country: "Iran", icon_fn: "Iran.png"}, 
{start:0x728000, end:0x730000, Country: "Iraq", icon_fn: "Iraq.png"}, 
{start:0x4CA000, end:0x4CB000, Country: "Ireland", icon_fn: "Ireland.png"}, 
{start:0x738000, end:0x740000, Country: "Israel", icon_fn: "Israel.png"}, 
{start:0x300000, end:0x340000, Country: "Italy", icon_fn: "Italy.png"}, 
{start:0x0BE000, end:0x0BF000, Country: "Jamaica", icon_fn: "Jamaica.png"}, 
{start:0x840000, end:0x880000, Country: "Japan", icon_fn: "Japan.png"}, 
{start:0x740000, end:0x748000, Country: "Jordan", icon_fn: "Jordan.png"}, 
{start:0x683000, end:0x683400, Country: "Kazakhstan", icon_fn: "Kazakhstan.png"}, 
{start:0x04C000, end:0x04D000, Country: "Kenya", icon_fn: "Kenya.png"}, 
{start:0xC8E000, end:0xC8E400, Country: "Kiribati", icon_fn: "Kiribati.png"}, 
{start:0x706000, end:0x707000, Country: "Kuwait", icon_fn: "Kuwait.png"}, 
{start:0x601000, end:0x601400, Country: "Kyrgyzstan", icon_fn: "Kyrgyzstan.png"}, 
{start:0x708000, end:0x709000, Country: "Laos", icon_fn: "Laos.png"}, 
{start:0x502C00, end:0x503000, Country: "Latvia", icon_fn: "Latvia.png"}, 
{start:0x748000, end:0x750000, Country: "Lebanon", icon_fn: "Lebanon.png"}, 
{start:0x04A000, end:0x04A400, Country: "Lesotho", icon_fn: "Lesotho.png"}, 
{start:0x050000, end:0x051000, Country: "Liberia", icon_fn: "Liberia.png"}, 
{start:0x018000, end:0x020000, Country: "Libya", icon_fn: "Libya.png"}, 
{start:0x503C00, end:0x504000, Country: "Lithuania", icon_fn: "Lithuania.png"}, 
{start:0x4D0000, end:0x4D0400, Country: "Luxembourg", icon_fn: "Luxembourg.png"}, 
{start:0x054000, end:0x055000, Country: "Madagascar", icon_fn: "Madagascar.png"}, 
{start:0x058000, end:0x059000, Country: "Malawi", icon_fn: "Malawi.png"}, 
{start:0x750000, end:0x758000, Country: "Malaysia", icon_fn: "Malaysia.png"}, 
{start:0x05A000, end:0x05A400, Country: "Maldives", icon_fn: "Maldives.png"}, 
{start:0x05C000, end:0x05D000, Country: "Mali", icon_fn: "Mali.png"}, 
{start:0x4D2000, end:0x4D2400, Country: "Malta", icon_fn: "Malta.png"}, 
{start:0x900000, end:0x900400, Country: "Marshall Islands", icon_fn: "Marshall_Islands.png"}, 
{start:0x05E000, end:0x05E400, Country: "Mauritania", icon_fn: "Mauritania.png"}, 
{start:0x060000, end:0x060400, Country: "Mauritius", icon_fn: "Mauritius.png"}, 
{start:0x0D0000, end:0x0D8000, Country: "Mexico", icon_fn: "Mexico.png"}, 
{start:0x681000, end:0x681400, Country: "Micronesia", icon_fn: "Micronesia.png"}, 
{start:0x4D4000, end:0x4D4400, Country: "Monaco", icon_fn: "Monaco.png"}, 
{start:0x682000, end:0x682400, Country: "Mongolia", icon_fn: "Mongolia.png"}, 
{start:0x516000, end:0x516400, Country: "Serbia and Montenegro", icon_fn: "Serbia_and_Montenegro.png"}, 
{start:0x020000, end:0x028000, Country: "Morocco", icon_fn: "Morocco.png"}, 
{start:0x006000, end:0x007000, Country: "Mozambique", icon_fn: "Mozambique.png"}, 
{start:0x704000, end:0x705000, Country: "Myanmar", icon_fn: "Myanmar.png"}, 
{start:0x201000, end:0x201400, Country: "Namibia", icon_fn: "Namibia.png"}, 
{start:0xC8A000, end:0xC8A400, Country: "Nauru", icon_fn: "Nauru.png"}, 
{start:0x70A000, end:0x70B000, Country: "Nepal", icon_fn: "Nepal.png"}, 
{start:0x480000, end:0x488000, Country: "Netherlands", icon_fn: "Netherlands.png"}, 
{start:0xC80000, end:0xC88000, Country: "New Zealand", icon_fn: "New_Zealand.png"}, 
{start:0x0C0000, end:0x0C1000, Country: "Nicaragua", icon_fn: "Nicaragua.png"}, 
{start:0x062000, end:0x063000, Country: "Niger", icon_fn: "Niger.png"}, 
{start:0x064000, end:0x065000, Country: "Nigeria", icon_fn: "Nigeria.png"}, 
{start:0x478000, end:0x480000, Country: "Norway", icon_fn: "Norway.png"}, 
{start:0x70C000, end:0x70C400, Country: "Oman", icon_fn: "Oman.png"}, 
{start:0x760000, end:0x768000, Country: "Pakistan", icon_fn: "Pakistan.png"}, 
{start:0x684000, end:0x684400, Country: "Palau", icon_fn: "Palau.png"}, 
{start:0x0C2000, end:0x0C3000, Country: "Panama", icon_fn: "Panama.png"}, 
{start:0x898000, end:0x899000, Country: "Papua New Guinea", icon_fn: "Papua_New_Guinea.png"}, 
{start:0xE88000, end:0xE89000, Country: "Paraguay", icon_fn: "Paraguay.png"}, 
{start:0xE8C000, end:0xE8D000, Country: "Peru", icon_fn: "Peru.png"}, 
{start:0x758000, end:0x760000, Country: "Philippines", icon_fn: "Philippines.png"}, 
{start:0x488000, end:0x490000, Country: "Poland", icon_fn: "Poland.png"}, 
{start:0x490000, end:0x498000, Country: "Portugal", icon_fn: "Portugal.png"}, 
{start:0x06A000, end:0x06A400, Country: "Qatar", icon_fn: "Qatar.png"}, 
{start:0x718000, end:0x720000, Country: "Republic of Korea", icon_fn: "South_Korea.png"}, 
{start:0x504C00, end:0x505000, Country: "Moldova", icon_fn: "Moldova.png"}, 
{start:0x4A0000, end:0x4A8000, Country: "Romania", icon_fn: "Romania.png"}, 
{start:0x100000, end:0x200000, Country: "Russian Federation", icon_fn: "Russian_Federation.png"}, 
{start:0x06E000, end:0x06F000, Country: "Rwanda", icon_fn: "Rwanda.png"}, 
{start:0xC8C000, end:0xC8C400, Country: "Saint Lucia", icon_fn: "Saint_Lucia.png"}, 
{start:0x0BC000, end:0x0BC400, Country: "Saint Vincent and the Grenadines", icon_fn: "Saint_Vincent_and_the_Grenadines.png"}, 
{start:0x902000, end:0x902400, Country: "Samoa", icon_fn: "Samoa.png"}, 
{start:0x500000, end:0x500400, Country: "San Marino", icon_fn: "San_Marino.png"},
{start:0x097000, end:0x097400, Country: "Sao Tome and Principe", icon_fn: "Sao_Tome_and_Principe.png"}, 
{start:0x710000, end:0x718000, Country: "Saudi Arabia", icon_fn: "Saudi_Arabia.png"}, 
{start:0x070000, end:0x071000, Country: "Senegal", icon_fn: "Senegal.png"}, 
{start:0x074000, end:0x074400, Country: "Seychelles", icon_fn: "Seychelles.png"}, 
{start:0x076000, end:0x076400, Country: "Sierra Leone", icon_fn: "Sierra_Leone.png"}, 
{start:0x768000, end:0x770000, Country: "Singapore", icon_fn: "Singapore.png"}, 
{start:0x505C00, end:0x506000, Country: "Slovakia", icon_fn: "Slovakia.png"}, 
{start:0x506C00, end:0x507000, Country: "Slovenia", icon_fn: "Slovenia.png"},
{start:0x897000, end:0x897400, Country: "Solomon Islands", icon_fn: "Solomon_Islands.png"},
{start:0x078000, end:0x079000, Country: "Somalia", icon_fn: "Somalia.png"}, 
{start:0x008000, end:0x010000, Country: "South Africa", icon_fn: "South_Africa.png"}, 
{start:0x340000, end:0x380000, Country: "Spain", icon_fn: "Spain.png"}, 
{start:0x770000, end:0x778000, Country: "Sri Lanka", icon_fn: "Sri_Lanka.png"}, 
{start:0x07C000, end:0x07D000, Country: "Sudan", icon_fn: "Sudan.png"}, 
{start:0x0C8000, end:0x0C9000, Country: "Suriname", icon_fn: "Suriname.png"}, 
{start:0x07A000, end:0x07A400, Country: "Swaziland", icon_fn: "Swaziland.png"}, 
{start:0x4A8000, end:0x4B0000, Country: "Sweden", icon_fn: "Sweden.png"}, 
{start:0x4B0000, end:0x4B8000, Country: "Switzerland", icon_fn: "Switzerland.png"}, 
{start:0x778000, end:0x780000, Country: "Syria", icon_fn: "Syria.png"}, 
{start:0x899000, end:0x899400, Country: "Taiwan", icon_fn: "Taiwan.png"}, 
{start:0x515000, end:0x515400, Country: "Tajikistan", icon_fn: "Tajikistan.png"}, 
{start:0x880000, end:0x888000, Country: "Thailand", icon_fn: "Thailand.png"},
{start:0x512000, end:0x512400, Country: "Republic of Macedonia", icon_fn: "Macedonia.png"}, 
{start:0x088000, end:0x089000, Country: "Togo", icon_fn: "Togo.png"}, 
{start:0xC8D000, end:0xC8D400, Country: "Tonga", icon_fn: "Tonga.png"}, 
{start:0x0C6000, end:0x0C7000, Country: "Trinidad and Tobago", icon_fn: "Trinidad_and_Tobago.png"}, 
{start:0x028000, end:0x030000, Country: "Tunisia", icon_fn: "Tunisia.png"}, 
{start:0x4B8000, end:0x4C0000, Country: "Turkey", icon_fn: "Turkey.png"}, 
{start:0x601800, end:0x601C00, Country: "Turkmenistan", icon_fn: "Turkmenistan.png"}, 
{start:0x068000, end:0x069000, Country: "Uganda", icon_fn: "Uganda.png"}, 
{start:0x508000, end:0x510000, Country: "Ukraine", icon_fn: "Ukraine.png"}, 
{start:0x896000, end:0x897000, Country: "United Arab Emirates", icon_fn: "UAE.png"}, 
{start:0x400000, end:0x400080, Country: "United Kingdom", icon_fn: "United_Kingdom.png"}, // Bermuda use pieces of the UK range
{start:0x4001C0, end:0x424000, Country: "United Kingdom", icon_fn: "United_Kingdom.png"},
{start:0x424100, end:0x440000, Country: "United Kingdom", icon_fn: "United_Kingdom.png"},
{start:0x080000, end:0x081000, Country: "United Republic of Tanzania", icon_fn: "Tanzania.png"}, 
{start:0xA00000, end:0xB00000, Country: "United States of America", icon_fn: "United_States_of_America.png"}, 
{start:0xE90000, end:0xE91000, Country: "Uruguay", icon_fn: "Uruguay.png"}, 
{start:0x507C00, end:0x508000, Country: "Uzbekistan", icon_fn: "Uzbekistan.png"}, 
{start:0xC90000, end:0xC90400, Country: "Vanuatu", icon_fn: "Vanuatu.png"}, 
{start:0x0D8000, end:0x0E0000, Country: "Venezuela", icon_fn: "Venezuela.png"}, 
{start:0x888000, end:0x890000, Country: "Vietnam", icon_fn: "Vietnam.png"}, 
{start:0x890000, end:0x891000, Country: "Yemen", icon_fn: "Yemen.png"}, 
{start:0x4C0000, end:0x4C8000, Country: "Yugoslavia", icon_fn: "Yugoslavia.png"},
{start:0x08A000, end:0x08B000, Country: "Zambia", icon_fn: "Zambia.png"},
{start:0x004000, end:0x004400, Country: "Zimbabwe", icon_fn: "Zimbabwe.png"}];
