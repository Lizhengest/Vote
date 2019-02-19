//单例模式
let matchRender=(function () {

    let limit=10,
        page=1,
        search=``,
        $userList=$('.userList'),
        $tip=$('.tip'),
        $wrapper=$userList.find('ul'),
        $header=$('.headerBox'),
        $input=$header.find('input'),
        $searchBth=$('.searchBtn'),
        isRun=false,
        pageNumQ=0,
        $voteBtn=null;
    //获取投他一票按钮


    let queryData=function () {
        //用axios拿数据
        //配置一些default数据
        axios.get(`/getMatchList?limit=${limit}&page=${page}&search=${search}`).then(bindData).then(function () {
            vote()
        });
    };
    let bindData=function (result) {
        let {code,list=[],pageNum,total}=result,
            $frg=$(document.createDocumentFragment());
        pageNumQ=pageNum;
        if(parseFloat(code)===1)
        {//获取数据失败
            $wrapper.css('display','none');
            $tip.css({display:'block'});
            return;
        }
        else{
            $wrapper.css('display','block');
            $tip.css({display:'none'});
        }
        list.forEach(function (item) {
            let {
                id,name,sex,matchId,slogan,voteNum,isVote,picture
            }=item;
            let str=``;
            $frg.append(` <li>
                <a href="detail.html?userId=${id}">
                    <img src=${picture} alt="${name}" class="picture">
                    <p class="title">
                        <span>${name}</span>
                        |
                        <span>编号 ${matchId}</span>
                    </p>
                    <p class="slogan">${slogan}</p>
                </a>
                <div class="vote">
                    <span class="voteNum">${voteNum}</span>
                    <a href="javascript:;" class="voteBtn">投他一票</a>
                </div>
            </li>`);
        });
        $wrapper.append($frg);
        $frg=null;
        isRun=false;
    };
    let vote=function () {
        console.log('绑上了');
        $voteBtn=$('.voteBtn');
        $voteBtn.forEach(item=>{
            item.onclick=function () {
                let curId=utils.queryURLParams($(this).parent().prev()[0].href)['userId'];
                axios.get('/checkLogin').then(result=>{
                    if(result['code']===0){
                        alert('未登录');
                        return;
                    }
                    return  axios.get('/getUser');
                }).then(result=>{
                    if(!result){return;}
                    let {data:{id}}=result;
                    return axios.get(`/checkUser?checkId=${curId}`)
                        .then(result=>
                        {
                            if(!result){return;}
                            if(result['code']===0)
                            {
                                alert('您已给他投过了');
                                return;
                            }
                            return axios.get(`/vote?participantId=${curId}`);
                        })
                }).then(result=>{
                    if(!result){return;}
                    let {code}=result;
                    code===0?alert('投票成功'):alert('投票失败');
                    window.location.href=window.location.href;
                });
            };
        });
    };
    let fnScroll=function () {
        let {
            scrollHeight,
            scrollTop,
            clientHeight
        }=document.documentElement;
        if(scrollTop+clientHeight+100>scrollHeight){
            if(isRun){
                return;
            }
            isRun=true;
            //就加载更多数据
            if(page<pageNumQ) {
                page++;
                queryData();
            }
        }
    };
   return {
       init:function () {
           if(isRun){return;}
           isRun=true;
        queryData();
        window.addEventListener('scroll',fnScroll);
        $searchBth.on('click',function () {
            search=$input[0].value;
            page=1;
            //先清空原有的
            $wrapper.html('');
            queryData();
        });
       }
   };
})();

matchRender.init();
