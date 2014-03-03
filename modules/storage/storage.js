/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 http://jcward.com/UUID.js
 **/
var UUID = (function() {
    var self = {};
    var lut = [];
    for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
    }
    self.generate = function() {
        var d0 = Math.random() * 0xffffffff | 0;
        var d1 = Math.random() * 0xffffffff | 0;
        var d2 = Math.random() * 0xffffffff | 0;
        var d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
    }
    return self;
})();
var Storage = {};
var module = (function() {
    Storage.persist = function(file_wrapper, consumer_id, user_id) {
        var engine = require("/modules/storage/mysql_storage.js").MySQLStorage;
        var uuid = UUID.generate();
        file_wrapper.file.open("r");
        var file_data = file_wrapper.file;
        var file_object = {
            name: file_wrapper.name,
            data: file_data
        }
        var meta = {
            consumer_id: consumer_id,
            user_id: user_id
        };
        engine.persist(uuid, file_object, meta);
        file_wrapper.file.close();
        return uuid;
    }
    Storage.get = function(uuid, consumer_id, user_id) {
    	var engine = require("/modules/storage/mysql_storage.js").MySQLStorage;
    	var meta = {
            consumer_id: consumer_id,
            user_id: user_id
        };
    	return engine.get(uuid, meta);
    }
})();