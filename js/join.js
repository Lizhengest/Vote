/**
 * Created by 89426 on 2019/1/18.
 */
~function ($) {
    let fromURL=utils.queryURLParams()['fromURL'];
    fromURL ? fromURL = decodeURIComponent(fromURL) : fromURL = 'index.html';
    let $slogan=$('#slogan'),
        $btn=$('.submit');
    let str=$slogan.val();
    $btn.on('click',function () {
        axios.get('checkLogin').then(result=>{
            if(result['code']===0){
                alert('请先登录');
                return;
            }
            else{

                return axios.get(`/getUser`);
            }
        }).then(result=>{
            if(typeof(result)==='undefined'){
                //没登录
                return;
            }
            let {data:{isMatch}}=result;
            
            if(isMatch===1){alert('已经参赛了');return;}
            return axios.post('/match',{
                slogan:str
            });
        }).then(result=>{
            if(typeof(result)==='undefined'){
                //已参赛
                return;
            }
            else{
                result['code']!==0?alert('参与失败'):alert('success');
            }

        });

    });

}(Zepto)