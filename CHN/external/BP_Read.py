from bluepy import btle


class MyDelegate(btle.DefaultDelegate):
    def __init__(self):
        btle.DefaultDelegate.__init__(self)
        # ... initialise here

    def handleNotification(self, cHandle, data):
        readFlag = 0
        strData = ""
        _len = len(data)
        for i in range (1, _len):
            print(data[i])
        if _len == 12:
            #print("Read Flag SET")
            print("BP Measurement: ", end='')
            print(data[i - 9], end='')
            print('/', end='')
            print(data[i - 7])
            print("Pulse: ", end='')
            print(data[i - 3])



# Initialisation  -------
address = "E3:F0:01:00:1C:68"
#address = btle.Peripheral('E3:F0:01:00:1C:68', btle.ADDR_TYPE_PUBLIC)
#address = "D4:8A:39:15:76:33"
service_uuid = "fff0"
char_uuid = "fff4"

p = btle.Peripheral(address)
p.setDelegate(MyDelegate())

# Setup to turn notifications on, e.g.
svc = p.getServiceByUUID(service_uuid)
ch = svc.getCharacteristics(char_uuid)[0]
"""
print(type(ch))
print(ch)
print(dir(ch))

peripheral = ch.peripheral
print(type(peripheral))
print(peripheral)

propNames = ch.propNames
print(type(propNames))
print(propNames)

properties = ch.properties
print(type(properties))
print(properties)
"""

setup_data = b"\x01\x00"
#ch.write(setup_data)
p.writeCharacteristic(ch.valHandle + 1, setup_data)

ch_data = p.readCharacteristic(ch.valHandle + 1)


while True:
    if p.waitForNotifications(1.0):
        # handleNotification() was called
        continue

    #print("Waiting...")
    # Perhaps do something else here

