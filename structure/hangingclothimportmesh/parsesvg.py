# this file imports and SVG line drawing, removes duplicate lines, and creates an array that you can use in P5
import sys

filename = sys.argv[1]


f = open(filename, 'r')
rows = [line.split() for line in f]
f.close()

list = []
count = 0
for row in rows:
	if not row in list:

		if row[0] == '<line':
			count = count + 1

		list.append(row)


list = []

i = 0
print "var mesh = [",
for row in rows:

	if not row in list:

		if row[0] == '<line':
			print "[",
			j = 0

			for word in row[5:9]:

				#print word.split("\"")[1],
				sys.stdout.write(word.split("\"")[1])
				if(j<3):
					print ",",
				j = j + 1;

			if (i<count-1):
				print "],",
			else:
				print "] ];";

			i = i + 1
		
		list.append(row)
