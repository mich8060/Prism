
var _auto = $('.ps_header--autocontainer').html();

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

if(getUrlParameter('q')){
	_l = $('#ps_search').val().length;
	if(_l >= 2){
		populateSuggestions(getUrlParameter('q'));
	}
	$('#ps_search').val(getUrlParameter('q').replace('+',' '));
}

function populateSuggestions(term){
	$.getJSON( "https://app.pluralsight.com/learner/search/auto-complete?searchTerm="+term, function(data){
		console.log(data.collection);
		$('.ps_header--autocontainer').html('');
		for(x=0;x<=4;x++){
			_item = data.collection[x];
			_url = _item.displayText.replace(' ','+');
			_a = $('<a />').attr({
				href: 'https://app.pluralsight.com/library/search?q='+_url
			}).html(_item.displayText);
			$('.ps_header--autocontainer').append(_a);
		}
	});
}

$(document).on({
	blur:function(e){
		_i = $('.ps_header--autosuggest')
		window.setTimeout(function(){
			_i.hide();
		},500);
	},
	focus:function(e){
		$('.ps_header--autosuggest').show();
		_l = $(this).val().length;
		if(_l >= 2){
			populateSuggestions($(this).val());
		}
	},
	keyup:function(e){
		_l = $(this).val().length;
		if(_l >= 2){
			populateSuggestions($(this).val());
		}
	}
},'#ps_search')
