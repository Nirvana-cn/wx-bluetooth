Page({
  data: {
    device: '50:F1:4A:AC:71:C5',
    service: '0000ffe0-0000-1000-8000-00805f9b34fb',
    characteristic: '0000ffe1-0000-1000-8000-00805f9b34fb'
  },
  unlock() {
    let that = this
    wx.openBluetoothAdapter({
      success(res) {
        console.log('open bluetooth')
        wx.createBLEConnection({
          deviceId: that.data.device,
          success(res) {
            console.log('bluetooth has connected')
            let buffer = new ArrayBuffer(32)
            for(let i=97;i<=100;i++){
              let dataView = new DataView(buffer)
              dataView.setInt8(i-97, i)
              console.log(dataView.getInt8(i-97))
            }
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
                  let dataView = new DataView(res.value)
                  console.log(`characteristic ${res.characteristicId} has changed`)
                  console.log(dataView.getInt8(0))
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

