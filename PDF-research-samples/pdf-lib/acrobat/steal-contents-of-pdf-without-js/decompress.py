import re
import zlib

pdf = open("output.pdf", "rb").read()
stream = re.compile(b'.*?FlateDecode.*?stream(.*?)endstream', re.S)

for s in re.findall(stream,pdf):
    s = s.strip(b'\r\n')
    try:
        print(zlib.decompress(s).decode('UTF-8'))
        print("")
    except:
        pass
