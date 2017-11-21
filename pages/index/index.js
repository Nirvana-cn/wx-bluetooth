Page({
  data: {
    device: '50:F1:4A:AC:71:C5',
    service: '0000ffe0-0000-1000-8000-00805f9b34fb',
    characteristic: '0000ffe1-0000-1000-8000-00805f9b34fb'
  },
  unlock() {
    let that = this
    let buffer = new ArrayBuffer(16)
    let dataView = new DataView(buffer)
    dataView.setInt16(0, 16)
    console.log(dataView.getInt16(0))
    wx.openBluetoothAdapter({
      success(res) {
        console.log('open bluetooth')
        wx.createBLEConnection({
          deviceId: that.data.device,
          success(res) {
            console.log('bluetooth has connected')
            wx.writeBLECharacteristicValue({
              deviceId: that.data.device,
              serviceId: that.data.service,
              characteristicId: that.data.characteristic,
              value: buffer,
              success(res) {
                console.log('write data success')
              },
              fail() {
                console.log('write data failed')
              }
            })
            wx.notifyBLECharacteristicValueChange({
              state: true,
              deviceId: that.data.device,
              serviceId: that.data.service,
              characteristicId: that.data.characteristic,
              success: function (res) {
                console.log('notifyBLECharacteristicValueChange success')
                wx.onBLECharacteristicValueChange(function (res) {
                  console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
                  wx.readBLECharacteristicValue({
                    deviceId: that.data.device,
                    serviceId: that.data.service,
                    characteristicId: that.data.characteristic,
                    success: function (res) {
                      console.log('readBLECharacteristicValue:', res.characteristic.value)
                    }
                  })
                })
              }
            })
          },
          fail() {
            console.log('bluetooth connected failed')
          }
        })
      },
      fail() {
        console.log('open bluetooth failed')
      }
    })
  }
})

