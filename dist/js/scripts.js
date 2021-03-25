/*! sethmckinney.com v0.0.1 | (c) 2021 Misha | MIT License | https://github.com/djmisha/sethmckinney.com */
// IFFE
// (function () {
//     var face = document.querySelector(".face");
//     var body = document.querySelector("body");
//     face.addEventListener("click", function (event) {
//         event.target.classList.toggle("spin");
//         body.classList.toggle("spin");
//     });
// })();


(function($) {
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	) {
		$("html").addClass("is--device");
		if (/iPad/i.test(navigator.userAgent)) {
			$("html").addClass("is--ipad");
		}
	} else {
		$("html").addClass("not--device");
	}

	$((function() {
		//doc.ready[shorthand] start

		var $desktop = 1080;
		var $tablet = 768;
		var theme_path = rm_data.tmplDirUri;
		var site_path = rm_data.siteUrl;



		/*================================
		=            Wow INIT            =
		================================*/

		new WOW({
			// mobile: false,
		}).init();

		/*=============================
		=            Blazy            =
		=============================*/
		
		var bLazy = new Blazy();
		

		/*===================================
		=            Sticky             =
		===================================*/

		/* Change Up Navigation on Scroll Down */
		// $(window).scroll(function () {
		// 	if ($(window).scrollTop() > 50 && $('html').hasClass('not--device') 
		// 		&& 
		// 		$(window).width() > 1080
		// 		) 
		// 	{
		// 		$('.nav-bar').addClass('change-up-nav');
		// 	} else {
		// 		$('.nav-bar').removeClass('change-up-nav');
		// 	}
	 //    });



	 	/*=========================================
	 	=            Locations Trigger            =
	 	=========================================*/
	 	
	 	$('.locations-trigger').click((function(event) {
	 		/* Act on the event */
	 		$('.nav-bar-locations').toggleClass('locations-active');
	 	}));
	 	

	
		
		/*================================
		=            Parallax            =
		================================*/

		$(window).on("load resize", (function(e) {
			if ($("html").hasClass("is--device")) {
				if ($(".is-parallaxing").length > 0) {
					$(".will-parallax")
						.removeClass("is-parallaxing")
						.removeAttr("style");
				}
			} else {
				$(".will-parallax").addClass("parallax");
				$(".will-parallax").addClass("is-parallaxing");

				
				if ($(".parallax").hasClass("parallax")) {
					$(".will-parallax").waypoint((function() {
						$(".parallax-welcome").parallax("center", -0.3, true); 
						$(".footer-parallax").parallax("center", -0.2, true);
						// $(".home-reviews-parallax").parallax("center", -0.2, true);
						// $('.parallax-home-breast').parallax('center', -0.3, true , 'is-parallaxing');
						$(".parallax-internal-header").parallax("center", -0.1, true);
					}));
				}
			}
		}));

		


		/*============================================================
		=            Fancybox for WordPress Core Gallery             =
		============================================================*/

		// Activate Fancy Box for WP Core Gallery

		$(".gallery-icon a, .blocks-gallery-item a").attr("data-fancybox", "gallery");

		// Append the Caption

		$("dl.gallery-item").each((function(event) {
			var caption = $(this).find("dd").text();
			$(this).find("dt a").attr("data-caption", caption);
		}));



		/*================================================================
		=            Custom Landing Page Header, Append Items            =
		================================================================*/

		function checkWidth() {
			var $window = $(window);
			var windowsize = $window.width();
			if (windowsize >= $desktop) {
				$(".tmpl_type_page_landing .site-crumbs").appendTo("header");
				$(".tmpl_type_page_landing .page-title").appendTo("header");
				// $(".tmpl_type_page_landing .flexible-basic-content:first-of-type()").appendTo("header");

			  }
			  else {
			  	$(".tmpl_type_page_landing .site-crumbs").prependTo(".interior");
			  	$(".tmpl_type_page_landing .page-title").prependTo(".content");
			  	// $(".tmpl_type_page_landing .flexible-basic-content:first-of-type()").prependTo(".content");
			  }
			}
		// Execute on load
		checkWidth();
		// Bind event listener
		$(window).resize(checkWidth);



	})); // end of doc.ready
})(jQuery);
	




/*=============================================
=            Track Outbound Clicks            =
=============================================*/

function trackOutboundLink(event) {
	// prevent the default behavior
	event.preventDefault();

	// get necessary info
	var url = this.href;
	var label =
		this.dataset.label !== "undefined" ? this.dataset.label : url; // Fallback to URL just in case no label was set. Safety first kids
	var target =
		this.target !== "" && this.target == "_blank" ? "new" : "self";

	// Just making sure this exists
	if (typeof gtag !== "undefined") {
		gtag("event", "click", {
			event_category: "outbound",
			event_label: label,
			transport_type: "beacon",
			event_callback: function() {
				if (target == "new") {
					window.open(url);
				} else {
					document.location = url;
				}
			}
		});
	} else {
		// trigger default behavior as fallback in case the gtag was omitted
		if (target == "new") {
			window.open(url);
		} else {
			document.location = url;
		}
	}
} // end tarckOutboundLink()

// Grab all our links
var linksToTrack = document.querySelectorAll(".track-outbound");

// Add click event to all of our tracked links
for (var i = 0; i < linksToTrack.length; i++) {
	linksToTrack[i].addEventListener("click", trackOutboundLink, false);
}
