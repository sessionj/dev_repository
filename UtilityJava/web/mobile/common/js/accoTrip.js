$(document).ready(function(){
	var meObj, chk = false;
	$('.acc_containerT').hide(); //Hide/close all containers
	//------------  first open -------------------------
	//$('.acc_triggerT:first').addClass('activeT').next().show(); //Add "active" class to first trigger, then show/open the immediate next container
	//meObj = $('.acc_triggerT:first').index();
	//-----------------------------------------------
	$('.acc_triggerT').click(function(){
		//if( $(this).next().is(':hidden') ) { //If immediate next container is closed...
			
		$('.acc_triggerT').removeClass('activeT').next().slideUp(); //Remove all .acc_trigger classes and slide up the immediate next container
		
		if(meObj == $(this).index()) {
			if(chk) {
				$(this).removeClass('activeT');
				$(this).toggleClass('activeT').next().slideDown(); //Add .acc_trigger class to clicked trigger and slide down the immediate next container
				chk = false;
			} else {
				$(this).addClass('activeT');
				$(this).toggleClass('activeT').next().slideUp(); //Add .acc_trigger class to clicked trigger and slide down the immediate next container
				chk = true;
			}
		} else {
			$(this).toggleClass('activeT').next().slideDown(); //Add .acc_trigger class to clicked trigger and slide down the immediate next container
			chk = 0;
		}
		meObj = $(this).index();
		//}
		return false; //Prevent the browser jump to the link anchor
	});
});