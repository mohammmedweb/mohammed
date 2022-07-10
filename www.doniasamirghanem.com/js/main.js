var Page = (function() {

	var $container = $( '#container' ),
		$menuItems = $container.find( 'ul.menu-toc > li' ),
		$tblcontents = $( '#tblcontents' ),

		ignitionTime = 1000,  // Time to wait for automaticaly open menu

		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		supportTransitions = Modernizr.csstransitions;

	function init() {

		initEvents();

	}
	
	function initEvents() {

		// show table of contents
		$tblcontents.on( 'click', toggleTOC );

		// reinit jScrollPane on window resize
		$( window ).on( 'debouncedresize', function() {
			// reinitialise jScrollPane on the content div
			//setJSP( 'reinit' );
		} );

		bindBB();

		galleryInit();

		if($('.contact').length) {
			contactPageInit();
		}

		var t = setTimeout(function () {
			$tblcontents.trigger( 'click' );
		}, ignitionTime)
	}

	function contactPageInit () {
		initializeMap();

	}

	function initializeMap() {
		var myLatlng = new google.maps.LatLng(-34.588280,-58.383046);
		var image = 'images/maps/monky-signal.png';
	    var mapOptions = {
	      center: myLatlng,
	      zoom: 18,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    var map = new google.maps.Map(document.getElementById("map_canvas"),
	        mapOptions);
	    var contentString = '<div id="infoBox">'+
		    '<div id="siteNotice">'+
		    '</div>'+
		    '<h2 id="firstHeading" class="firstHeading">Monky</h2>'+
		    '<div id="bodyContent">'+
		    '<p>Add your address<br />City, Zip Code, Country</p>'+
		    '</div>'+
		    '</div>';
		    
		var infowindow = new google.maps.InfoWindow({
		    content: contentString
		});

	    var marker = new google.maps.Marker({
		    position: myLatlng,
		    title:"Hello World!",
		    icon: image
		});
		
		google.maps.event.addListener(marker, 'click', function() {
		  infowindow.open(map,marker);
		});
		
		// To add the marker to the map, call setMap();
		marker.setMap(map);
	}

	function bindBB() {
		if ($('.blog--b').length) {
			$('.blog--b .post .post-animation').hover(
				function () {
					$(this).children('.post-meta').fadeIn();
				},
				function () {
					$(this).children('.post-meta').fadeOut();
				}
			);
		};
	}

	function galleryInit() {
		if ( $('.gallery').length ) {

			// The sliders

			var Sliders = [
					{
						cat: '#category-1',
						s: $('#gallery-slider-1').bxSlider({
								pager: false,
								infiniteLoop: false
							})
					},
					{
						cat: '#category-2',
						s: $('#gallery-slider-2').bxSlider({
								pager: false,
								infiniteLoop: false
							})
					},
					{
						cat: '#category-3',
						s: $('#gallery-slider-3').bxSlider({
								pager: false,
								infiniteLoop: false
							})
					}
				],

				current = Sliders[0].cat;

			$('#category-2, #category-3').hide();

			$('.gallery .nav-pills li a').click(function (e) {
				e.preventDefault();

				$this = $(this);

				if( !($this.parent('li').hasClass('active')) ) {
					$this.parent('li').toggleClass('active').siblings('.active').removeClass('active');

					$(current).fadeOut('fast', function () {
						var n = $this.data('category');
						current = Sliders[n].cat;
						$(current).fadeIn('fast', function () {
							Sliders[n].s.reloadSlider();
						});
					})
				}


			});

		};
	}

	function updateTOC() {
		$menuItems.removeClass( 'menu-toc-current' ).eq( current ).addClass( 'menu-toc-current' );
	}

	function toggleTOC() {
		var opened = $container.data( 'opened' );
		opened ? closeTOC() : openTOC();
	}

	function openTOC() {
		$container.addClass( 'slideRight' ).data( 'opened', true );
	}

	function closeTOC( callback ) {

		$container.removeClass( 'slideRight' ).data( 'opened', false );
		if( callback ) {
			if( supportTransitions ) {
				$container.on( transEndEventName, function() {
					$( this ).off( transEndEventName );
					callback.call();
				} );
			}
			else {
				callback.call();
			}
		}

	}

	return { init : init };

})();