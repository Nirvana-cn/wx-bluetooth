# wx-bluetooth
使用微信蓝牙api
这是一个简单的使用微信小程序蓝牙api的示例
微信小程序蓝牙api重难点：
1.deviceId,serviceId,characteristicId的获取，示例里是写死的，因为常用的serviceId和characteristicId是固定的，只需要改变deviceId
2.写入的数据必须是ArrayBuffer类型，这方面的详细内容可以参考《ES6标准入门》（阮一峰）
