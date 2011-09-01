import httplib, urllib
from config import config


def uploadReport(report):


    params = urllib.urlencode({'report': report})
    headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
    conn = httplib.HTTPConnection(config['host'], config['port'])
    conn.request("POST", "/bangapi/report/saveReport", params, headers)
    response = conn.getresponse()
    return response.read()