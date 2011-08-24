#!/usr/bin/python

import os, fileinput, re, collections

# Make this all python like !r1
# Use OO here? !r1

def listFiles(rootDir, suffix):
    fileList = []
    for root, subFolders, files in os.walk(rootDir):
        for file in files:
            if file.endswith(suffix):
                fileList.append(os.path.join(root, file))
    return fileList;


def collectComments(files, sourceType, symbol ):
    cat = collections.defaultdict(list)
    for source in files:
        extracters[sourceType](source, symbol, cat)

    return cat


def _extract(cat, multiLinePattern, singleLineComment, source, symbol):
    i = 0
    fileContents = file(source).read()
    multiLineComments = re.findall(multiLinePattern, fileContents, re.S)
    for comment in multiLineComments:
        line = comment[0]
        matched = re.findall('(' + symbol + '\w+)', line);
        for match in matched:
            cat[match].append(source + ':' + str(i) + ' -> ' + line.strip())

    # Still trying to figure out how to do this with a regex and get a line number
    for line in fileinput.FileInput(source):
        i += 1
        if singleLineComment in line:
            matched = re.findall('(' + symbol + '\w+)', line);
            for match in matched:
                cat[match].append(source + ':' + str(i) + ' -> ' + line.strip())


def extractCStyleComments(source, symbol, cat):
    singleLineComment = '//'
    multiLinePattern = '(/\*(.*?)\*/)'

    _extract(cat, multiLinePattern, singleLineComment, source, symbol)


def extractPythonComments(source, symbol, cat):
    singleLineComment = '#'
    multiLinePattern = '("""(.*?)""")'

    _extract(cat, multiLinePattern, singleLineComment, source, symbol)

extracters = {
    'js': extractCStyleComments,
    'py': extractPythonComments
}

languageSuffixes = {

    'python': 'py',
    'py': 'py',
    'js': 'js'

}
"""
Testing multiline comments !r1
"""
# Main Script

import argparse

parser = argparse.ArgumentParser(description='\n')
parser.add_argument('dirs', metavar='directory', nargs='+',
                    help='Directories to parse')
parser.add_argument('-l', dest='language', action='store',
                    default='js',
                    help='The language type to parse, options are [php,py[thon],pe[rl],ja[va],c[#,++],js')
parser.add_argument('-s', dest='symbol', action='store',
                    default='!',
                    help='The symbol type to search for, common uses are !,#,~')

args = parser.parse_args()

files = []

for d in args.dirs:
    files.extend(listFiles(d, languageSuffixes[args.language]))

print files
categories = collectComments(files, args.language, args.symbol)

print '\n\nMatches\n=======\n\n'

for k, v in categories.iteritems():
    print k, '\n\t', '\n\t'.join(v)
    print '\n\n'
    
