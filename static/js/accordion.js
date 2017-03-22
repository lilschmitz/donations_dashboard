/**
 * Created by kathrinschmitz on 3/1/17.
 */

$(document).ready(function() {
	"use strict";

	//$('.accordion').on('click', '.accordion-control', function(e){ // When clicked
	$('.accordion .accordion-control').on('click', function(e){ // When clicked
	  e.preventDefault();                    // Prevent default action of button
	  $(this)                                // Get the element the user clicked on
		.next('.accordion-panel')            // Select following panel
		.slideToggle();                      // Use slide toggle to show or hide it
		//$(this).next('.accordion-panel').slideToggle();
	});

});