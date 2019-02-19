/**
 * Created by 89426 on 2019/1/17.
 */
~function ($) {
    let $userName=$('#userName'),
        $userPass=$('#userPass'),
        $btn=$('#submit');
//18310612838 1234567890
  let fromURL=utils.queryURLParams()['fromURL'];
    fromURL ? fromURL = decodeURIComponent(fromURL) : fromURL = 'index.html';

    $btn.on('click',function () {
        let name=$userName.val().trim(),
            pass=$userPass.val().trim();
        axios.post('/login',{
           name:name,
            password:hex_md5(pass)
        }).then(result=>{
            let {code}=result;
            code !== 0 ? alert('请检查用户名账号mua') : window.location.href=fromURL;
       });
    });
}(Zepto)