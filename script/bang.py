#!/usr/bin/python

import os, fileinput, re, collections, sys, json
from pythonExtractor import PythonExtractor
from cExtractor import CstyleExtractor
from tag import Tag

# Have someone who knows pythong rewrite this !r1 ^8


def listFiles(rootDir, suffixes):
    fileList = []
    for root, subFolders, files in os.walk(rootDir):
        for file in files:
            for suffix in suffixes:
                if file.endswith(suffix):
                    fileList.append(os.path.join(root, file))
    return fileList;


extracters = {
    'js': CstyleExtractor,
    'java': CstyleExtractor,
    'c': CstyleExtractor,
    'c++': CstyleExtractor,
    'c#': CstyleExtractor,
    'py': PythonExtractor
}

languageSuffixes = {

    'python': ['py'],
    'java': ['java'],
    'py': ['py'],
    'js': ['js'],
    'c' : ['c', 'h'],
    'cpp' : ['c++','cpp','cxx', 'h'],
}

defaultSymbols = {
    'python' : '!',
    'py' : '!',
    'java' : '!',
    'js' : '!',
    'c' : '##',
    'cpp' : '##',
}

# Main Script

# Create a .bang file that has project info, login info, symbol info etc !r2 ^5

import argparse




parser = argparse.ArgumentParser(description='\n')
parser.add_argument('dirs', metavar='directory', nargs='+',
                    help='Directories to parse')
parser.add_argument('-l', dest='language', action='store',
                    default='js',
                    help='The language type to parse, options are [php,py[thon],pe[rl],ja[va],c[#,++],js')
parser.add_argument('-text', dest='text', action='store_const',const='True',
                    help='Add this to use text only display')
parser.add_argument('-s', dest='symbol', action='store',
                    help='The symbol type to search for, common uses are !,#,~')

args = parser.parse_args()

files = []

for d in args.dirs:
    files.extend(listFiles(d, languageSuffixes[args.language]))



symbol = args.symbol if args.symbol else defaultSymbols[args.language]

extractorType = extracters[args.language]
extractor = extractorType(files, symbol)
categories = extractor.run()

if args.text:
    print '\n\nBANG.\n=====\n\n'

    for k, v in categories.iteritems():
        print k, '\n\t'
        tagList = sorted(v, key=lambda v: v.priority, reverse=True)
        for tag in tagList:
            print '\t' + str(tag)
        print '\n\n'
    
else:
    print json.dumps(categories, default=Tag.toJson)

    pass
    # upload results and return a url !r1 ^9
