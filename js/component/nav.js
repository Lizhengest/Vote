/**
 * Created by 89426 on 2019/1/17.
 */

//检测是否登录
(function ($) {
    let $mainBox=$('.mainBox');
    axios.get('/checkLogin').then(result=>{
        let code = parseFloat(result.code);
        //要么是首页 登录 注册 要么是 首页 a【detail】 退出
        $mainBox.prepend(`<nav class="navBox">
            <a href="index.html">首页</a>
            
            ${code === 0 ?
            `<a href="javascript:;">登录</a><a href="javascript:;">注册</a>`
            :
            `<a href="detail.html"></a><a href="javascript:;">退出</a>`}
            
        </nav>`);
        return code;//promise中如果不return，那么return的是undefined
    }).then(code=>{
        if(code===0){//未登录就页 登录 注册
            return;
        }
        //已登录就找登录的用户名，并显示
        return axios.get('/getUser');
    }).then(result=> {
        let $navBox = $mainBox.find('.navBox'),
            $navList = $navBox.find('a'),
            logName='1';



        if( typeof(result)!=='undefined'){//说明登录了
            let  {data:{id}}=result;
            logName=result.data['name'];
            $navList.eq(1).html(logName);//给a标签返回用户名
            //?userId=${id}
            $navList[1].href=`detail.html?userId=${id}`;//原生对象href属性。并重置他的链接
            
        }

      //基于事件委托绑定点击事件（  window.location.href跳转到哪个连接，=  window.location.href就是刷新）window.location 对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。
        $navBox.on('click',function (ev) {
            let target=ev.target;
            let evTag=target.tagName,
                evInn=target.innerHTML;
            if(evTag==='A' && evInn==='登录') {
                window.location.href = `login.html?fromURL=${encodeURIComponent(window.location.href)}`;//用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。
            }
            else if(evTag==='A' && evInn==='注册'){
                     window.location.href=`register.html?fromURL=${encodeURIComponent(window.location.href)}`;
                }
            else if(evTag==='A' && evInn==='退出')
            {
                axios.get('/exitLogin');
                window.location.href = window.location.href;//=>页面刷新
                return;
            }

            
        });
    });

})(Zepto);


//如果已经登录，就显示登录用户的名字
//如果没登录，就展示登录按钮。