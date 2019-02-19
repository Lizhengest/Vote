/**
 * Created by 89426 on 2019/1/17.
 */
let utils=function () {
    let queryURLParams=function (url=window.location.href) {
        let obj={};
        let pos=url.indexOf('?'),
            fromURL=url.substring(pos+1),
            reg=/([^#=&?]+)=([^#=&?]+)/g;

        fromURL.replace(reg,function (...arg) {
            let [,key,value]=arg;
            obj[key]=value;
        });
        return obj;
    };
    let vote=function () {
        $voteBtn=$('.voteBtn');
        $voteBtn.on('click',function () {
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
                        if(result['code']===0)
                        {
                            alert('您已给他投过了');
                            return ;
                        }
                        return axios.get(`/vote?participantId=${curId}`);
                    })
            }).then(result=>{
                if(!result){return;}
                let {code}=result;
                code===0?alert('投票成功'):alert('投票失败');
                //window.location.href=window.location.href;
            });
        });
    };
    return {
        queryURLParams,
        vote
    };
}();