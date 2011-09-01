from baseExtractor import Extractor

class PythonExtractor(Extractor):
    def __init__(self, files, symbol, includeLongLines):
        self.singleLinePattern = '.*?(#.*)'
        self.multiLinePattern = '("""(.*?)""")'
        Extractor.__init__(self,files, symbol, self.singleLinePattern , self.multiLinePattern, includeLongLines)






