import { checkURL } from '/utils'
const app= getApp()
const BASE_URL= app.globalData.BASE_URL
Page({
  data: {},
  onLoad() {},
  // 点击扫描二维码
  handleScan(){
    my.scan({
      scanType: ['qrCode','barCode'],
      success: (res) => {
        this.handleScanResult(res.code)
      },
      error: err=>{
        console.log(err)
      }
    });
  },
  //扫码跳转到编号充电
  handleScanResult(url){
    const resObj= checkURL(BASE_URL,url,1)
    if(resObj.status === 200 && resObj.type === 1){
      my.reLaunch({
        url: `/pages/loading/loading?code=${resObj.code}`
      });
    }else{
      my.alert({
        title: '提示',
        content: `${resObj.status === 400 ? '地址' : '设备号'}错误`
      });
    }
    
  },
  handleGo(){
    my.navigateTo({
      url: '/pages/wantcharge/pages/numtocharge/numtocharge'
    });
  },
  handlego(){
    my.reLaunch({
      url: '/pages/changepage/chargeport/chargeport'
    })
  }
});
