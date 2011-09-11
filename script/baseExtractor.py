import os, fileinput, re, tag

from config import config 

class Extractor:

    def __init__(self, files, symbol, singleLinePattern, mutiLinePattern, includeLongLines):

        self.includeLongLines = includeLongLines
        self.cat = {};
        self.files = files
        self.symbol = symbol
        self.singleLinePattern = singleLinePattern
        self.multiLinePattern = mutiLinePattern
        self.priorityPattern = '\^(\d)'
        

    def extract(self, source):
        i = 0
        fileContents = file(source).read()

        multiLineComments = re.findall(self.multiLinePattern, fileContents, re.S)
        for commentTuple in multiLineComments:
            comment = commentTuple[0]
            if len(comment) < config['longLine']:
                matched = re.findall('(' + self.symbol + '\w+)', comment);
                for match in matched:
                    if match in self.cat:
                        self.cat[match].append(tag.Tag( source, i, match, comment, fileContents))
                    else:
                        self.cat[match] = []
                        self.cat[match].append(tag.Tag( source, i, match, comment, fileContents))

        # Still trying to figure out how to do this with a regex and get a line number
        for line in fileinput.FileInput(source):
            i += 1
            m = re.search(self.singleLinePattern, line);
            if m:
                comment = m.group(1)
                if len(comment) < config['longLine'] :
                    matched = re.findall('(' + self.symbol + '\w+)', comment);
                    for match in matched:
                        priority = 0
                        priorityMatch = re.search(self.priorityPattern,comment);
                        if priorityMatch:
                            priority = priorityMatch.group(1)
                        if match in self.cat:
                            self.cat[match].append(tag.Tag( source, i, match, comment, fileContents, priority))
                        else:
                            self.cat[match] = []
                            self.cat[match].append(tag.Tag( source, i, match, comment, fileContents, priority))



    def run(self):

        for source in self.files:
            self.extract(source)

        return self.cat


