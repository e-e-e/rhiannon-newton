
// $(window).ready(function(){

// 	//gets all containter elements
// 	var clones = [];
// 	var elements = $('.container').each(function(i,element){
// 		clones.push($(element));
// 	});

// 	$(window).on("scroll", function() {
// 		var scrollHeight = $(document).height() - $(window).innerHeight();
// 		var scrollPosition = $(window).scrollTop();
// 		//console.log('BOTTOM '+scrollHeight + ':'+scrollPosition)
// 		if (scrollHeight - scrollPosition < 1000) {
// 		  // when scroll to bottom of the page
// 		  for (var i=0; i<clones.length; i++ ) {
// 				clones[i].clone().appendTo("#main");
// 			}
// 		}
// 	});
// })
