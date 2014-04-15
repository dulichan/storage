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

    /** 
        Storage engine interface
        interface Storage_Engine = {
            persist: function(uuid, file){},
            get: function(uuid){},
        }
    **/
    var instatiate_engine = function(type){
        var engine = configs.storage_engine;
        if(engine=="h2"){
            return require("/modules/storage/h2_storage.js").H2Storage;
        }else if(engine=="mysql"){
            return require("/modules/storage/mysql_storage.js").MySQLStorage;
        }
    }
    /* 
        Initially designed to switch the storage engine from RDBMS to NoSQL
    */
    var storage_engine = instatiate_engine();
    /**
      Persist a file to storage.
      file - jaggery-file object
      consumer_id - Consumer ID that is setup on Storage
    **/
    Storage.persist = function(file, consumer_id) {
        var uuid = require("uuid").generate();
        file.open("r");
        var file_object = {
            name: file.getName(),
            data: file,
            content_type: mime(file.getName())
        }
        storage_engine.persist(uuid, file_object);
        file.close();
        return uuid;
    }
    /**
      Obtain a file from the storage using uuid
    **/
    Storage.get = function(uuid) {
    	return storage_engine.get(uuid);
    }
})();
