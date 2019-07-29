console.log('main.js')
var btn = document.getElementsByClassName('btn')[0]



var print = function () {
    var print = document.getElementsByClassName('print')[0]
    var printHtml = print.innerHTML

   // window.print()

    // 直接调用 window.print()
    /* var oldstr = document.body.innerHTML
    document.body.innerHTML = printHtml
    window.print()
    document.body.innerHTML = oldstr */

    // 使用window.open() + window.print()

    var printContent = document.getElementsByClassName('print')[0].innerHTML
    // var wind = window.open('', 'newwindow', 
    // 'height = 300, width = 700, top = 100, left = 100, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no')
    var wind = window.open('', 'newwindow', '')
    var printCss = './print.css'
    wind.document.write('<html><head><title>Print it!</title><link rel="stylesheet" type="text/css" href="print.css"></script></head><body></body></html>')
    // wind.document.head.innerHTML = '<link rel="stylesheet" type="text/css" href="' + printCss + '">'
    wind.document.body.innerHTML = printContent
    wind.print()
    // wind.close()
}

console.log('btn', btn)
btn.addEventListener('click', print)
