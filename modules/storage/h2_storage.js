var H2Storage = {};
var module = (function() {
    var db = new Database("WSO2StorageH2");
    var setup = function(){
        var query = db.query("SHOW TABLES");
        if(query.length==0){
            var script = new File("/storage-scripts/h2.sql");
            script.open("r");
            db.query(script.readAll());
            script.close();
        }
    }
    /*
			uuid - Unique identifier
			file - {name:"", data: ""}
		*/
    H2Storage.persist = function(uuid, file) {
        db.query("INSERT INTO `files` (`UUID`, `name`, `data`, `content_type`) VALUES (?, ?, ?, ?);", 
        	uuid, file.name, file.data.getStream(), file.content_type);
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