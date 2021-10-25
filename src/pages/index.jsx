
import React, { useEffect,useState,useRef} from 'react';
import {request} from '@/request'
import  './style.css';
const  Result=()=>{
    const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(true);//控制加载更多文案
    const [content, setContent] = useState([]);
    //长列表滚动监听
    const divRef = useRef();
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    });
    
    const throttle=(func, wait)=>{
        let timeout;
        return function() {
            let context = this;
            let args = arguments;
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }
    }
    const handleScroll=throttle(()=>{
        //触底了
        if (!check(divRef.current)) {
            // setLoading(true)
            setPage(page+1)
            }
    },1000);
    const check = (node) => {
        if (node) {
        const { top, bottom } = node.getBoundingClientRect();
        return bottom> window.innerHeight
        }
        return false;
    }
    //接口请求
    useEffect(() => {
        request(page,20).then((res)=>{
            setContent((pre=[])=>{
                return [...pre,...res.data.data.rows]
            });  
            // setLoading(false)  
        }).catch(function(ex) {
            console.err('erro:', ex)
        });
    },[page])
    
    const render=()=>{
        return(
        <div ref={divRef} className="container">
            { content.map((arr)=>{
                    return(
                    <div className="post" key={arr.gmtCreate}>
                    <h3 className="title">{arr.title}</h3> 
                    <p className="summary">{arr.summary}</p>
                    </div>
                    )
                })
            } 
        </div>
        )
    }
    
    return (
    <>
    {render()}
    { content.length?<div style={{color:'red'}}><span>加载更多。。。</span></div> :null }
    </>
    )
}
export default Result;