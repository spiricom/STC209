# this file imports and SVG line drawing, removes duplicate lines, and creates an array that you can use in P5
import sys

filename = sys.argv[1]


f = open(filename, 'r')
rows = [line.split() for line in f]
f.close()

list = []
count_dupl = 0
for row in rows:
	if not row in list:
		if row[0] == '<line':
			list.append(row)
	else:
		count_dupl = count_dupl + 1

print str(count_dupl)+" duplicate lines detected and removed."


count = 0
print "var mesh = [",
for row in list:
	print "[",
	for word in row:
		#print word,
		if word.split('\"')[0]=='x1=':
			sys.stdout.write(word.split('\"')[1])
			print ",",
		if word.split('\"')[0]=='y1=':
			sys.stdout.write(word.split('\"')[1])
			print ",",
		if word.split('\"')[0]=='x2=':
			sys.stdout.write(word.split('\"')[1])
			print ",",
		if word.split('\"')[0]=='y2=':
			sys.stdout.write(word.split('\"')[1])

	count = count + 1

	if(count < len(list)):
		print "],",
	else:
		print"] ];"
