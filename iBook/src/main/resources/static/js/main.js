$(function(){

	$("#add-post").click(showAddPost);
	$("#cancel-post-button").click(removeAddPost);
	getPosts();
	
	function showAddPost() {
		$("#create-post-popup").addClass("show-add-popup");
		$("main").addClass("main-add-popup");
		console.log("test");
	}
	
	function removeAddPost() {
		$("#create-post-popup").removeClass("show-add-popup");
		$("main").removeClass("main-add-popup");
	}
	
	
	function getPosts() {
	$.ajax({
	url : "/get-posts",
	method: "get",
	type: "json",
	data: {
	},
	error: function() {
	alert("AJAX Error!");
	
	},
	success: function(data) {
	console.log(data);
	}
});

}
});
