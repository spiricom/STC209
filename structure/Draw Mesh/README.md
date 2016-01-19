How to import Mesh from SVG
==============

This will take you through how to import an SVG vector image into a P5 sketch
** Currently `parsesvg.py` only supports the [line and polyline](https://www.w3.org/TR/SVG/shapes.html) SVG elements. **

Parsing SVG
--------------
- Open SVG file in adobe illustrator or equivalent. 
- Fit canvas to image: *Object > Artboards > Fit to Artwork Bounds*
- Trace outline of image. In Illustrator, select the entire image, then go to *Window > Pathfinder* and click the *Outline* button
- Save as SVG file
- In terminal, navigate to the folder and run:
```
python parsesvg.py pattern.svg > output.txt
```
- This runs a python script that parses the SVG file, filtering out duplicate lines, and pipes output to `output.txt`


Displaying in P5
--------------
- Copy the `mesh` data structure from `output.txt` into `sketch.js`. 
- `mesh` is an array containing the line segments in the image, stored in the form:
```
var mesh = [[x0,y0,x1,y1],[x1,y1,x2,y2],....];
```
- Run sketch.js to test that SVG has been successfully imported. Adjust image size and position with `x_offset`, `y_offset`, `x_scale`, `y_scale`

