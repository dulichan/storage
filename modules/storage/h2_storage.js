var H2Storage = {};
var module = (function() {
    var db = new Database("WSO2StorageH2");
    /*
			uuid - Unique identifier
			file - {name:"", data: ""}
			meta - {consumer_id:"", user_id:""}
		*/
    H2Storage.persist = function(uuid, file, meta) {
        db.query("INSERT INTO `files` (`UUID`, `name`, `user_id`, `consumer_id`, `data`, `content_type`) VALUES (?, ?, ?, ?, ?, ?);", 
        	uuid, file.name, meta.user_id, meta.consumer_id, file.data.getStream(), file.content_type);
    }
    H2Storage.get = function(uuid) {
        var files = db.query("SELECT * FROM `files` WHERE `UUID`=?", uuid);
        var file = files[0];
        if(file){
			var file_wrapper = {
	        	name: file.NAME,
	        	user_id: file.USER_ID,
	        	consumer_id: file.CONSUMER_ID,
	        	data: file.DATA,
	        	content_type: file.CONTENT_TYPE
	        };
	        return file_wrapper;
        }else{
        	//throw error saying file not found
        }
    }
})();