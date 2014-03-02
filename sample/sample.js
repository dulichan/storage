var storage = require("storage").storage;
/* 
	To be configured with 
		{
			provider-name: sdf
			provider-secret: sdf
		}
*/
storage.configure({});


var file = new File();
/*
	persist a file 
	meta will contain
		{
			id = id to access the file
		}
*/
var meta = storage.put(file);

/* 
	request a file by sending the file id
*/
var file = storage.get(id);

/* 
	delete a file by sending the id. Returns response of the operations
*/
var meta = storage.delete(id);
