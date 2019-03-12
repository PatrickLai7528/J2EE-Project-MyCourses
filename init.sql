-- MySQL dump 10.13  Distrib 8.0.15, for macos10.14 (x86_64)
--
-- Host: localhost    Database: j2ee_mycourses
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_entity`
--

DROP TABLE IF EXISTS `admin_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admin_entity` (
  `admin_email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_entity`
--

LOCK TABLES `admin_entity` WRITE;
/*!40000 ALTER TABLE `admin_entity` DISABLE KEYS */;
INSERT INTO `admin_entity` VALUES ('admin@gmail.com','admin');
/*!40000 ALTER TABLE `admin_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment_entity`
--

DROP TABLE IF EXISTS `assignment_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `assignment_entity` (
  `assid` bigint(20) NOT NULL AUTO_INCREMENT,
  `add_time` varchar(255) DEFAULT NULL,
  `ddl` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `file_size` int(11) DEFAULT NULL,
  `file_unit` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slide_entity_sid` bigint(20) DEFAULT NULL,
  `rid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`assid`),
  KEY `FKhxfr3ysvltr57ykykg2p1l558` (`slide_entity_sid`),
  KEY `FK9lkkks1lb93twkw72j9iuvyq6` (`rid`),
  CONSTRAINT `FK9lkkks1lb93twkw72j9iuvyq6` FOREIGN KEY (`rid`) REFERENCES `releasement_entity` (`rid`),
  CONSTRAINT `FKhxfr3ysvltr57ykykg2p1l558` FOREIGN KEY (`slide_entity_sid`) REFERENCES `slide_entity` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_entity`
--

LOCK TABLES `assignment_entity` WRITE;
/*!40000 ALTER TABLE `assignment_entity` DISABLE KEYS */;
INSERT INTO `assignment_entity` VALUES (1,'2019-03-12 20:53:803','2019-03-30','假裝有作業描述',20,'MB','作業一',4,6),(2,'2019-03-12 20:54:66','2019-04-27','依然還是不給需求',30,'MB','作業二',5,6),(3,'2019-03-12 20:59:598','2019-03-09','憂鬱的臺灣島龜',30,'MB','作業零',8,5),(4,'2019-03-12 21:01:979','2019-04-06','啊 差佬查牌呀',30,'MB','頂你',9,5),(5,'2019-03-12 21:19:827','2019-04-27','描述描述描述',22,'MB','作業一',11,4),(6,'2019-03-12 21:21:433','2019-06-14','詳見PPT',1,'GB','大作業',13,3);
/*!40000 ALTER TABLE `assignment_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment_entity_submission_entity_list`
--

DROP TABLE IF EXISTS `assignment_entity_submission_entity_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `assignment_entity_submission_entity_list` (
  `assignment_entity_assid` bigint(20) NOT NULL,
  `submission_entity_list_smid` bigint(20) NOT NULL,
  UNIQUE KEY `UK_a40jt4pmhdh8au8smff3cs969` (`submission_entity_list_smid`),
  KEY `FKi1v61jj2jfs6mloxmxj1kgjhv` (`assignment_entity_assid`),
  CONSTRAINT `FK771ydf0uphvqv4ysmkoscalth` FOREIGN KEY (`submission_entity_list_smid`) REFERENCES `submission_entity` (`smid`),
  CONSTRAINT `FKi1v61jj2jfs6mloxmxj1kgjhv` FOREIGN KEY (`assignment_entity_assid`) REFERENCES `assignment_entity` (`assid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_entity_submission_entity_list`
--

LOCK TABLES `assignment_entity_submission_entity_list` WRITE;
/*!40000 ALTER TABLE `assignment_entity_submission_entity_list` DISABLE KEYS */;
INSERT INTO `assignment_entity_submission_entity_list` VALUES (5,4);
/*!40000 ALTER TABLE `assignment_entity_submission_entity_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_entity`
--

DROP TABLE IF EXISTS `comment_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comment_entity` (
  `cmid` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment_time` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `message_from_student_student_email` varchar(255) DEFAULT NULL,
  `message_from_teacher_teacher_email` varchar(255) DEFAULT NULL,
  `fid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`cmid`),
  KEY `FK39890y7jst8w8dmexl259qo5u` (`message_from_student_student_email`),
  KEY `FKbqnvw64ut9jbusyalpqkhkfct` (`message_from_teacher_teacher_email`),
  KEY `FKi7y5ydk2s0pc1ndyfr57e1cd` (`fid`),
  CONSTRAINT `FK39890y7jst8w8dmexl259qo5u` FOREIGN KEY (`message_from_student_student_email`) REFERENCES `student_entity` (`student_email`),
  CONSTRAINT `FKbqnvw64ut9jbusyalpqkhkfct` FOREIGN KEY (`message_from_teacher_teacher_email`) REFERENCES `teacher_entity` (`teacher_email`),
  CONSTRAINT `FKi7y5ydk2s0pc1ndyfr57e1cd` FOREIGN KEY (`fid`) REFERENCES `forum_entity` (`fid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_entity`
--

LOCK TABLES `comment_entity` WRITE;
/*!40000 ALTER TABLE `comment_entity` DISABLE KEYS */;
INSERT INTO `comment_entity` VALUES (1,'2019-03-12 20:54:826','我想喝一點點',NULL,'patricklai7528@gmail.com',1),(2,'2019-03-12 20:55:687','我也想 哈哈哈',NULL,'patricklai7528@gmail.com',NULL),(3,'2019-03-12 20:55:372','那我＋1',NULL,'patricklai7528@gmail.com',NULL),(4,'2019-03-12 20:56:268','課堂報告，不報的跟貼',NULL,'patricklai7528@gmail.com',2),(5,'2019-03-12 20:56:772','161250051',NULL,'patricklai7528@gmail.com',NULL),(6,'2019-03-12 23:30:654','我是一個學生','laikinemngpatrick@gmail.com',NULL,6),(7,'2019-03-12 23:30:409','哈哈 咁啱呀 我都係學生','laikinemngpatrick@gmail.com',NULL,NULL);
/*!40000 ALTER TABLE `comment_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_entity_below_comment_list`
--

DROP TABLE IF EXISTS `comment_entity_below_comment_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comment_entity_below_comment_list` (
  `comment_entity_cmid` bigint(20) NOT NULL,
  `below_comment_list_cmid` bigint(20) NOT NULL,
  UNIQUE KEY `UK_ma5gmghh3urt3dtwevaq2fpj6` (`below_comment_list_cmid`),
  KEY `FK9ummvko6nyjl53y0jpwngc1w1` (`comment_entity_cmid`),
  CONSTRAINT `FK9rsuuo6u40cnsfyyiaodwhqmo` FOREIGN KEY (`below_comment_list_cmid`) REFERENCES `comment_entity` (`cmid`),
  CONSTRAINT `FK9ummvko6nyjl53y0jpwngc1w1` FOREIGN KEY (`comment_entity_cmid`) REFERENCES `comment_entity` (`cmid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_entity_below_comment_list`
--

LOCK TABLES `comment_entity_below_comment_list` WRITE;
/*!40000 ALTER TABLE `comment_entity_below_comment_list` DISABLE KEYS */;
INSERT INTO `comment_entity_below_comment_list` VALUES (1,2),(2,3),(4,5),(6,7);
/*!40000 ALTER TABLE `comment_entity_below_comment_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_entity`
--

DROP TABLE IF EXISTS `course_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `course_entity` (
  `cid` bigint(20) NOT NULL AUTO_INCREMENT,
  `add_time` varchar(255) DEFAULT NULL,
  `approval_state` varchar(255) DEFAULT NULL,
  `released` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `teacher_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  KEY `FK6f0cahqsd8mldj846dj09l9b0` (`teacher_email`),
  CONSTRAINT `FK6f0cahqsd8mldj846dj09l9b0` FOREIGN KEY (`teacher_email`) REFERENCES `teacher_entity` (`teacher_email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_entity`
--

LOCK TABLES `course_entity` WRITE;
/*!40000 ALTER TABLE `course_entity` DISABLE KEYS */;
INSERT INTO `course_entity` VALUES (1,'2019-03-12 19:58:910','APPROVED',_binary '','面向Web的計算','patricklai7528@gmail.com'),(2,'2019-03-12 19:58:512','REJECTED',_binary '\0','編譯原理','patricklai7528@gmail.com'),(3,'2019-03-12 19:59:18','APPROVED',_binary '','軟件工程與計算I','patricklai7528@gmail.com'),(5,'2019-03-12 19:59:46','APPROVED',_binary '','軍事理論','patricklai7528@gmail.com'),(6,'2019-03-12 19:59:706','REJECTED',_binary '\0','操作系統','patricklai7528@gmail.com'),(7,'2019-03-12 20:00:751','APPROVED',_binary '\0','數據結構與算法','patricklai7528@gmail.com'),(8,'2019-03-12 20:02:652','WAITING',_binary '\0','計算機網絡','patricklai7528@gmail.com'),(9,'2019-03-12 20:02:574','WAITING',_binary '\0','離散數學','patricklai7528@gmail.com'),(10,'2019-03-12 20:02:16','WAITING',_binary '\0','基礎日語（上）','patricklai7528@gmail.com'),(11,'2019-03-12 20:07:611','WAITING',_binary '\0','軟件構造','patricklai7528@gmail.com');
/*!40000 ALTER TABLE `course_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_entity`
--

DROP TABLE IF EXISTS `forum_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `forum_entity` (
  `fid` bigint(20) NOT NULL AUTO_INCREMENT,
  `add_time` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `student_email` varchar(255) DEFAULT NULL,
  `teacher_email` varchar(255) DEFAULT NULL,
  `rid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`fid`),
  KEY `FK4al5n7qi4gjvbdx1bucopdwhy` (`student_email`),
  KEY `FKrueo5kf0i37g0a21ydhs1fjaj` (`teacher_email`),
  KEY `FKlbl5plu8k8x914c1wwp0egkih` (`rid`),
  CONSTRAINT `FK4al5n7qi4gjvbdx1bucopdwhy` FOREIGN KEY (`student_email`) REFERENCES `student_entity` (`student_email`),
  CONSTRAINT `FKlbl5plu8k8x914c1wwp0egkih` FOREIGN KEY (`rid`) REFERENCES `releasement_entity` (`rid`),
  CONSTRAINT `FKrueo5kf0i37g0a21ydhs1fjaj` FOREIGN KEY (`teacher_email`) REFERENCES `teacher_entity` (`teacher_email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_entity`
--

LOCK TABLES `forum_entity` WRITE;
/*!40000 ALTER TABLE `forum_entity` DISABLE KEYS */;
INSERT INTO `forum_entity` VALUES (1,'2019-03-12 20:54:475','來討論點東西吧',NULL,'patricklai7528@gmail.com',6),(2,'2019-03-12 20:54:107','這是一個討論區',NULL,'patricklai7528@gmail.com',6),(3,'2019-03-12 21:02:818','數數數數',NULL,'patricklai7528@gmail.com',5),(4,'2019-03-12 21:06:512','臺灣烏龜',NULL,'patricklai7528@gmail.com',5),(5,'2019-03-12 21:09:454','測試一下能否順利更新',NULL,'patricklai7528@gmail.com',5),(6,'2019-03-12 21:10:778','討論一',NULL,'patricklai7528@gmail.com',4),(7,'2019-03-12 21:12:293','需要複習課嗎？',NULL,'patricklai7528@gmail.com',1);
/*!40000 ALTER TABLE `forum_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `releasement_entity`
--

DROP TABLE IF EXISTS `releasement_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `releasement_entity` (
  `rid` bigint(20) NOT NULL AUTO_INCREMENT,
  `approval_state` varchar(255) DEFAULT NULL,
  `dead_time` varchar(255) DEFAULT NULL,
  `effective_time` varchar(255) DEFAULT NULL,
  `end_hour` int(11) DEFAULT NULL,
  `end_min` int(11) DEFAULT NULL,
  `limit_number` int(11) DEFAULT NULL,
  `release_time` varchar(255) DEFAULT NULL,
  `repeat_after_day` int(11) DEFAULT NULL,
  `start_hour` int(11) DEFAULT NULL,
  `start_min` int(11) DEFAULT NULL,
  `course_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`rid`),
  KEY `FKiwhumvp01demqchpjvobisrit` (`course_id`),
  CONSTRAINT `FKiwhumvp01demqchpjvobisrit` FOREIGN KEY (`course_id`) REFERENCES `course_entity` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `releasement_entity`
--

LOCK TABLES `releasement_entity` WRITE;
/*!40000 ALTER TABLE `releasement_entity` DISABLE KEYS */;
INSERT INTO `releasement_entity` VALUES (1,'APPROVED','2020-01-24','2019-02-27',11,55,100,'2019-03-12 20:03:396',14,9,0,1),(3,'APPROVED','2020-03-28','2019-01-15',20,5,99,'2019-03-12 20:08:632',7,15,5,3),(4,'APPROVED','2020-03-12','2019-02-13',22,5,1,'2019-03-12 20:08:719',7,1,5,5),(5,'WAITING','2021-03-12','2020-03-13',21,25,89,'2019-03-12 20:24:753',7,20,55,1),(6,'REJECTED','2019-05-11','2019-03-14',21,25,88,'2019-03-12 20:24:128',7,8,30,5);
/*!40000 ALTER TABLE `releasement_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selection_entity`
--

DROP TABLE IF EXISTS `selection_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `selection_entity` (
  `slid` bigint(20) NOT NULL AUTO_INCREMENT,
  `score` double DEFAULT NULL,
  `select_time` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `rid` bigint(20) DEFAULT NULL,
  `student_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`slid`),
  KEY `FKbwgx3gynk4nb3475ntkqgcuhe` (`rid`),
  KEY `FK620j02tsp8bn1t6b1xr5r0e8n` (`student_email`),
  CONSTRAINT `FK620j02tsp8bn1t6b1xr5r0e8n` FOREIGN KEY (`student_email`) REFERENCES `student_entity` (`student_email`),
  CONSTRAINT `FKbwgx3gynk4nb3475ntkqgcuhe` FOREIGN KEY (`rid`) REFERENCES `releasement_entity` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selection_entity`
--

LOCK TABLES `selection_entity` WRITE;
/*!40000 ALTER TABLE `selection_entity` DISABLE KEYS */;
INSERT INTO `selection_entity` VALUES (1,NULL,'2019-03-12 21:30:346','DROPPED',4,'laikinemngpatrick@gmail.com'),(2,NULL,'2019-03-12 21:31:366','DROPPED',4,'laikinemngpatrick@gmail.com'),(3,NULL,'2019-03-12 21:31:298','ADDED',1,'laikinemngpatrick@gmail.com'),(4,NULL,'2019-03-12 22:52:293','DROPPED',4,'laikinemngpatrick@gmail.com'),(5,NULL,'2019-03-12 22:56:949','DROPPED',4,'laikinemngpatrick@gmail.com'),(6,NULL,'2019-03-12 23:02:562','DROPPED',4,'laikinemngpatrick@gmail.com'),(7,NULL,'2019-03-12 23:29:578','BY_SELECTED',4,'laikinemngpatrick@gmail.com');
/*!40000 ALTER TABLE `selection_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slide_entity`
--

DROP TABLE IF EXISTS `slide_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `slide_entity` (
  `sid` bigint(20) NOT NULL AUTO_INCREMENT,
  `download_times` bigint(20) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `upload_time` varchar(255) DEFAULT NULL,
  `rid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`sid`),
  KEY `FK5rbh9pmhfog2iwjy129cxo576` (`rid`),
  CONSTRAINT `FK5rbh9pmhfog2iwjy129cxo576` FOREIGN KEY (`rid`) REFERENCES `releasement_entity` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slide_entity`
--

LOCK TABLES `slide_entity` WRITE;
/*!40000 ALTER TABLE `slide_entity` DISABLE KEYS */;
INSERT INTO `slide_entity` VALUES (1,NULL,'sccfee60b0d-summit.jpg','假裝有課件','2019-03-12 20:50:517',6),(2,NULL,'s705f8c2587-blog-icon.png','假裝有課件','2019-03-12 20:50:402',6),(3,NULL,'s253ce48e4f-advanced.jpg','假裝有課件2','2019-03-12 20:50:519',6),(4,NULL,'s2e769dc296-bus.jpg','附件','2019-03-12 20:53:803',NULL),(5,NULL,'s8d76e84a1f-team.jpg','附件','2019-03-12 20:54:66',NULL),(6,NULL,'s9393d1e841-bear.jpg','課件一','2019-03-12 20:57:203',5),(7,NULL,'s99f85941d6-john.jpg','課件二','2019-03-12 20:57:969',5),(8,NULL,'s02e178958e-locked.jpg','附件','2019-03-12 20:59:598',NULL),(9,NULL,'s992344fcc2-design.jpg','附件','2019-03-12 21:01:979',NULL),(10,NULL,'sd03d497b27-default_cover.jpg','課件一','2019-03-12 21:18:619',4),(11,NULL,'s74fe83f09e-bear.jpg','附件','2019-03-12 21:19:827',NULL),(12,NULL,'sacd9bf2c2b-02.a1 Assignment 3 (2).ppt','PPT','2019-03-12 21:21:840',3),(13,NULL,'s03c60962e8-大作业2018.ppt','附件','2019-03-12 21:21:433',NULL),(14,NULL,'sef9acf19d8-JSP-1.pdf','PPT','2019-03-12 21:22:596',3);
/*!40000 ALTER TABLE `slide_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_entity`
--

DROP TABLE IF EXISTS `student_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `student_entity` (
  `student_email` varchar(255) NOT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `last_log_in` varchar(255) DEFAULT NULL,
  `logged_in_times` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `registry_time` varchar(255) DEFAULT NULL,
  `student_no` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_entity`
--

LOCK TABLES `student_entity` WRITE;
/*!40000 ALTER TABLE `student_entity` DISABLE KEYS */;
INSERT INTO `student_entity` VALUES ('laikinemngpatrick@gmail.com',_binary '\0','2019-03-12 23:33:625',8,'賴健明','4297f44b13955235245b2497399d7a93','2019-03-12 19:56:858','161250051');
/*!40000 ALTER TABLE `student_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission_entity`
--

DROP TABLE IF EXISTS `submission_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `submission_entity` (
  `smid` bigint(20) NOT NULL AUTO_INCREMENT,
  `file_path` varchar(255) DEFAULT NULL,
  `submit_time` varchar(255) DEFAULT NULL,
  `student_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`smid`),
  KEY `FKeqixahtjgbg88ptsq7joigtmp` (`student_email`),
  CONSTRAINT `FKeqixahtjgbg88ptsq7joigtmp` FOREIGN KEY (`student_email`) REFERENCES `student_entity` (`student_email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission_entity`
--

LOCK TABLES `submission_entity` WRITE;
/*!40000 ALTER TABLE `submission_entity` DISABLE KEYS */;
INSERT INTO `submission_entity` VALUES (1,'s75f4afa196-bear.jpg','2019-03-12 22:44:329','laikinemngpatrick@gmail.com'),(3,'sf7f11384e1-default_cover.jpg','2019-03-12 23:10:508','laikinemngpatrick@gmail.com'),(4,'s51662426bd-design.jpg','2019-03-12 23:29:781','laikinemngpatrick@gmail.com');
/*!40000 ALTER TABLE `submission_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_entity`
--

DROP TABLE IF EXISTS `teacher_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `teacher_entity` (
  `teacher_email` varchar(255) NOT NULL,
  `last_log_in` varchar(255) DEFAULT NULL,
  `logged_in_times` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `registry_time` varchar(255) DEFAULT NULL,
  `teacher_no` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`teacher_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_entity`
--

LOCK TABLES `teacher_entity` WRITE;
/*!40000 ALTER TABLE `teacher_entity` DISABLE KEYS */;
INSERT INTO `teacher_entity` VALUES ('patricklai7528@gmail.com','2019-03-12 23:31:569',13,'劉海高2','4297f44b13955235245b2497399d7a93','2019-03-12 19:55:462','87654321');
/*!40000 ALTER TABLE `teacher_entity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-12 23:37:21
