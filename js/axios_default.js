if (typeof(axios) !== 'undefined') {
    //1.baseURL
    axios.defaults.baseURL = 'http://localhost:8000';
    //2.tansformRequest(变成urlencoded格式)
    axios.defaults.transformRequest = function (data) {
        let str = ``;
        if(typeof(data)==='object' && data){
            for(let key in data)
            {
                if(data.hasOwnProperty(key))
                {
                str+=`${key}=${data[key]}&`;
                }
            }
            return str.substring(0,str.length-1);
        }
    };
    //3.请求头Headers的【‘Content-Type’】=‘x-www-form-urlencoded’
    axios.defaults.headers['Content-Type']='x-www-form-urlencoded';
    //4.response拦截器（直接得到响应主体）
    axios.interceptors.response.use(function (result) {
        return result.data;
    });
    axios.defaults.withCredentials=true;
}