(function(){
	function getNav() {
		var mobileNav = $('nav[role=navigation] fieldset[role=search]')
			.after('<fieldset class="mobile-nav"></fieldset>')
			.next()
			.append('<select></select>');
			
		mobileNav
			.children('select')
			.append('<option value="">Navigate&hellip;</option>');
			
		$('ul[role=main-navigation]').addClass('main-navigation');
		$('ul.main-navigation a').each(function(link) {
			mobileNav
				.children('select')
				.append('<option value="'+link.href+'">&raquo; '+link.text+'</option>');
		});
		
		$('ul.subscription a').each(function(link) {
			mobileNav
				.children('select')
				.append('<option value="'+link.href+'">&raquo; '+link.text+'</option>');
		});
		
		mobileNav
			.children('select')
			.bind('change', function(event) {
				if (event.target.value) { 
					window.location.href = event.target.value; 
				}
			});
	}

	function addSidebarToggler() {
	  if(!$('body').hasClass('sidebar-footer')) {
	    $('#content').append('<span class="toggle-sidebar"></span>');
	    $('.toggle-sidebar').bind('click', function(e) {
	      e.preventDefault();
	      if ($('body').hasClass('collapse-sidebar')) {
	        $('body').removeClass('collapse-sidebar');
	      } else {
	        $('body').addClass('collapse-sidebar');
	      }
	    });
	  }
	  var sections = $('aside.sidebar > section');
	  if (sections.length > 1) {
	    sections.each(function(section, index){
	      if ((sections.length >= 3) && index % 3 === 0) {
	        $(section).addClass("first");
	      }
	      var count = ((index +1) % 2) ? "odd" : "even";
	      $(section).addClass(count);
	    });
	  }
	  if (sections.length >= 3){ $('aside.sidebar').addClass('thirds'); }
	}

	function testFeatures() {
	  var features = ['maskImage'];
	  $(features).map(function(feature) {
	    if (Modernizr.testAllProps(feature)) {
	      $('html').addClass(feature);
	    } else {
	      $('html').addClass('no-'+feature);
	    }
	  });
	  if ("placeholder" in document.createElement("input")) {
	    $('html').addClass('placeholder');
	  } else {
	    $('html').addClass('no-placeholder');
	  }
	}

	function addCodeLineNumbers() {
	  if (navigator.appName === 'Microsoft Internet Explorer') { return; }
	  $('div.gist-highlight').each(function(code) {
	    var tableStart = '<table><tbody><tr><td class="gutter">',
	        lineNumbers = '<pre class="line-numbers">',
	        tableMiddle = '</pre></td><td class="code">',
	        tableEnd = '</td></tr></tbody></table>',
	        count = $('.line', code).length;
	    for (var i=1;i<=count; i++) {
	      lineNumbers += '<span class="line-number">'+i+'</span>\n';
	    }
	    var table = tableStart + lineNumbers + tableMiddle + '<pre>'+$('pre', code).html()+'</pre>' + tableEnd;
	    $(code).html(table);
	  });
	}

	function flashVideoFallback(){
	  var flashplayerlocation = "/assets/jwplayer/player.swf",
	      flashplayerskin = "/assets/jwplayer/glow/glow.xml";
	  $('video').each(function(video){
	    video = $(video);
	    if (!Modernizr.video.h264 && swfobject.getFlashPlayerVersion() || window.location.hash.indexOf("flash-test") !== -1){
	      video.children('source[src$=mp4]').first().map(function(source){
	        var src = $(source).attr('src'),
	            id = 'video_'+Math.round(1 + Math.random()*(100000)),
	            width = video.attr('width'),
	            height = parseInt(video.attr('height'), 10) + 30;
	            video.after('<div class="flash-video"><div><div id='+id+'>');
	        swfobject.embedSWF(flashplayerlocation, id, width, height + 30, "9.0.0",
	          { file : src, image : video.attr('poster'), skin : flashplayerskin } ,
	          { movie : src, wmode : "opaque", allowfullscreen : "true" }
	        );
	      });
	      video.remove();
	    }
	  });
	}

	function wrapFlashVideos() {
	  $('object').each(function(object) {
	    object = $(object);
	    if ( $('param[name=movie]', object).length ) {
	      var wrapper = object.before('<div class="flash-video"><div>').previous();
	      $(wrapper).children().append(object);
	    }
	  });
	  $('iframe[src*=vimeo],iframe[src*=youtube]').each(function(iframe) {
	    iframe = $(iframe);
	    var wrapper = iframe.before('<div class="flash-video"><div>').previous();
	    $(wrapper).children().append(iframe);
	  });
	}

	function renderDeliciousLinks(items) {
	  var output = "<ul>";
	  for (var i=0,l=items.length; i<l; i++) {
	    output += '<li><a href="' + items[i].u + '" title="Tags: ' + items[i].t.join(', ') + '">' + items[i].d + '</a></li>';
	  }
	  output += "</ul>";
	  $('#delicious').html(output);
	}

	$.domReady(function() {
	  testFeatures();
	  wrapFlashVideos();
	  flashVideoFallback();
	  addCodeLineNumbers();
	  getNav();
	  addSidebarToggler();
	});
}());

// iOS scaling bug fix
// Rewritten version
// By @mathias, @cheeaun and @jdalton
// Source url: https://gist.github.com/901295
(function(doc) {
  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }
  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [0.25, 1.6];
    doc[addEvent](type, fix, true);
  }
}(document));
