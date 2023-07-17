$.ajaxPrefilter(function(options) {
        options.url = 'http://43.163.217.189:373/' + options.url
        console.log(options.url)
        options.complete = function(res) {
            console.log(res)
                // console.log(res.responseJSON.code)
                // if (options.url.indexOf('/UploadHead') === 28) {
                //     console.log(options.url.indexOf('/UploadHead'))
                // } else {
            if (res.readyState === 4 && res.responseText === '上传成功') {
                // 说明头像上传成功
                setTimeout(function() {
                    window.parent.userIndex()
                }, 500)

            }

            if (res.responseJSON.code === 400 && res.responseJSON.msg === 'username不能为空') { //code===400说明没有登录，则强制跳转页面
                //1、清除token
                localStorage.clear()
                    // 2、强制跳转登录页面
                window.location = 'login.html'
            }
            // }





        }


    })
    // var layer = layui.layer; // 定义全局的layer
    // var util = layui.util;
    // console.log(layer)