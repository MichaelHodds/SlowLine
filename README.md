# Line By Line

This module contains a class for reading the content of a file in a manner similar to Node.js readLine, supporting custom delimiters and a lazy loading approach.

The class buffers a small potion of the file at any given time, and can read through massive files with a minimal memory footprint. It is best suited to cases when one intends to perform various asynchronous tasks on each line in a huge file (such as typical Extract-Transform-Load scenarios).

My primary motivation for this project was to make a class for use in a text adventure project, gradually reading throught the file at the user's pace.

#### Example Usage:

```
var LineReader = require("line-by-line");

var reader = new LineReader("./my-file.txt");

reader.open(function(err) {
	// Can call read for as many lines as required
	reader.read(function(err, line) {
		console.log("First line: " + line);
		// Call function for every line
		reader.readEachSeries(function(line, callback) {
			console.log("Next line: " + line);
			// ...
			// Do something async
			// ...
			setImmediate(callback);
		}, function(err) {
			reader.close(function(err) {
		});
	});
});
```

## API:
---

### constructor(filePath[, terminator, encoding, bufferSize])
Returns a file reader instance

__Arguments__
 * `filePath` - Path to a file for reading
 * `terminator` - *Optional* String or RegExp to split file into "lines", default = "\n"
 * `encoding` - *Optional* file encoding, default = "UTF8"
 * `bufferSize` - *Optional* Bytes to buffer when reading, default = 4096

__Example__
```
var LineReader = require("line-by-line");

var reader = new LineReader("./my-file.txt");
```

---
### open(callback)
Open the file for reading

__Arguments__
 * `callback(err)` - Callback when opened, will return Node `fs.open` errors

---
### hasMore()
Returns `true` if there is more content in file, otherwise `false`

---
### read(callback)
Get a "line" of content

__Arguments__
 * `callback(err, line)` - Callback when "line" of content is read with arguments:
  * `err` - Node `fs.read` errors
  * `line` - String of characters up to the set terminator

---
### readEachSeries(lineCallback, endCallback)
Call a given function for each remaining "line" in the file

__Arguments__
 * `lineCallback(line, callback)` - Callack for each "line" with arguments:
  * `line` - String of characters up to the set terminator
  * `callback` - Callback function when ready for next line
 * `endCallback(err)` - Callback when finished reading "lines", will return Node `fs.read` errors

---
### close(callback)
Close the file

__Arguments__
 * `callback(err)` - Callback when closed, will return Node `fs.close` errors

---
## Developer Commands:
---

 * `npm install` - Install development modules
 * `npm test` - Run development tests
 * `npm run coverage` - Generate test coverage report in `./coverage` folder
 * `npm run lint` - Run JSHint over codebase