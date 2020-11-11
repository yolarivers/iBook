$(function(){
	var editId = 0;
	
	$("#add-post").click(showAddPost);
	$("#cancel-post-button").click(removeAddPost);
	$("#save-post-button").click(savePost);
	$("main").on("click", ".editable", showEditPost);
	
	getPosts();
	
	function showEditPost() {
		$("#delete-post-button").show();
		var text = $(this).parent().parent().find(".post-content").text();
		$("#create-post-popup textarea").val(text);
		$("#create-post-popup").val(text);
		$("#create-post-popup").addClass("show-add-popup");
		$("main").addClass("main-add-popup");
		var id = $(this).data("id");
		editId = id;
	}
	
	function showAddPost() {
		$("#create-post-popup").addClass("show-add-popup");
		$("main").addClass("main-add-popup");
		$("#delete-post-button").hide();
		
	}
	
	function savePost() {
		var content = $("#create-post-popup textarea").val()
		$.ajax({
		url: "/save-post",
		method: "post",
		type: "json",
		data: {
		content: content,
		id:editId
	},
	error: function() {
	alert("AJAX Error");
	},
	success: function() {
	getPosts();
	}
	});
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
	//console.log(data);
	buildPosts(data);
	}

});

}

function buildPosts(data) {
	console.log(data);
	
	for (var i = 0; i < data.length; i++) {
		var $post = $("#post-template").clone();
		$post.removeAttr("id");
		$post.addClass("post");
		$post.find(".username").append(data[i].user.name);
		$post.find(".post-content").append(data[i].content);
		
		if (!data[i].editable) {
			$post.find(".editable").hide();	
		}
		
		$post.find(".editable").data("id", data[i].id);
		$("main").append($post);
		
		}
	}



});
