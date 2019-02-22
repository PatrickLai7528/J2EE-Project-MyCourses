package com.MyCourses.client;

import com.MyCourses.entity.TeacherEntity;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class RestClientUtil {
//    public void getArticleByIdDemo() {
//    	HttpHeaders headers = new HttpHeaders();
//    	headers.setContentType(MediaType.APPLICATION_JSON);
//        RestTemplate restTemplate = new RestTemplate();
//	    String url = "http://localhost:8080/user/teacherEntity/{id}";
//        HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
//        ResponseEntity<TeacherEntity> responseEntity = restTemplate.exchange(url, HttpMethod.GET, requestEntity, TeacherEntity.class, 1);
//        TeacherEntity teacherEntity = responseEntity.getBody();
//        System.out.println("Id:"+ teacherEntity.getTeacherEmail()+", Title:"+ teacherEntity.getTitle()
//                 +", Category:"+ teacherEntity.getCategory());
//    }

	public void getAllArticlesDemo() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
        RestTemplate restTemplate = new RestTemplate();
	    String url = "http://localhost:8080/user/teacher";
        HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
        ResponseEntity<TeacherEntity[]> responseEntity = restTemplate.exchange(url, HttpMethod.GET, requestEntity, TeacherEntity[].class);
        TeacherEntity[] teacherEntities = responseEntity.getBody();
        for(TeacherEntity teacherEntity : teacherEntities) {
              System.out.println(teacherEntity);
        }
    }
//    public void addArticleDemo() {
//    	HttpHeaders headers = new HttpHeaders();
//    	headers.setContentType(MediaType.APPLICATION_JSON);
//        RestTemplate restTemplate = new RestTemplate();
//	    String url = "http://localhost:8080/user/article";
//	    TeacherEntity objTeacherEntity = new TeacherEntity();
//	    objTeacherEntity.setTitle("Spring REST Security using Hibernate");
//	    objTeacherEntity.setCategory("Spring");
//        HttpEntity<TeacherEntity> requestEntity = new HttpEntity<TeacherEntity>(objTeacherEntity, headers);
//        URI uri = restTemplate.postForLocation(url, requestEntity);
//        System.out.println(uri.getPath());
//    }
//    public void updateArticleDemo() {
//    	HttpHeaders headers = new HttpHeaders();
//    	headers.setContentType(MediaType.APPLICATION_JSON);
//        RestTemplate restTemplate = new RestTemplate();
//	    String url = "http://localhost:8080/user/article";
//	    TeacherEntity objTeacherEntity = new TeacherEntity();
//	    objTeacherEntity.setTeacherEmail(1);
//	    objTeacherEntity.setTitle("Update:Java Concurrency");
//	    objTeacherEntity.setCategory("Java");
//        HttpEntity<TeacherEntity> requestEntity = new HttpEntity<TeacherEntity>(objTeacherEntity, headers);
//        restTemplate.put(url, requestEntity);
//    }
//    public void deleteArticleDemo() {
//    	HttpHeaders headers = new HttpHeaders();
//    	headers.setContentType(MediaType.APPLICATION_JSON);
//        RestTemplate restTemplate = new RestTemplate();
//	    String url = "http://localhost:8080/user/article/{id}";
//        HttpEntity<TeacherEntity> requestEntity = new HttpEntity<TeacherEntity>(headers);
//        restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, Void.class, 4);
//    }
    public static void main(String args[]) {
    	RestClientUtil util = new RestClientUtil();
        //util.getArticleByIdDemo();
    	util.getAllArticlesDemo();
    	//util.addArticleDemo();
    	//util.updateArticleDemo();
    	//util.deleteArticleDemo();
    }    
}
