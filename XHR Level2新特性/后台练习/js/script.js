$(function() {

    //登陆的js代码
    layui.use(function() {
        var form = layui.form;
        var layer = layui.layer;
        // 提交事件
        form.on('submit(demo-login)', function(data) {
            console.log(data)
            var field = data.field; // 获取表单字段值
            console.log(field)
                // 显示填写结果，仅作演示用
                // layer.alert(JSON.stringify(field), {
                //     title: '当前填写的字段值'
                // });

            // canvas


            // 将输入的内容转为大写，可通过这步进行大小写验证
            var val = $(".input-val").val().toLowerCase();
            // 获取生成验证码值
            var num = $('#canvas').attr('data-code');
            if (val == '') {
                layer.msg('请输入验证码！');
            } else if (val == num) {
                // alert('提交成功！');
                $(".input-val").val('');
                // draw(show_num);
                $.ajax({
                    type: 'GET',
                    url: 'v1/Login',
                    // dataType: 'jsonp', //使用jsonp解决get跨域
                    data: {
                        username: field.username,
                        password: field.password
                    },
                    success: function(res) {

                        console.log(res.msg, res)
                        layer.msg(res.msg);
                        // 这里写登录成功后的事件
                        window.location = 'index.html'


                    }
                })
                code_draw(); //从新调用验证码


            } else {
                code_draw(); //从新调用验证码
                $(".input-val").val('');
                // draw(show_num);
                layer.msg('验证码错误！请重新输入！');


            }


            // $.ajax({
            //     type: 'GET',
            //     url: 'v1/Login',
            //     // dataType: 'jsonp', //使用jsonp解决get跨域
            //     data: {
            //         username: field.username,
            //         password: field.password
            //     },
            //     success: function(res) {
            //         console.log(res)
            //     }
            // })
            return false; // 阻止默认 form 跳转
        });


    });
    // 登录--------------------------------------------

    // 注册
    // 注册的js代码
    layui.use(function() {
        var $ = layui.$;
        var form = layui.form;
        var layer = layui.layer;
        var util = layui.util;

        // 自定义验证规则
        form.verify({
            // 确认密码
            // 拿到确认密码文本框的value值
            confirmPassword: function(value, item) {
                var passwordValue = $('#reg-password').val();
                if (value !== passwordValue) {
                    return '两次密码输入不一致';
                }
            }
        });
        // 普通事件
        // util.on('lay-on', {
        //     // 获取验证码
        //     'reg-get-vercode': function(othis) {
        //         console.log(othis)
        //         var isvalid = form.validate('#reg-email'); // 主动触发验证，v2.7.0 新增 
        //         console.log(isvalid)
        //             // 验证通过
        //         if (isvalid) {
        //             // layer.msg('邮箱号规则验证通过');
        //             // 此处可继续书写「发送验证码」等后续逻辑
        //             $.ajax({
        //                 type: 'GET',
        //                 url: 'v1/GetRegCode',
        //                 data: {
        //                     useremail: $('#reg-email').val().trim() //获取到input邮箱的value
        //                 },
        //                 success: function(res) {
        //                     console.log(res.msg, res)
        //                     layer.msg(res.msg)
        //                         // 判断发送成功则开启倒计时，期间不能点击
        //                     if (res.code === 200) {
        //                         //发送成功事件
        //                         // var minute = 5;
        //                         // // 每隔一秒执行一次
        //                         // items = setInterval(function() {

        //                         //     if (minute < 2) {
        //                         //         clearInterval(items)
        //                         //     }
        //                         //     minute--;
        //                         //     console.log(minute)
        //                         //         // 渲染到页面上
        //                         //     $('#obtain-code').html(minute + "秒后从新获取")

        //                         // }, 1000)


        //                     }


        //                 }

        //             })
        //         }
        //     }
        // });

        // 点击邮箱发送事件
        $('#h1').on('click', function() {
            // 发送内容
            $.ajax({
                type: 'GET',
                url: 'v1/GetRegCode',
                data: {
                    useremail: $('#reg-email').val() //获取到input邮箱的value
                },
                success: function(res) {
                    console.log(res.msg, res)
                    layer.msg(res.msg)
                        // 判断发送成功则开启倒计时，期间不能点击
                    if (res.code === 200) {
                        //发送成功事件
                        // var minute = 5;
                        // // 每隔一秒执行一次
                        // items = setInterval(function() {

                        //     if (minute < 2) {
                        //         clearInterval(items)
                        //     }
                        //     minute--;
                        //     console.log(minute)
                        //         // 渲染到页面上
                        //     $('#obtain-code').html(minute + "秒后从新获取")

                        // }, 1000)


                    }


                }

            })
        })

        // $('#reg-submit').on('click', function(data) {
        //     data.preventDefault() //清除默认行为
        //     var formdata = $('#reg-form').serialize();
        //     console.log(formdata)
        //     console.log($('#reg-email').val())
        //     var username = $('#reg-username').val()
        //     var password = $('#reg-password').val()
        //     var useremail = $('#reg-email').val()
        //     var code = $('#reg-code').val()
        //     var data = '?username=' + username + '&password=' + password + '&useremail=' + useremail + '&code=' + code
        //     console.log(data)
        //     $.ajax({
        //         type: 'GET',
        //         url: 'v1/Register' + data,

        //         // data: data,
        //         // data: {
        //         //     username: $('#reg-username').val(),
        //         //     password: $('#reg-password').val(),
        //         //     useremail: $('#reg-email').val(),
        //         //     code: $('#reg-code').val()
        //         // },
        //         success: function(res) {
        //             console.log(res)
        //         }
        //     })


        // })


        // 提交事件
        form.on('submit(demo-reg)', function(data) {
            var field = data.field; // 获取表单字段值
            console.log(field.username, field.password, field.useremail, field.code)
                // 是否勾选同意
                // if (!field.agreement) {
                //     layer.msg('您必须勾选同意用户协议才能注册');
                //     return false;
                // }

            // 显示填写结果，仅作演示用
            // layer.alert(JSON.stringify(field), {
            //     title: '当前填写的字段值'
            // });

            // 此处可执行 Ajax 等操作
            var formdata = $('#reg-form').serialize();
            console.log(formdata)
            $.ajax({
                type: 'GET',
                url: 'v1/Register',

                // data: field,
                data: {
                    username: field.username,
                    password: field.password,
                    useremail: field.useremail,
                    code: field.code
                },
                success: function(res) {
                    console.log(res)
                }
            })



            return false; // 阻止默认 form 跳转
        });


    });

    // 注册





    //登录json请求
    function login() {
        var a = $('#btn-login').serialize()
        console.log(a)
        $.ajax({
            type: "GET",
            url: 'v1/Login',
            data: {
                username: '123456',
                password: '123456'
            },
            success: function(res) {
                console.log(res)
            }
        })


    }
    // login()

    // canvas
    code_draw();
    // // 点击后刷新验证码
    $("#canvas").on('click', function() {
        code_draw();
    })

    // $(".input-val").on('change', function() {
    //     // 将输入的内容转为大写，可通过这步进行大小写验证
    //     var val = $(".input-val").val().toLowerCase();
    //     // 获取生成验证码值
    //     var num = $('#canvas').attr('data-code');
    //     if (val == '') {
    //         alert('请输入验证码！');
    //     } else if (val == num) {
    //         alert('提交成功！');
    //         $(".input-val").val('');
    //         draw(show_num);

    //     } else {
    //         alert('验证码错误！请重新输入！');
    //         $(".input-val").val('');
    //         draw(show_num);
    //     }
    // })
})