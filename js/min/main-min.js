!function($){$(document).ready(function(){function e(){var e=$("#input-field").val().trim();$("#input-field").val(""),e&&$.ajax({type:"POST",url:"php/addItem.php",data:"newItem="+e,cache:!1,success:function(t){if(t){var c;$(".uncompleted-item").append($('<li id="item_'+t.trim()+'">'+s+e+l+"</li>")),n();var i=$(".uncompleted-item li").each(function(){var e=+$(this).attr("id").split("_").splice(-1);c=c+"item[]="+e+"&"});c=c.replace("undefined","").slice(0,-1),console.log(c),$.ajax({data:c,type:"POST",url:"php/sortUpdate.php",success:function(e){console.log("IDs processed:"+e)}})}else console.log("test")},error:function(e){console.log(e)}})}var t,c=function(e){$(e).toggle()},i=function(e){return t=$(e).length},n=function(){$("#completed").text(i(".completed-item > li")),$("#uncompleted").text(i(".uncompleted-item > li"))};$.fn.toggleSprite=function(e,t){return $(this).css("background-position",function(c,i){return i=i===e?t:e})},$(".toggle-completed").bind("click",function(){$(this).toggleSprite("-82px 50%","-101px 50%"),c(".completed-item")});var o=/(iPad|iPhone|iPod)/g.test(navigator.userAgent);o===!1&&$("input").focus(),$("form").keyup(function(t){13===t.which&&(e(),o&&$("input").blur())});var s='<div class="icon check-box unchecked"></div><span class="item-text">',l='</span><div class="icon trash-can"></div><div class="icon drag-grab"></div>';$("form").submit(function(e){e.preventDefault()}),$(document).on("click",".icon.check-box.unchecked",function(){var e=$(this).closest("li").attr("id").split("_")[1],t=$(this);$.ajax({type:"POST",url:"php/toggleStatus.php",data:{recId:e,status:1},cache:!1,success:function(e){101!=e&&(t.toggleSprite("-1px 50%","-21px 50%").addClass("checked").removeClass("unchecked"),setTimeout(function(){$(".completed-item").prepend(t.closest("li"))},500),n())},error:function(e){console.log("Error: "+e)}})}),$(document).on("click",".icon.check-box.checked",function(){var e=$(this).closest("li").attr("id").split("_")[1],t=$(this);$.ajax({type:"POST",url:"php/toggleStatus.php",data:{recId:e,status:0},cache:!1,success:function(e){console.log(e),101!=e&&(t.toggleSprite("-1px 50%","-21px 50%").addClass("unchecked").removeClass("checked"),setTimeout(function(){$(".uncompleted-item").append(t.closest("li"))},500),n())},error:function(e){console.log("Error: "+result)}})});var r=function(e,t){var c=document.getElementById(e);new Sortable(c,{filter:".icon",onEnd:function(e){var c,i=$(t).each(function(){var e=+$(this).attr("id").split("_").splice(-1);c=c+"item[]="+e+"&"});c=c.replace("undefined","").slice(0,-1),console.log("data: "+c),$.ajax({data:c,type:"POST",url:"php/sortUpdate.php",success:function(e){}})}})};r("uncompletedList",".uncompleted-item li"),r("completedList",".completed-item li"),$("ul").on("click",".icon.trash-can",function(){var e=$(this).closest("li").attr("id").split("_")[1],t=$(this);$.ajax({type:"POST",url:"php/deleteItem.php",data:"recId="+e,cache:!1,success:function(e){e&&(t.closest("li").remove(),n())},error:function(e){console.log("error in php")}})});var a=$(".uncompleted-item");$.fn.sortChildren=function(e){var t=this.children();return t.sort(e),this.append(t),this},$(".icon.alpha-sort").click(function(e){$(a).sortChildren(function(e,t){return $(e).find(".item-text").html().toLowerCase()>$(t).find(".item-text").html().toLowerCase()?1:-1})})})}(jQuery);