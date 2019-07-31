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


/**
 * 打印控制函数 printFun
 * 
 */
var printFun = function () {


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

        var printContentClone = printContent.cloneNode(true) // 克隆要打印区域节点

        wind.document.body.innerHTML = ''  // 清空 wind.document.body
        
            
        try {
            if(!isIE()) {
                console.log('It is not IE')
                wind.document.body.appendChild(printContentClone)     // 非IE 插入要打印区域克隆节点
            } else {
                wind.document.body.innerHTML = printContentClone.outerHTML  // IE 插入要打印区域克隆节点的outerHTML
            }
        } catch (e) {
            // IE错误 Automation 服务器不能创建对象 解决方法
            // 按下WIN+R，然后在运行中，输入： regsvr32 scrrun.dll 回车注册
            alert('错误: ', e.message )
            console.log('e: ', e)
        }

        wind.print()    

        if(isIE() && wind.document.readyState === 'complete') {       // IE 打印结束 关闭窗口
            wind.close()
        }
    } 

    
    if(!isIE()) {
        console.log('It is not IE')
        wind.addEventListener('DOMContentLoaded', function () {
            printContentFun()
        })
        close()                // 非IE 打印结束 关闭窗口
    } else {
        /**
         * setTimeout模拟setInterval
         * 当 wind.document.readyState 不再是 loading 时打印
         * 
         */
        var timeout = setTimeout(function IEprint(){
          if (wind.document.readyState != 'loading') {
              printContentFun()
              clearTimeout(timeout)
          } else {
            setTimeout(IEprint, 0)
          }
        }, 0)
        
    }

    function close() {
        console.log('close')
        wind.onload = function() {
          wind.close()
        }
    }
    
  
}


btn.addEventListener('click', printFun)
