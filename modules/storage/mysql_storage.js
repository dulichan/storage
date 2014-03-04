var MySQLStorage = {};
var module = (function() {
    var db = new Database("WSO2StorageH2");
    /*
			uuid - Unique identifier
			file - {name:"", data: ""}
			meta - {consumer_id:"", user_id:""}
		*/
    MySQLStorage.persist = function(uuid, file, meta) {
        db.query("INSERT INTO `wso2_storage`.`files` (`UUID`, `name`, `user_id`, `consumer_id`, `data`, `content_type`) VALUES (?, ?, ?, ?, ?, ?);", 
        	uuid, file.name, meta.user_id, meta.consumer_id, file.data.getStream(), file.content_type);
    }
    MySQLStorage.get = function(uuid) {
        var files = db.query("SELECT * FROM `wso2_storage`.`files` WHERE `UUID`=?", uuid);
        var file = files[0];
        if(file){
			var file_wrapper = {
	        	name: file.name,
	        	user_id: file.user_id,
	        	consumer_id: file.consumer_id,
	        	data: file.data,
	        	content_type: file.content_type
	        };
	        return file_wrapper;
        }else{
        	//throw error saying file not found
        }
    }
})();