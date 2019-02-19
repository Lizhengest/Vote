/**
 * Created by 89426 on 2019/1/18.
 */

 ~function ($) {
    //拿到userid
    let obj=utils.queryURLParams();
    let $voteMy=$('#voteMy'),
        $myVote=$('#myVote');
    $voteMy[0].style.display='block';
    $myVote[0].style.display='block';
    let $headerBox=$('.headerBox');
    let isRUN=false;
    axios.get(`/getUser?userId=${obj['userId']}`).then(result=>{
        let {
            code,
            data:{
                name,
                picture,
                sex,
                phone,
                bio,
                time,
                isMatch,
                matchId,
                slogan,
                voteNum
            }
        }=result;
        if(code===1){
            return;
        }
        $headerBox.append($(`<div class="userInfo">
            <img src="img/${sex==0?'man':'woman'}.png" alt="" class="picture">
            <p class="info">
                <span>${name}</span>
                |
                <span>编号 ${matchId}</span>
            </p>
            <p class="bio">${bio}</p>
            <div class="vote">${voteNum}</div>
        </div>
        <div class="slogan">${slogan}</div>
        <a href="javascript:;" class="voteBtn">投他一票</a>`))
        return axios.get('/getVoteMy');
    }).then(result=>{
        let $list=$('#voteMy').find('.list');
        let {code,total,list}=result;
        if(code===1){return;}

        list.forEach(item=>{
            let {
                id,
                name,
                picture,
                slogan,
                voteNum,
                }=item;
            let str=` <li>
                <a href="detail.html?userId=${id}">
                    <img src="${picture}" alt="" class="picture">
                    <p class="title">${name}</p>
                    <p class="bio">${slogan}</p>
                </a>
                <div class="vote">
                    <span class="voteNum">${voteNum}</span>
                    <a href="javascript:;" class="voteBtn">投他一票</a>
                </div>
            </li>`;
            $list.append($(str));

        });
        utils.vote()
       return axios.get('/getMyVote')
    }).then(result=>{
        let $list=$('#myVote').find('.list');
        let {list}=result;
        list.forEach(item=>{
            let {id,name,picture,slogan,voteNum}=item;
            let str=` <li>
                <a href="detail.html?userId=${id}">
                    <img src="${picture}" alt="" class="picture">
                    <p class="title">${name}</p>
                    <p class="bio">${slogan}</p>
                </a>
                <div class="vote">
                    <span class="voteNum">${voteNum}</span>
                </div>
            </li>`;
            $list.append($(str));
        });

    });
    
 }(Zepto);