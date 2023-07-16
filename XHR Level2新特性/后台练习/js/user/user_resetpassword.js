$(function() {
    var form = layui.form
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须为6到12位的非空字符'], //判断密码输入限制字数
            repeat: function(value) { //判断原密码和新密码是否重复
                if (value === $('[name="username"]').val()) {
                    return '新老密码重复'
                }
            },
            norepeat: function(value) {
                if (value !== $('[name="newpassword"]').val()) { //判断密码一致不
                    return '新密码不一致'
                }
            }

        })
        // 修改密码

    $('#repwd-submit').on('click', function(event) {
        var ResetData = JSON.parse(localStorage.getItem('data')) //获取本地的用户名和token
        console.log(ResetData)
        event.preventDefault() //清除默认提交行为
            // 验证通过才可以执行点击事件
        var form = layui.form
        var isvalid = form.validate('[name="repassword"]') && form.validate('[name="newpassword"]'); // 主动触发验证，v2.7.0 新增 
        console.log(isvalid)
            // 验证通过
        if (isvalid) {
            $.ajax({
                type: 'POST',
                url: 'v1/UpdatePassword',
                data: {
                    username: ResetData.username,
                    usertoken: ResetData.usertoken,
                    oldpwd: $('[name="username"]').val(),
                    newpwd: $('[name="newpassword"]').val()
                },
                success: function(res) {
                    console.log(res)
                    console.log(res.data)
                    if (res.code === 400 && res.msg === '原密码错误') {
                        return layer.msg(res.msg)

                    } else {
                        layer.msg(res.msg + '，请从新登录')
                            //修改成功事件
                            // 1、清除token
                        localStorage.clear()
                            // 2、跳转登录页面
                        setTimeout(function() {
                            window.parent.userIndex()
                        }, 500)

                    }

                }
            })
        }

    })

})