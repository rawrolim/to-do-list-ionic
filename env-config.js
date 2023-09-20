var fs = require('fs');
require("dotenv").config();

function environmentConfig() {	
	let envPath = 'src/environments/environment.'+process.env.ENV+'.ts';
	var data = fs.readFileSync(envPath, 'utf-8');
	fs.writeFileSync('src/environments/environment.ts', data, 'utf-8');
	console.log('[environment-config]: set environment-'+process.env.ENV+' complete');
}

environmentConfig();
