console.log('main.js')
var btn = document.getElementsByClassName('btn')[0]



var printFun = function () {
    var print = document.getElementsByClassName('print')[0]
    var printHtml = print.innerHTML


    // 直接调用 window.print()
    var oldstr = document.body.innerHTML
    document.body.innerHTML = printHtml
    window.print()

    document.body.innerHTML = oldstr
    var btn = document.getElementsByClassName('btn')[0]
    btn.addEventListener('click', printFun)


    // 使用window.open() + window.print()
    /* var printContent = document.getElementsByClassName('print')[0].innerHTML
    // var wind = window.open('', 'newwindow', 
    // 'height = 300, width = 700, top = 100, left = 100, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no')
    var wind = window.open('', 'newwindow', '')
    wind.document.write('<!DOCTYPE html><html><head><title>Print it!</title><link rel="stylesheet" type="text/css" href="print.css"></script></head><body></body></html>')
    wind.document.body.innerHTML = printContent
    wind.print()
    // wind.close() */
}


btn.addEventListener('click', printFun)
