How to import Mesh from SVG
==============

This will take you through how to import an SVG vector image into a P5 sketch. **Currently `parsesvg.py` only supports the [line and polyline](https://www.w3.org/TR/SVG/shapes.html) SVG elements. To be expanded as needed.**

Parsing SVG
--------------
- Open SVG file in Adobe Illustrator. 
- Fit canvas to image: *Object > Artboards > Fit to Artwork Bounds*
- Remove curves: Select the entire image, then go to *Object > Path > Simplify* and chose *Straight Lines*. This should replace all curved segments with straight lines.
- Convert image to outline: Select the entire image, then go to *Window > Pathfinder* and click the *Outline* button.
- Save as SVG file: To avoid an Illustrator bug that moves the artwork around, use the following options when saving:
	1) Uncheck "Use artboards" 
	2) Uncheck "Responsive"
	3) Check 'Preserve Illustrator Editing Capabilities' 
- In terminal, navigate to the folder and run:
```
python parsesvg.py pattern.svg > output.txt
```
(you need to have python installed)
- This runs a python script that parses the SVG file, filters out duplicate lines, merges points that are very close to each other, and saves output to a file (`output.txt`)


Displaying in P5
--------------
- Copy the `mesh` data structure from `output.txt` into `sketch.js`. 
- `mesh` is an array containing the line segments in the image, stored in the form:
```
var mesh = [[x0,y0,x1,y1],[x1,y1,x2,y2],....];
```
- Run sketch.js to test that SVG has been successfully imported. Adjust image size and position with `x_offset`, `y_offset`, `x_scale`, `y_scale`

