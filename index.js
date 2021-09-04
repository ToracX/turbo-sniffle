const colorsys = require('colorsys');
let Service, Characteristic, UUIDGen;
const { exec } = require('child_process');

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	UUIDGen = homebridge.hap.uuid;
	homebridge.registerAccessory("homebridge-dreamscreen", "Dreamscreen", DreamscreenAccessory);
};

function DreamscreenAccessory(log, config) {
	this.name = config["name"];
	this.ipadress = config["ipadress"];
	this.ambilightName = "DS Video Modus";
	this.AmbientName = "DS Ambient Modus";
	this.MusicName = "DS Music Modus";
	this.lightService = new Service.Lightbulb("4. Helligkeit");
	this.lightService.subtype = this.name;
	this.infoService = new Service.AccessoryInformation();
    	this.log = log;
	this.log("Initialized '" + this.name + "'");
}

DreamscreenAccessory.prototype.setcolor = function(ipadress) {
  	const color = colorsys.hsv_to_rgb({
    		h: global.hue,
    		s: global.saturation,
    		v: global.brightness
  	});
  	this.log('set dreamscreen color to', color.r, color.g, color.b);
	command = "python " + __dirname + "/dreamscreen.py -i " + ipadress + " -c " + '"' + color.r + " " + color.g + " " + color.b + '"'
 	exec(command)
}

DreamscreenAccessory.prototype.getServices = function() {
	let services = [];

	this.lightService
	.addCharacteristic(Characteristic.Brightness)
	.on('set', (value, callback) => {
		global.brightness = value
		this.log("Set dreamscreen brightness to:", value)
  		command = "python " + __dirname + "/dreamscreen.py -i " + this.ipadress + " -b"  + value
		exec(command)				  
		callback();
	})

	this.lightService
	.addCharacteristic(Characteristic.Hue)
	.on('set', (value, callback) => {
		if (value > 0) {
			global.hue = value
			this.log("Set dreamscreen hue to:", value)
			this.setcolor(this.ipadress);
			callback();
		}
		else {
			callback();
		}
	})

	this.lightService
	.addCharacteristic(Characteristic.Saturation)
	.on('set', (value, callback) => {
		if (value > 0) {
			global.saturation = value
			this.log("Set dreamscreen saturation to:", value)
			this.setcolor(this.ipadress);
			callback();
		}
		else {
			callback();
		}	
	})

	this.ambilightService = new Service.Switch("1. Ambilight"); 
  	this.ambilightService.subtype = this.ambilightName;

	this.ambilightService
	.getCharacteristic(Characteristic.On)
	.on('set', (value, callback) => {
	if (value) {
			this.log("Set dreamscreen power to", value)
			this.lightService.setCharacteristic(Characteristic.Saturation, 0);
			this.lightService.setCharacteristic(Characteristic.Hue, 0);
			commandon = "python " + __dirname + "/dreamscreen.py -i " + this.ipadress + " -m 1"
			exec(commandon)							
			callback();
	} else {
			this.log("Set dreamscreen power to", value)
			commandoff = "python " + __dirname + "/dreamscreen.py -i " + this.ipadress + " -m 0"
			exec(commandoff)					  
			callback();
		}
	})
	
	this.AmbientService = new Service.Switch("2. Ambient"); 
  	this.AmbientService.subtype = this.AmbientName;

	this.AmbientService
	.getCharacteristic(Characteristic.On)
	.on('set', (value, callback) => {
	if (value) {
			this.log("Set Modus to", value)
			this.lightService.setCharacteristic(Characteristic.Saturation, 0);
			this.lightService.setCharacteristic(Characteristic.Hue, 0);
			commandon = "python " + __dirname + "/dreamscreen.py -i " + this.ipadress + " -m 3"
			exec(commandon)							
			callback();
	} else {
			this.log("Set Modus to", value)
			this.lightService.setCharacteristic(Characteristic.Saturation, 0);
			this.lightService.setCharacteristic(Characteristic.Hue, 0);
			commandoff = "python " + __dirname + "/dreamscreen.py -i " + this.ipadress + " -m 1"
			exec(commandoff)					  
			callback();
		}
	})
	
	this.MusicService = new Service.Switch("3. Musik"); 
  	this.MusicService.subtype = this.MusicName;

	this.MusicService
	.getCharacteristic(Characteristic.On)
	.on('set', (value, callback) => {
	if (value) {
			this.log("Set Modus to", value)
			this.lightService.setCharacteristic(Characteristic.Saturation, 0);
			this.lightService.setCharacteristic(Characteristic.Hue, 0);
			commandon = "python " + __dirname + "/dreamscreen.py -i " + this.ipadress + " -m 2"
			exec(commandon)							
			callback();
	} else {
			this.log("Set Modus to", value)
			this.lightService.setCharacteristic(Characteristic.Saturation, 0);
			this.lightService.setCharacteristic(Characteristic.Hue, 0);
			commandoff = "python " + __dirname + "/dreamscreen.py -i " + this.ipadress + " -m 1"
			exec(commandoff)					  
			callback();
		}
	})

	services.push(this.ambilightService); 
	services.push(this.AmbientService); 
	services.push(this.MusicService); 
  	services.push(this.lightService); 
  	services.push(this.infoService);

	this.infoService
	.setCharacteristic(Characteristic.Manufacturer, "DreamScreen LCC")
	.setCharacteristic(Characteristic.Model, "DreamScreen HD")
	.setCharacteristic(Characteristic.SerialNumber, this.ipadress)
	.setCharacteristic(Characteristic.FirmwareRevision, "1.6.17");

	return services;
};
