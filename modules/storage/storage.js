var Storage = {};
var module = (function() {
    var configs = require("/storage.json");
	function mime(path){
		var index = path.lastIndexOf('.');
	    var ext = index < path.length ? path.substring(index + 1) : '';
	    switch (ext) {
	        case 'js':
	            return 'application/javascript';
	        case 'css':
	            return 'text/css';
	        case 'html':
	            return 'text/html';
	        case 'png':
	            return 'image/png';
	        case 'gif':
	            return 'image/gif';
	        case 'jpeg':
	            return 'image/jpeg';
	        case 'jpg':
	            return 'image/jpg';
	        case 'apk':
	            return 'application/vnd.android.package-archive';
			case 'ipa':
				return 'application/octet-stream';
			case 'plist':
				return 'text/xml';
			case 'woff':
	            return 'application/octet-stream';
	        case 'ttf':
	            return 'application/octet-stream';
	        case 'hbs':
	            return 'text/x-handlebars-template';
	        case 'txt':
	        	return 'text/plain';
	        case 'json':
	        	return 'application/json';
            case 'docx':
                return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
	    }
	}

    var instatiate_engine = function(type){
        var engine = configs.storage_engine;
        if(engine=="h2"){
            return require("/modules/storage/h2_storage.js").H2Storage;
        }else if(engine=="mysql"){
            return require("/modules/storage/mysql_storage.js").MySQLStorage;
        }
    }
    var storage_engine = instatiate_engine();
    /**
      Persist a file to storage.
      file_wrapper -
        {
          file: jaggery-file object,
          name: name of the file
        }
      consumer_id - Consumer ID that is setup on Storage
    **/
    Storage.persist = function(file_wrapper, consumer_id) {
        var uuid = require("uuid").generate();
        file_wrapper.file.open("r");
        var file_data = file_wrapper.file;
        var file_object = {
            name: file_wrapper.name,
            data: file_data,
            content_type: mime(file_wrapper.name)
        }
        var meta = {
            consumer_id: consumer_id,
            user_id: user_id
        };
        storage_engine.persist(uuid, file_object, meta);
        file_wrapper.file.close();
        return uuid;
    }
    /**
      Obtain a file from the storage using uuid
    **/
    Storage.get = function(uuid) {
    	var meta = {
            consumer_id: consumer_id,
            user_id: user_id
        };
    	return storage_engine.get(uuid, meta);
    }
})();
