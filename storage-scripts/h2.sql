CREATE TABLE `files` (
  `UUID` varchar(40) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `data` longblob,
  `content_type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`UUID`)
) 