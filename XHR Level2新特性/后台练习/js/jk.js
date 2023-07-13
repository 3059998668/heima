$.ajaxPrefilter(function(options) {
    options.url = 'http://43.163.217.189:373/' + options.url
    console.log(options.url)
})