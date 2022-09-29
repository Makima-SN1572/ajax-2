// 面向过程
//1. 获取数据

var current = 0 //记录当前第几页
var isLoading = false //记录是否正在请求，（防止多次请求）
var total = 0 //记录总数据长度
getList()

async function getList() {
    current++//初始值是0所以++成1,后面请求一次就++
    var res = await fetch(`http://localhost:3000/goods?_page=${current}&_limit=5`)
    // console.log()
    total = res.headers.get("X-Total-Count")
    var list = await res.json()
    // console.log(list)
    renderHTML(list)

    return list
}//因为声明提升,函数会先执行,所以getlist()可以放在前面

//渲染页面

function renderHTML(arr) {

    for (var i = 0; i < arr.length; i++) {
        var oli = document.createElement("li")
        oli.innerHTML = `<img src="http://localhost:3000${arr[i].poster}" alt="">
            <h3>${arr[i].title}</h3>`

        //事件绑定
        oli.onclick =function(){
            //跳转
            location.href="detail.html"
        }

        list.appendChild(oli)
    }
}


//防止数据没有后一直请求
window.onscroll = function () {
    // console.log(list.children.length,total)
    //最后一条数据拿到就return
    // ===是表示数据类型相同所以要用Number()转数值
    if(list.children.length===Number(total)){
        return 
    }


    // console.log("1111")
    var listHeight = list.offsetHeight
    var listTop = list.offsetTop

    // console.log(listHeight+listTop)

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    var windowHeight = document.documentElement.clientHeight

    // console.log()
    if (isLoading) return
    if ((listHeight + listTop) - Math.round(windowHeight + scrollTop) < 50) {
        console.log("到底了")
        isLoading = true


        //渲染下一页数据
        // setTimeout(function () {
        //     renderHTML(arr2)

            
        // }, 1000)

        //getlist也是一个promise对象,  这里再发送一次请求
        getList().then(()=>{
            isLoading = false //下一次到底事件继续触发
        })
    }
}