console.log('main.js')
/**
 * 判断是否为IE浏览器
 * 
 */
function isIE() { 
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true
    } else {
        return false
    }   
}


var btn = document.getElementsByClassName('btn')[0]
var execCommandPrint

/**
 * 打印控制函数 printFun
 * 
 */
var printFun = function () {

    // 直接调用 window.print()
    /* var print = document.getElementsByClassName('print')[0]
    var printHtml = print.innerHTML
    var oldstr = document.body.innerHTML
    document.body.innerHTML = printHtml
    window.print()

    document.body.innerHTML = oldstr
    var btn = document.getElementsByClassName('btn')[0]
    btn.addEventListener('click', printFun) */


    // 使用 window.open() + window.print()
    /* var printContent = document.getElementsByClassName('print')[0].innerHTML
    // var wind = window.open('', 'newwindow', 
    // 'height = 300, width = 700, top = 100, left = 100, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no')
    var wind = window.open('', 'newwindow', '')
    wind.document.write('<!DOCTYPE html><html><head><title>Print it!</title><link rel="stylesheet" type="text/css" href="print.css"></script></head><body></body></html>')
    wind.document.body.innerHTML = printContent
    wind.print()
    // wind.close() */

    /**
     * 生成新窗口 wind 传入当前链接 在新窗口中打印
     * 
     */
    var wind = window.open(window.location.href, 'newwindow', '')
    var printContent = document.getElementsByClassName('print')[0] // 获取要打印区域

    
    /**
     * 打印函数 printContentFun
     * 
     */
    var printContentFun = function () {
        // console.log('wind.document.readyState: ', wind.document.readyState)

        // wind.document.body.innerHTML = printContent
        // wind.document.body.innerHTML = ''
        // var newNode = wind.document.importNode(printContent, true)
        // wind.document.body.appendChild(newNode)
        // console.log('printContentFun wind.document.body: ', wind.document.body)
        // wind.print()    

        var printContentClone = printContent.cloneNode(true) // 克隆要打印区域节点

        // console.log('printContentClone: ', printContentClone)
        // console.log('wind.document.body: ', wind.document.body)
        // console.log('wind.document.body.innerHTML: ', wind.document.body.innerHTML)
        // console.log('wind.document.body: ', wind.document.body)

        wind.document.body.innerHTML = ''  // 清空 wind.document.body
        
            
        try {
            if(!isIE()) {
                console.log('It is not IE')
                wind.document.body.appendChild(printContentClone)     // 非IE 插入要打印区域克隆节点
            } else {
                // console.log('printContentClone.outerHTML: ', printContentClone.outerHTML)
                wind.document.body.innerHTML = printContentClone.outerHTML  // IE 插入要打印区域克隆节点的outerHTML
            }
        } catch (e) {
            // IE错误 Automation 服务器不能创建对象 解决方法
            // 按下WIN+R，然后在运行中，输入： regsvr32 scrrun.dll 回车注册
            alert('错误: ', e.message )
            console.log('e: ', e)
        }
    
        // console.log('printContentFun wind.document.body: ', wind.document.body)
        // console.log('wind.document.readyState: ', wind.document.readyState)

        // wind.print()    
        execCommandPrint = wind.document.execCommand("print")
        console.log('wind.document.execCommand("print"): ', execCommandPrint)
        console.log('print')

        if(isIE() && wind.document.readyState === 'complete') {       // IE 打印结束 关闭窗口
            wind.close()
        }
    } 

    /* if (wind.document.readyState === 'interactive') {
        printContentFun()
    } */

    // wind.onload = printContentFun()
    
    if(!isIE()) {
        console.log('It is not IE')
        wind.addEventListener('DOMContentLoaded', function () {
            // console.log('wind.document.readyState: ', wind.document.readyState)
            printContentFun()
        })
        close()
        // setTimeout(close(), 1000)                // 非IE 打印结束 关闭窗口
        // wind.close()
    } else {
       /*  wind.onload = function() {
            console.log('wind.document.readyState: ', wind.document.readyState)
            if (wind.document.readyState === 'interactive') {
                printContentFun()
            }
        } */
       /*  var interval = setInterval(function(){
          console.log('wind.document.readyState: ', wind.document.readyState)
          if (wind.document.readyState != 'loading') {
              printContentFun()
              clearInterval(interval)
          }
        }, 0) */
        /**
         * setTimeout模拟setInterval
         * 当 wind.document.readyState 不再是 loading 时打印
         * 
         */
        var timeout = setTimeout(function IEprint(){
          // console.log('wind.document.readyState: ', wind.document.readyState)
          if (wind.document.readyState != 'loading') {
              printContentFun()
              clearTimeout(timeout)
          } else {
            setTimeout(IEprint, 0)
          }
        }, 0)
        
    }

    function close() {
        /* wind.onload = function() {
            wind.close()
            console.log('onload')
        } */
        wind.onbeforeprint = function() {
            console.log('onbeforeprint')
        }
        wind.onafterprint = function() {
            console.log('onafterprint')
            /* console.log('document.execCommand("print"): ', document.execCommand("print")) */
            // setTimeout(wind.close(), 3000)
            console.log('wind.document.execCommand("print"): ', execCommandPrint)
            if(execCommandPrint) {
                wind.close()
            }
            console.log('close')
        }   
    }
    
}


btn.addEventListener('click', printFun)
