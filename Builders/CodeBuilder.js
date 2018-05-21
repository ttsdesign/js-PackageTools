

/*
module.exports = function (Builder) {

	Builder.RegisterTask("MakeClean", function () {});
	Builder.RegisterTask("TestDeps", function () {});
	Builder.RegisterTask("TestInputs", function () {});
	Builder.RegisterTask("CheckUpdate", function () {});
	Builder.RegisterTask("Process", function () {});
	Builder.RegisterTask("Test", function () {});

};
*/









function Group () {
	var name = arguments[0] || "", items = [];
	if (arguments.length == 2 && Array.isArray(arguments[1])) {
		items = arguments[1];
	}
	if (arguments.length > 2) {
		for (var i=1; i<arguments.length; i++) {
			items.push(arguments[i]);
		}
	}

	Object.defineProperty(this, "Name", {configurable: false, enumerable: false, get: function () {return name}, set: function (n) {name=n;return this}});
	Object.defineProperty(this, "Items", {configurable: false, enumerable: false, get: function () {return items}, set: function (i) {items=i;return this}});

	this[Symbol.iterator] = function* () {
		yield* items;
	};

}

var sources = new Group("sources", 
	new Group("lang","src/lodash.js","src/lang/Assert.js","src/lang/IsArray.js","src/lang/IsDefined.js","src/lang/IsFunction.js","src/lang/IsType.js","src/lang/noop.js","src/lang/Type.js"),
	new Group("String","src/lang/String/Base64.js","src/lang/String/EndsWith.js","src/lang/String/Escape.js","src/lang/String/Hash.js","src/lang/String/IsEmpty.js","src/lang/String/Match.js","src/lang/String/StartsWith.js","src/lang/String/ToMatch.js","src/lang/String/Unescape.js")
);

console.log(sources instanceof Group);


function Builder (sources) {

}

/*
for (let group of sources) { 
    console.log(group.Name);
	for (let file of group) {
		console.log(file);
	}
}
*/

/*
	"Array": [
		"src/lang/Array/Difference.js",
		"src/lang/Array/from.js",
		"src/lang/Array/Intersection.js",
		//"src/lang/Array/Union.js",

		"src/lang/Array/RemoveElement.js",
		"src/lang/Array/RemoveIndex.js",
		"src/lang/Array/ToObject.js",
		"src/lang/Array/Unique.js"
	],
	"Object": [
		"src/lang/Object/Type.js",
		"src/lang/Object/Clone.js",
		"src/lang/Object/Contains.js",
		"src/lang/Object/Extend.js",
		"src/lang/Object/IsArray.js",
		"src/lang/Object/IsFunction.js",
		"src/lang/Object/IsType.js",
		"src/lang/Object/Join.js",
	],
	"Date": [
		"src/lang/Date/Constants.js",
		"src/lang/Date/Range.js",
		"src/lang/Date/Span.js"
	],
	"Platform": [
		"src/Platform/GetContext.js",
		"src/Platform/Logger.js"
	],
	"Fs": [
		"src/Fs/Path.js"
	],
	"Net": [
		"src/Net/QueryString.js"
	]
};


/*

function Builder () {
	
var sources = {
	"lang": [
		"src/lodash.js",
		"src/lang/Assert.js",
		//"src/lang/Clone.js",
		"src/lang/IsArray.js",
		"src/lang/IsDefined.js",
		//"src/lang/IsEqual.js",
		"src/lang/IsFunction.js",
		"src/lang/IsType.js",
		"src/lang/noop.js",
		"src/lang/Type.js"
	],
	"String": [
		"src/lang/String/Base64.js",
		"src/lang/String/EndsWith.js",
		"src/lang/String/Escape.js",
		"src/lang/String/Hash.js",
		"src/lang/String/IsEmpty.js",
		"src/lang/String/Match.js",
		"src/lang/String/StartsWith.js",
		"src/lang/String/ToMatch.js",
		"src/lang/String/Unescape.js"
	],
	"Array": [
		"src/lang/Array/Difference.js",
		"src/lang/Array/from.js",
		"src/lang/Array/Intersection.js",
		//"src/lang/Array/Union.js",

		"src/lang/Array/RemoveElement.js",
		"src/lang/Array/RemoveIndex.js",
		"src/lang/Array/ToObject.js",
		"src/lang/Array/Unique.js"
	],
	"Object": [
		"src/lang/Object/Type.js",
		"src/lang/Object/Clone.js",
		"src/lang/Object/Contains.js",
		"src/lang/Object/Extend.js",
		"src/lang/Object/IsArray.js",
		"src/lang/Object/IsFunction.js",
		"src/lang/Object/IsType.js",
		"src/lang/Object/Join.js",
	],
	"Date": [
		"src/lang/Date/Constants.js",
		"src/lang/Date/Range.js",
		"src/lang/Date/Span.js"
	],
	"Platform": [
		"src/Platform/GetContext.js",
		"src/Platform/Logger.js"
	],
	"Fs": [
		"src/Fs/Path.js"
	],
	"Net": [
		"src/Net/QueryString.js"
	]
};
var outputFile = "dist/org.tts.js.core-$VERSION$.js";

//////////////////////////////////////////////////////////////////////////////////
///// Nothing to Edit Below ////////////////////////////////////////////////////
Path = require("path");
Fs = require("fs");
Uglify = require("uglify-js");

var version = Fs.readFileSync(".version", "utf8").trim();
outputFile = outputFile.replace(/\$VERSION\$/, version);

var code = {global:{}, ns:{}};
Object.keys(sources).forEach(function (m) {
	sources[m].forEach(function (f) {
		var source = Fs.readFileSync(f, "utf8");

		if ((source.match(/\(function( )*\(NS\)( )*\{/) != null) && (source.match(/\}( )*\(typeof window !== "undefined" \? window : \(typeof global !== "undefined"\) \? global : this\)\);/) != null)) {
			code.ns[f.substr(f.lastIndexOf("/")+1)] = Uglify.minify(source.replace(/\(function( )*\(NS\)( )*\{/, "").replace(/\}( )*\(typeof window !== "undefined" \? window : \(typeof global !== "undefined"\) \? global : this\)\);/, ""), {compress: {keep_fnames:true, dead_code:false}, mangle: {keep_fnames:true}});
		} else {
			code.global[f.substr(f.lastIndexOf("/")+1)] = Uglify.minify(source, {compress: {keep_fnames:true, dead_code:false}, mangle: {keep_fnames:true}});
		}
	});
});


var output = "";
Object.keys(code.global).forEach(function (f) {
	output += code.global[f].code + "\n";
});

output += "(function(NS) {\n";
Object.keys(code.ns).forEach(function (f) {
	output += "\t"+code.ns[f].code + "\n";
});
output += "}(typeof window !== \"undefined\" ? window : (typeof global !== \"undefined\") ? global : this));\n";


Fs.writeFileSync(outputFile, output, "utf8");
Fs.writeFileSync(outputFile.replace(/\.js$/, ".min.js"), Uglify.minify(output, {compress: {keep_fnames:true}, mangle: {keep_fnames:true}}).code, "utf8");
*/

