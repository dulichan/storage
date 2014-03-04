CREATE TABLE `files` (
  `UUID` varchar(40) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  `consumer_id` varchar(45) DEFAULT NULL,
  `data` longblob,
  `content_type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;