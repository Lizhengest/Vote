/**
 * Created by 89426 on 2019/1/17.
 */
~function ($) {
    let $username=$('#userName'),
        $userPhone=$('#userPhone'),
        $psw=$('#userPass'),
        $pswConfirm=$('#userPassConfirm'),
        $bio=$('#userBio'),
        $man=$('#man'),
        $woman=$('#woman'),
        $btn=$('#submit');
    $btn.on('click',function () {
        let name=$username.val(),pwd=hex_md5($psw.val()),phone=$userPhone.val(),sex=0,bio=$bio.val(),
            pwdConfirm=hex_md5($pswConfirm.val());
        sex=$man[0].checked?0:1;
        //数据校验
        //1.两次密码是否一致
        if(pwd!==pwdConfirm){
            alert('两次密码输入不一致,请重新输入');
            return;
        }
        //2.手机号是否已被注册
        axios.get('/checkPhone',{
            params:{
                phone:phone.trim()
            }
        }).then(result=>{
            if(result['code']===1){
                alert('该手机号已经被注册')
                return;
            }
            return  axios.post('/register',{
                name:name,
                password:pwd,
                phone:phone,
                sex:sex,
                bio:bio
            })

        }).then(result=>{
            if(typeof(result)==='undefined'){
                return;
            }
            else{
                result['code']===0?null:alert('注册失败');
                window.location.href=window.location.href;
            }
        });
    });


}(Zepto)
