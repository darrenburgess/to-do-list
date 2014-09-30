(function($){
$(document).ready(function() {

/*
Other Todo:
- alpha sort should write to database
- commenting improvements
- combine the onClick checkbox functions
*/

/*
Cache 
	Always try to cache jQuery call at the top so that they 
	don't get executed more than once
*/

// var $iconCheckboxUnChecked = $('.icon.check-box.unchecked');
// var $iconCheckboxChecked = $('.icon.check-box.checked');

var countOfElements;

/*
General Functions and plugins
*/

var toggleDisplay = function(className){
	$(className).toggle();
};

var countElements = function(selector){
	return countOfElements = $(selector).length;
};

var updateCounts = function(){
	$('#completed').text(countElements('.completed-item > li'));
	$('#uncompleted').text(countElements('.uncompleted-item > li'));
};

// jQuery plugin that will shift the position of the sprite image
$.fn.toggleSprite = function (firstPosition, secondPosition) {
    return $(this).css('background-position',function(idx, sp){
        return sp = sp === firstPosition ? secondPosition : firstPosition;
    });
};

/* 
On click view toggle:
	show and hide completed list
	toggle position of sprite for eye icon.
*/
$('.toggle-completed').bind('click',function(){
	$(this).toggleSprite('-82px 50%','-101px 50%');
	toggleDisplay('.completed-item');
});

/*  
On press enter for task item
	create a new LI in uncomplete list - top of list
	increment the uncompleted count
	clear the form
	return to the form field
	post the data to database
*/

var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );

if (iOS === false){
	$('input').focus();
}

$('form').keyup(function(e) {
	if(e.which === 13){
		addItem();
		if(iOS){
			$('input').blur(); 
		}
	}
});

var itemHtmlFront = '<div class="icon check-box unchecked"></div><span class="item-text">';
var itemHtmlBack = '</span><div class="icon trash-can"></div><div class="icon drag-grab"></div>';

function addItem() {
	var newItem = $('#input-field').val().trim();

	$('#input-field').val('');
	if(newItem){
		$.ajax({
			type: "POST",
			url: "php/addItem.php",
			data: 'newItem=' + newItem,
			cache: false,
			success: function(result){
				if (!result){
					console.log('test');
				} else {
					var data;
					$('.uncompleted-item').prepend($('<li id="item_' + result.trim() + '">'	+ itemHtmlFront	+ newItem + itemHtmlBack + '</li>'));
					updateCounts();
					var temp = $('.uncompleted-item li').each(function(){
						var id = +$(this).attr('id').split('_').splice(-1);
						data = data + 'item[]=' + id + '&';
					});
					data = data.replace('undefined','').slice(0,-1);
					console.log(data);

					$.ajax({
						data: data,
						type: 'POST',
						url: 'php/sortUpdate.php',
						success: function(result){
							// console.log('IDs processed:' + result);
						}
					});
				}
			},
			error: function(result){
				console.log(result);
			}
		});
	}
}

$('form').submit(function(e){ e.preventDefault(); });

/*  
On click item checkbox
*/

$.fn.clickHandler = function(element, type, classAdd, classRemove, listAdd){
	var recId = element.closest('li').attr('id').split('_')[1];
	$.ajax({
		type: "POST",
		url: "php/toggleStatus.php",
		data: {
			recId: recId,
			status: type
		},
		cache: false,
		success: function(result){
			if(result != 101){
				element.toggleSprite('-1px 50%','-21px 50%')
				.addClass(classAdd)
				.removeClass(classRemove);
				setTimeout(function() {
    				$(listAdd).prepend(element.closest('li'));
				}, 500);
				updateCounts();
			}
		},
		error: function(result){
			console.log('Error: ' + result);
		}
	});
};

$(document).on('click','.icon.check-box.unchecked', function(){
	$(this).clickHandler($(this), 1, 'checked', 'unchecked', '.completed-item');
});

$(document).on('click','.icon.check-box.checked', function(){
	$(this).clickHandler($(this), 0, 'unchecked', 'checked', '.uncompleted-item');
});

/* 
On drag and drop:
	move item to new position on list
	http://stackoverflow.com/questions/15633341/jquery-ui-sortable-then-write-order-into-a-database
	https://www.youtube.com/watch?v=3mOs0VY_sIw
*/

var dragAndDrop = function (listElement, dataElement){
	var theList = document.getElementById(listElement);
	new Sortable(theList, {
		filter: '.icon',
		onEnd: function(event){
			var data;
			var temp = $(dataElement).each(function(){
							var id = +$(this).attr('id').split('_').splice(-1);
							data = data + 'item[]=' + id + '&';
						});
			data = data.replace('undefined','').slice(0,-1);
			console.log('data: ' + data);
			$.ajax({
				data: data,
				type: 'POST',
				url: 'php/sortUpdate.php',
				success: function(result){
					// 
				}
			});
		}
	});
};

dragAndDrop('uncompletedList', '.uncompleted-item li');
dragAndDrop('completedList', '.completed-item li');

/*   
On click trash icon:
	remove the list item from the UL
	create a pop-over to confirm
*/
$('ul').on('click','.icon.trash-can', function() {
	var recId = $(this).closest('li').attr('id').split('_')[1];
	var element = $(this);
	$.ajax({
		type: "POST",
		url: "php/deleteItem.php",
		data: 'recId=' + recId,
		cache: false,
		success: function(result) {
			if(!result){
				// do nothing for the moment
			} else {
				element.closest('li').remove();
				updateCounts();
			}
		},
		error: function(result) {
			console.log("error in php"); 
		}
	});
});

/* 
On click sort:
	sort uncompleted items in alpha order
*/
/* sort option 2
http://blog.rodneyrehm.de/archives/14-Sorting-Were-Doing-It-Wrong.html
*/

var $list = $('.uncompleted-item'); 

$.fn.sortChildren = function(compare) {
  var $children = this.children();
  $children.sort(compare);
  this.append($children);
  return this;
};

$('.icon.alpha-sort').click(function(e){
	$($list).sortChildren(function(a, b) {
	return 	$(a).find('.item-text').html().toLowerCase() > 
			$(b).find('.item-text').html().toLowerCase() 
			? 1 : -1;
	});
});

/*
On click edit item
*/

//end jQuery 
});

})(jQuery);