// Check off Specific Todos By Clicking
$("ul").on("click", "li", function(){
	// if($(this).css("color") === "rgb(128, 128, 128)"){
	// 	$(this).css({
	// 		color: "black",
	// 		textDecoration: "none"
	// 	});
	// }
	// else{
	// 	$(this).css({
	// 		color: "gray",
	// 		textDecoration: "line-through"
	// 	});
	// }
	$(this).toggleClass("completed");
});

$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		// grabbing new todo text from input
		var todoText = $(this).val();
		// clear input
		$(this).val(""); 
		// add new todo text to the list
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
	}
});

$("i").click(function(){
	$("input[type='text']").fadeToggle();
    $(this).toggleClass('fa-plus-circle fa-minus-circle');
});



