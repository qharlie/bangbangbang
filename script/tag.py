
#Make a toJson method and push to the server !r1 ^10
class Tag:

    def __init__(self, fileName, lineNumber, tag, comment, fileContents, priority = 0):
        self.fileName = fileName
        self.lineNumber = lineNumber
        self.tag = tag
        self.comment = comment
        self.fileContents = fileContents
        self.priority = priority


    def __str__(self):
        return self.fileName + ":" + str(self.lineNumber) + " [ " + str(self.priority) + " ] " + "-> " + self.comment
  