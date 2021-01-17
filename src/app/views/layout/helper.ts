declare var $:any;

export class LayoutHelper {

    static initLayout() {
        
	    // SIDEBAR ACTIVATE METISMENU
		$(".metismenu").metisMenu();

		// SIDEBAR TOGGLE ACTION
	    $('.js-sidebar-toggler').click(function() {
	        $('body').toggleClass('sidebar-mini');
	    });

	}
}