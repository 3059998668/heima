$.ajaxPrefilter(function(options) {
    options.url = 'http://43.163.217.189:373/' + options.url
    console.log(options.url)
        // 统一为有usertoken 的路径添加headers请求头
        // if (options.url.indexOf('/Login') !== -1) {
        //     options.data = {
        //         username: token.username,
        //         usertoken: token.usertoken
        //     }
        // }

})

var layer = layui.layer; // 定义全局的layer
console.log(layer)