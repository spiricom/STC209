import sys
filename = sys.argv[1]

from xml.dom import minidom
xmldoc = minidom.parse(filename)

list = []
count_duplicates = 0
count_genuines = 0

itemlist = xmldoc.getElementsByTagName('line')
for s in itemlist:
	x1 = float(s.attributes['x1'].value)
	y1 = float(s.attributes['y1'].value)
	x2 = float(s.attributes['x2'].value)
	y2 = float(s.attributes['y2'].value)

	if ([x1, y1, x2, y2] not in list) and ([x2, y2, x1, y1] not in list) and not (x1==x2 and y1==y2):
		list.append([x1,y1,x2,y2])
		count_genuines = count_genuines + 1
	else:
		count_duplicates = count_duplicates + 1


itemlist = xmldoc.getElementsByTagName('polyline')
for s in itemlist:
	points = (s.attributes['points'].value.split())
	for i in range(len(points)-1):
		#print [points[i], points[i+1]]

		x1 = float(points[i].split(',')[0])
		y1 = float(points[i].split(',')[1])
		x2 = float(points[i+1].split(',')[0])
		y2 = float(points[i+1].split(',')[1])

		if ([x1, y1, x2, y2] not in list) and ([x2, y2, x1, y1] not in list) and not (x1==x2 and y1==y2):
			list.append([x1,y1,x2,y2])
			count_genuines = count_genuines + 1
		else:
			count_duplicates = count_duplicates + 1

print str(count_duplicates)+" lines removed (either duplicates or zero length)"
print str(count_genuines)+" lines remain"

print "var mesh = "+ str(list) + ";"