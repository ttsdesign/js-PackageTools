#!/usr/bin/env node
 
const Fs = require("fs");
var pkg = JSON.parse(Fs.readFileSync("package.json", "utf8"));

var program = require('commander');
program
	.version("1.0", "-v, --version")
	.description("Utility to build package outputs")
	.usage("[options] cmd [args]");
program
	.command("targets")
	.description("Output a list of available make targets")
	.action(function () {
		console.log("Targets: " + Object.keys(pkg.builds).join(", "));
		process.exit(0);
	});
program
	.command("check [target]")
	.description("Check the target for changes since last make")
	.action(Check);
program
	.command("make [target]")
	.description("Make the target")
	.action(Make);

program.parse(process.argv);

console.log("Nothing...");
 


function Make (target) {
	target = target || Object.keys(pkg.builds)[0];
	if (!Object.keys(pkg.builds).includes(target)) {
		console.error("Invalid target: "+target);
		process.exit(1);
	}
	console.log("Make(%s)", target);
}

function Check (target) {
	target = target || Object.keys(pkg.builds)[0];
	if (!Object.keys(pkg.builds).includes(target)) {
		console.error("Invalid target: "+target);
		process.exit(1);
	}
	console.log("Check(%s)", target);
}
