var MySQLStorage = {};
var module = (function() {
    var db = new Database("WSO2Storage");
    /*
			uuid - Unique identifier
			file - {name:"", data: ""}
			meta - {consumer_id:"", user_id:""}
		*/
    MySQLStorage.persist = function(uuid, file, meta) {
        db.query("INSERT INTO `wso2_storage`.`files` (`UUID`, `name`, `user_id`, `consumer_id`, `data`) VALUES (?, ?, ?, ?, ?);", 
        	uuid, file.name, meta.user_id, meta.consumer_id, file.data.getStream());
    }
    MySQLStorage.get = function(uuid) {
    	log.info(uuid);
        var file_stream = db.query("SELECT * FROM `wso2_storage`.`files` WHERE `UUID`=?", uuid);
        return file_stream[0].data;
    }
})();