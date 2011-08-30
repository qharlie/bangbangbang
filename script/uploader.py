import httplib, urllib


def uploadReport(report):


    params = urllib.urlencode({'report': report})
    headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
    conn = httplib.HTTPConnection("localhost", 3001)
    conn.request("POST", "/bangapi/report/saveReport", params, headers)
    response = conn.getresponse()