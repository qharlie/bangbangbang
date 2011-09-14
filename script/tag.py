import simplejson as json

class Tag:

    def __init__(self, fileName, lineNumber, tag, comment, fileContents, priority = 0):
        self.fileName = fileName
        self.lineNumber = lineNumber
        self.tag = tag
        self.comment = comment
# This is causing the server to hang on large files !eventually
#        self.fileContents = fileContents
        self.fileContents = ''
        self.priority = priority


    def __str__(self):
        return self.fileName + ":" + str(self.lineNumber) + " [ " + str(self.priority) + " ] " + "-> " + self.comment



    def toJson(tag):
        return { 'fileName': tag.fileName, 'lineNumber': tag.lineNumber, 'comment': tag.comment , 'fileContents': json.dumps(tag.fileContents), 'priority': tag.priority};
      



        