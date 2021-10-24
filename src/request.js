import axios from "axios";

export function request (pageNum=1,pageSize=20,postType=""){
    if(pageNum===1) postType="all"
    return axios({
        method: 'post',
        url: '/platform/service.do',
        params:{
        // ctoken: token,
        _input_charset: 'utf-8' },
        data: {
            serviceName: 'alipay.open.developerops.forum.post.pageQuery',
            data: JSON.stringify([{"postType":postType,"pageNum":pageNum,"pageSize":pageSize,"postTypes":["article","question","topic"]}])
        },
        transformRequest: [
        function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            ret = ret.substring(0, ret.lastIndexOf('&'));
            return ret
        }
        ],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }) 
}
// document.cookie="ALIPAYJSESSIONID=RZ42MvcEZ5mdxjVjaXUd1G03YiXyTBauthRZ54GZ00";
// let token="MW5WKFxNeIGe2yUF"
// fetch('/api/info',).then(res=>res.json).then(data => {
//     console.log(data)
// });