package com.example.iBook.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.iBook.pojo.Post;
import com.example.iBook.pojo.User;
import com.example.iBook.repo.CommentRepository;
import com.example.iBook.repo.PostRepository;
import com.example.iBook.repo.UserRepository;

@RestController
public class PostController {
	private UserRepository UserRepo;
	private PostRepository PostRepo;
	private CommentRepository CommentRepo;
	
	
	@Autowired
	public PostController(UserRepository UserRepo, PostRepository PostRepo, CommentRepository CommentRepo) {
		this.UserRepo = UserRepo;
		this.PostRepo = PostRepo;
		
	}
	
	@RequestMapping("/save-post")
	public Post savePost(@RequestParam String content, @RequestParam int id) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = UserRepo.findFirstByName(name);
		
		if (id > 0) {
			Post post = PostRepo.findById(id).get();
			if (user.getName().equals(post.getUser().getName())) {
				post.setContent(content);
				post.setDate(new Date());
				post = PostRepo.save(post);
				return post;
			}
			
		} else {
		
		Post post = new Post();
		post.setUser(user);
		post.setContent(content);
		post.setDate(new Date());
		post = PostRepo.save(post);
		return post;
	}
		return null;
	}
	
	@RequestMapping("/get-posts")
	public List<Post> getPosts() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = UserRepo.findFirstByName(name);
		
		List<Post> posts = (List<Post>) PostRepo.findAll();
		
		for (Post post: posts) {
			if (name.equals(post.getUser().getName())) {
				post.setEditable(true);
			}
		}
		
		return posts;
	}
	
	


	
		
}


