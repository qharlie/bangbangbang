from baseExtractor import Extractor

class CstyleExtractor(Extractor):
    def __init__(self, files, symbol):
        self.singleLinePattern = '.*?(//.*)'
        self.multiLinePattern = '(/\*(.*?)\*/)'
        Extractor.__init__(self,files, symbol, self.singleLinePattern , self.multiLinePattern)






