-- Dumping database structure for MyCourses
CREATE DATABASE IF NOT EXISTS `j2ee_mycourses`;

USE `j2ee_mycourses`;


-- Dumping structure for table MyCourses.articles
CREATE TABLE IF NOT EXISTS `teacher_entity` (
  `teacher_email` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `teacher_no` varchar (100) NOT NULL unique,
  PRIMARY KEY (`teacher_email`)
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `student_entity` (
  `student_email` varchar(200) NOT NULL,
  `name` varchar(200) not null,
  `password` varchar(200) not null,
  `student_no` varchar(100) not null unique,
  `deleted` boolean not null,
  primary key (`student_email`)
) ENGINE=InnoDB;


create table if not exists `assignment_entity` (
  `assid` int(11) auto_increment,
  `title` varchar(100) not null,
  `description` varchar(200) not null,
  `sid` int(11) not null,
  primary key(`assid`)
) ENGINE=InnoDB;


create table if not exists `slide_entity` (
  `sid` int(11) auto_increment,
  `titile` varchar(200) not null,
  `file_path` varchar(200) not null,
  primary key(`sid`)
)  ENGINE=InnoDB;


create table if not exists `comment_entity` (
  `cmid` int(11) auto_increment,
  `content` varchar(200) not null,
  `message_from` varchar(100) not null,
  primary key (`cmid`)
) ENGINE=InnoDB;

create table if not exists `course_entity` (
  `cid` int(11) auto_increment,
  `name` varchar(100) not null,
  `teacher_email` varchar(100) not null,
  `rcid` int(11)  ,
  primary key (`cid`)
)  ENGINE=InnoDB;

create table if not exists `forum_entity` (
  `fid` int(11) auto_increment,
  `topic` varchar(100) not null,
  primary key (`fid`)
)   ENGINE=InnoDB;

create table if not exists `releasement_entity` (
  `rid` int(11) auto_increment,
  `course_id` int(11) not null,
  `start_hour` int(11) not null,
  `start_min` int(11) not null,
  `end_hour` int(11) not null,
  `end_min` int(11) not null,
  `repeate_after_day` int(11) not null,
  `effective_time` DATE not null,
  `dead_time` date  not null,
  `limit_number` int(11) not null,
  primary key(`rid`)
)  ENGINE=InnoDB;


create table if not exists `report_card_entity` (
  `rcid` int(11) auto_increment,
  primary key (`rcid`)
) ENGINE=InnoDB ;

-- Dumping data for table MyCourses.articles: ~3 rows (approximately)
INSERT INTO `teacher_entity` (`teacher_email`, `name`, `password`, `teacher_no`) VALUES
	('1@123.com', 'Java Concurrency', 'Java','1'),
	('2@123.com', 'Hibernate HQL ', 'Hibernate' ,'2'),
	('3@123.com', 'Spring MVC with Hibernate', 'Spring', '3');
