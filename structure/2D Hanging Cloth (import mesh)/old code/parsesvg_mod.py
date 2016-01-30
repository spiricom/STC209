# this file imports and SVG line drawing, removes duplicate lines, and creates an array that you can use in P5
import sys

filename = sys.argv[1]


f = open(filename, 'r')
rows = [line.split() for line in f]
f.close()

list = []
count_dupl = 0
for row in rows:
	if len(row) > 0:
		if row[0] == '<line':
			for word in row:
				if word.split('\"')[0]=='x1=':
					x1 = float(word.split('\"')[1])
				if word.split('\"')[0]=='y1=':
					y1 = float(word.split('\"')[1])
				if word.split('\"')[0]=='x2=':
					x2 = float(word.split('\"')[1])
				if word.split('\"')[0]=='y2=':
					y2 = float(word.split('\"')[1])

			if ([x1, y1, x2, y2] not in list) and ([x2, y2, x1, y1] not in list) and not (x1==x2 and y1==y2):
				list.append([x1,y1,x2,y2])
			else:
				count_dupl = count_dupl + 1

		if row[0] == '<polyline':
			print row
			for word in row:
				if word.split('\"')[0]=='points=':
					hello = 0
					#print word.split('\"')


print str(count_dupl)+"  lines removed (either duplicates or zero length)"

#print list
