!function(e){e(document).ready(function(){function t(){var t=e("#input-field").val().trim();t&&e(".uncompleted-item").append(e("<li>"+l+t+s+"</li>")),e("#input-field").val(""),o()}e("input").focus();var n,i=function(t){e(t).toggle()},c=function(t){return n=e(t).length},o=function(){e("#completed").text(c(".completed-item > li")),e("#uncompleted").text(c(".uncompleted-item > li"))};o(),e.fn.toggleSprite=function(t,n){return e(this).css("background-position",function(e,i){return i=i===t?n:t})},e(".toggle-completed").bind("click",function(){e(this).toggleSprite("-82px 50%","-101px 50%"),i(".completed-item")}),e("form").keyup(function(e){13===e.which&&t()});var l='<div class="icon check-box unchecked"></div><span class="item-text">',s='</span><div class="icon trash-can"></div><div class="icon drag-grab"></div>';e("form").submit(function(e){e.preventDefault()}),e(document).on("click",".icon.check-box.unchecked",function(){e(this).toggleSprite("-1px 50%","-21px 50%").addClass("checked").removeClass("unchecked"),e(".completed-item").prepend(e(this).closest("li")),o()}),e(document).on("click",".icon.check-box.checked",function(){e(this).toggleSprite("-1px 50%","-21px 50%").addClass("unchecked").removeClass("checked"),e(".uncompleted-item").append(e(this).closest("li")),o()}),e("ul").sortable({axis:"y"}),e("ul").on("click",".icon.trash-can",function(){e(this).closest("li").remove(),o()});var d=e(".uncompleted-item");e.fn.sortChildren=function(e){var t=this.children();return t.sort(e),this.append(t),this},e(".icon.alpha-sort").click(function(t){e(d).sortChildren(function(t,n){return e(t).find(".item-text").html().toLowerCase()>e(n).find(".item-text").html().toLowerCase()?1:-1})})})}(jQuery);