/**
Plugin Name: Quick Home Search Widget for flexIDX
Plugin URI: http://SimpleRealtyTheme.com
Description: This code places an HTML form widget with selection of cities, price range, property types, bedrooms and bathrooms. On submission it redirects to the flexIDX search page, which returns listings matching selected parameters. This widget is intended for real estate websites that using flexIDX service (http://flexmls.com).
Author: Max Chirkov
Author URI: http://SimpleRealtyTheme.com
Version: 1.0

	Copyright (c) 2011 Max Chirkov
	License: Licensed under the GNU GPL Version 2
 */

/***** INSTALLATION INSTRUCTIONS *****
 1. Load the JS file in the header or foother of your HTML page like this:
   <script src="http:// YOUR URL /quick_search.js"></script>
 2. Insert empty DIV tag with ID flexidx-quicksearch within the body of your page where the widget should appear, like this:
   <div id="flexidx-quicksearch"></div>
 3. Enter the base url of your flexIDX search below under "REQUIRED SETTINGS"
 4. Enjoy the plugin and make lots of money! :)

 */

/***** REQUIRED SETTINGS *****/

var qs_base_url = ''; //flexIDX URL


/***** OPTIONAL SETTINGS - ADVANCED USERS ONLY *****/

/** Field Names @param = string
 *  Field names have to match their respective query parameters of your regional MLS
 *  For details see: http://www.flexmls.com/developers/idx-api/smart-frame-api/
 *  The default field names are taken from Arizona Regional Multiple Listings Service (ARMLS)
 */
// var cities_field		= ''; //Default => city
// var price_field		= ''; //Default => list_price
// var proptypes_field	= ''; //Default => DwellingType
// var br_field			= ''; //Default => total_br
// var ba_field			= ''; //Default => total_bath


/** Field Labels 
 *  @param = string 
 *  Text labels visible to users to identify the fields.
 */
// var cities_label		= '';
// var price_label		= '';
// var proptypes_label	= '';
// var br_label			= '';
// var ba_label			= '';


/** Field Values 
 *  @param = associative array {"key" : "value"} 
 *  Example: var cities_values = {"A" : "San Diego", "B" : "San Fancisco"};
 *  If keys are the same as values, enter them the same way.
 */ 
// var cities_values	= {}; 
// var price_values		= {};
// var proptypes_values	= {};
// var br_values		= {};
// var ba_values		= {};

/** Misc Settings
 *  Advanced Search Button Appearance - 1 is true/show; 0 is false/hide;
 */
// var qs_advanced_search = 1; //Default => 0

/** Open IDX results on submission in the same or new window. Parameters: _blank, _self, _top, _parent
 */
// var qs_search_target = '_self'; //Default => _blank

/** Field Label Appearance - parameters inside or outside the field
 */
// var qs_labels = 'inside'; //Default => outside

/** Price range as a preset range in a single field i.e. 100K - 150K or 2 separate fields for minimum and maximum prices
 */
// var qs_price_range = true; //Default => false

/** Widget title
 */
// var qs_title = '<h3>Quick Home Search</h3>;

/** If you're using FlexMLS IDX plugin for WordPress and would like to open search results in an iFrame
 *  specify the URL of the IDX search page via this variable.
 */
//var qs_page = '';


/***** DO NOT EDIT BELOW THIS LINE! NO, SERIOUSLY - DON'T. *****/

if(!qs_base_url || qs_base_url == ''){
	alert('FlexIDX base URL is not defined. Edit the "REQUIRED SETTINGS" at the beginning of the script.');
	var qs_base_url = 'http://link.flexmls.com/rett8x5v0ju,12';
}

if(!qs_price_range)
	var qs_price_range = false;	

function qs_field(){	
	this.name = false;	
	this.values = false;
	this.label = false;
	this.field = qs_field_output;
}

var cities_obj = new qs_field();
var proptypes_obj = new qs_field();
var price_obj = new qs_field();
var br_obj = new qs_field();
var ba_obj = new qs_field();

cities_obj.name = (typeof (cities_field) === "undefined") ? 'city' : cities_field; 
cities_obj.label = (typeof (cities_label) === "undefined") ? 'Select City' : cities_label; 	
price_obj.name = (typeof (price_field) === "undefined") ? 'list_price' : price_field; 
price_obj.label = (typeof (price_label) === "undefined") ? 'What is your price range?' : price_label; 	
proptypes_obj.name = (typeof (proptypes_field) === "undefined") ? 'DwellingType' : proptypes_field; 
proptypes_obj.label = (typeof (proptypes_label) === "undefined") ? 'Property Type' : proptypes_label;
br_obj.name = (typeof (br_field) === "undefined") ? 'total_br' : br_field; 
br_obj.label = (typeof (br_label) === "undefined") ? '# Beds' : br_label;
ba_obj.name = (typeof (ba_field) === "undefined") ? 'total_bath' : ba_field; 
ba_obj.label = (typeof (ba_label) === "undefined") ? '# Baths' : ba_label;	

cities_obj.values = (typeof (cities_values) === "undefined") ?
	cities_obj.values = {
		"Apache Junction" : "Apache Junction",
		"Avondale" : "Avondale",
		"Carefree" : "Carefree",
		"Cave Creek" : "Cave Creek",
		"Chandler" : "Chandler",
		"El Mirage" : "El Mirage",
		"Fountain Hills" : "Fountain Hills",
		"Gilbert" : "Gilbert",
		"Glendale" : "Glendale",
		"Goodyear" : "Goodyear",
		"Laveen" : "Laveen",
		"Litchfield Park" : "Litchfield Park",
		"Maricopa" : "Maricopa",
		"Mesa" : "Mesa",
		"Paradise Valley" : "Paradise Valley",
		"Peoria" : "Peoria",
		"Phoenix" : "Phoenix",
		"Queen Creek" : "Queen Creek",
		"Rio Verde" : "Rio Verde",
		"Scottsdale" : "Scottsdale",
		"Sun City" : "Sun City",
		"Sun City West" : "Sun City West",
		"Surprise" : "Surprise",
		"Tempe" : "Tempe",
		"Tolleson" : "Tolleson"	
	} : cities_values;
	
	
price_obj.values = (typeof (price_values) === "undefined") ?
	price_obj.values = {
		"<50000" : "Up to $50,000",
		"50000,100000" : "$50,000 - $100,000",
		"100000,150000" : "$100,000 - $150,000",
		"150000,200000" : "$150,000 - $200,000",
		"200000,250000" : "$200,000 - $250,000",
		"300000,350000" : "$300,000 - $350,000",
		"350000,400000" : "$350,000 - $400,000",
		"500000,600000" : "$500,000 - $600,000",
		"600000,700000" : "$600,000 - $700,000",
		"700000,800000" : "$700,000 - $800,000",
		"800000,1000000" : "$800,000 - $1,000,000",
		"1000000,1200000" : "$1,000,000 - $1,200,000",
		"1200000,1500000" : "$1,200,000 - $1,500,000",
		"1500000,2000000" : "$1,500,000 - $2,000,000",
		"2000000,2500000" : "$2,000,000 - $2,500,000",
		"2500000,3000000" : "$2,500,000 - $3,000,000",
		"3000000,3500000" : "$3,000,000 - $3,500,000",
		"3500000,4000000" : "$3,500,000 - $4,000,000",
		"4000000,5000000" : "$4,000,000 - $5,000,000",
		">5000001" : "Over $5,000,000"
	} : price_values;	

var price_min_obj = new qs_field();
price_min_obj.name = 'price_min';
price_min_obj.label = 'Min Price';
var price_max_obj = new qs_field();
price_max_obj.name = 'price_max';
price_max_obj.label = 'Max Price';

price_min_obj.values = {
		"0" : "No Min",
		"50000" : "$50,000",
		"100000" : "$100,000",
		"150000" : "$150,000",
		"200000" : "$200,000",
		"250000" : "$250,000",
		"300000" : "$300,000",
		"350000" : "$350,000",
		"400000" : "$400,000",
		"500000" : "$500,000",
		"600000" : "$600,000",
		"700000" : "$700,000",
		"800000" : "$800,000",
		"900000" : "$900,000",
		"1000000" : "$1,000,000",
		"1200000" : "$1,200,000",
		"1500000" : "$1,500,000",
		"2000000" : "$2,000,000",
		"2500000" : "$2,500,000",
		"3000000" : "$3,000,000",
		"3500000" : "$3,500,000",
		"4000000" : "$4,000,000",
		"5000000" : "$5,000,000"};

price_max_obj.values = {
		"999999999999" : "No Max",
		"50000" : "$50,000",
		"100000" : "$100,000",
		"150000" : "$150,000",
		"200000" : "$200,000",
		"250000" : "$250,000",
		"300000" : "$300,000",
		"350000" : "$350,000",
		"400000" : "$400,000",
		"500000" : "$500,000",
		"600000" : "$600,000",
		"700000" : "$700,000",
		"800000" : "$800,000",
		"900000" : "$900,000",
		"1000000" : "$1,000,000",
		"1200000" : "$1,200,000",
		"1500000" : "$1,500,000",
		"2000000" : "$2,000,000",
		"2500000" : "$2,500,000",
		"3000000" : "$3,000,000",
		"3500000" : "$3,500,000",
		"4000000" : "$4,000,000",
		"5000000" : "$5,000,000"};

proptypes_obj.values = (typeof (proptypes_values) === "undefined") ?
	proptypes_obj.values = {
		"SF,PH" : "Single Family Homes",
		"TH,AF" : "Condos/Townhomes",
		"LS" : "Loft Style"
	} : proptypes_values;


	
br_obj.values = (typeof (br_values) === "undefined") ?
	br_obj.values = {
		">1" : "1+",
		">2" : "2+",
		">3" : "3+",
		">4" : "4+",
		">5" : "5+",
	} : br_values ;

	
ba_obj.values = (typeof (ba_values) === "undefined") ?
	ba_obj.values = {
		">1" : "1+",
		">2" : "2+",
		">3" : "3+",
		">4" : "4+",
		">5" : "5+",
	} : ba_values;


if(!qs_advanced_search)
	var qs_advanced_search = 0; //1 is true; 0 is false;
	
if(!qs_search_target)
	var qs_search_target = '_blank';

if(!qs_labels)
	var qs_labels = 'outside';

if(!qs_title)
	var qs_title = '<h3>Quick Home Search</h3>';

var qs_search = '<input id="qs_search" type="button" value="Search Now" />';
var qs_adv_search = '<input id="qs_adv_search" type="button" value="Advanced Search" />';
if(!qs_price_range){
	var qs_fields = [cities_obj.name, price_min_obj.name, price_max_obj.name, proptypes_obj.name, br_obj.name, ba_obj.name];	
	var qs_content = qs_title + cities_obj.field() + price_min_obj.field() + price_max_obj.field() + proptypes_obj.field() + br_obj.field() + ba_obj.field() + qs_search;
}else{
	var qs_fields = [cities_obj.name, price_obj.name, proptypes_obj.name, br_obj.name, ba_obj.name];	
	var qs_content = qs_title + cities_obj.field() + price_obj.field() + proptypes_obj.field() + br_obj.field() + ba_obj.field() + qs_search;
}
if(qs_advanced_search == 1){
	qs_content = qs_content + qs_adv_search;
}	

function qs_field_output(){
	var output = '';
	var label = '';
	if(this.label != false){		
		if(qs_labels == 'inside'){
			output += '<option value="">' + this.label + '</option>';
		}else{
			var label = '<span>'+ this.label + '</span>';
		}
	}
	for(i in this.values){
		output += '<option value="' + i + '">' + this.values[i] + '</option>';
	}
	return '<div class="' + this.name + '">' + label + '<select name="' + this.name + '">' + output + '</select></div>';
}

function qs_jq_ready(){
	jQuery(document).ready(function() {	
		jQuery('#flexidx-quicksearch').html(qs_content);
		jQuery('#qs_adv_search').live('click', function(){
			window.open(qs_base_url, qs_search_target);
		});
		jQuery('#qs_search').live('click', function(){
			var qs_query = '';
			for(i in qs_fields){			
				var qs_tmp = jQuery('[name="' + qs_fields[i] +'"]').val();
				if( qs_tmp != ''){
					qs_query += '&' + qs_fields[i] + '=' + qs_tmp;
				}
			}
			if(!qs_price_range){
				qs_query = qs_query.replace(price_min_obj.name, price_obj.name);
				qs_query = qs_query.replace('&' + price_max_obj.name + '=', ',');
			}

			var qs_url = qs_base_url + qs_query;
			if(qs_page){
				window.open(qs_page + '?url=' + encodeURIComponent(qs_url), qs_search_target);
			}else{
				window.open(qs_url, qs_search_target);
			}
		});
		jQuery('#flexidx-quicksearch').css({
			"width" : "190px",
			"text-align" : "center"		
		});
		jQuery('#flexidx-quicksearch span').css({		
			"text-align" : "left",		
			"float" : "left",		
			"padding" : "3px 0 0 0"		
		});
		jQuery('#flexidx-quicksearch select').css({
			"width" : "190px"
		});
		jQuery('#flexidx-quicksearch .' + br_obj.name).css({
			"width" : "90px",
			"float" : "left"
		});
		jQuery('#flexidx-quicksearch .' + ba_obj.name).css({
			"width" : "90px",
			"float" : "right"
		});
		jQuery('#flexidx-quicksearch .' + br_obj.name + ' select').css({
			"width" : "90px"		
		});
		jQuery('#flexidx-quicksearch .' + ba_obj.name + ' select').css({
			"width" : "90px"		
		});
		jQuery('#flexidx-quicksearch .' + price_min_obj.name).css({
			"width" : "90px",
			"float" : "left"
		});
		jQuery('#flexidx-quicksearch .' + price_max_obj.name).css({
			"width" : "90px",
			"float" : "right"
		});
		jQuery('#flexidx-quicksearch .' + price_min_obj.name + ' select').css({
			"width" : "90px"		
		});
		jQuery('#flexidx-quicksearch .' + price_max_obj.name + ' select').css({
			"width" : "90px"		
		});
	})
}

var jQueryScriptOutputted = false;
function qs_initJQuery() {

    //if the jQuery object isn't available
    if (typeof(jQuery) == 'undefined') {

        if (! jQueryScriptOutputted) {
            //only output the script once..
            jQueryScriptOutputted = true;

            //output the script (load it from google api)
            document.write("<scr" + "ipt type=\"text/javascript\" src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js\"></scr" + "ipt>");
        }
        setTimeout("qs_initJQuery()", 50);
    } else {

        $(function() {
            // do anything that needs to be done on document.ready
            // don't really need this dom ready thing if used in footer
            qs_jq_ready();
        });
    }

}
qs_initJQuery();