// src/WikiPage.js
import "./WikiPage.css";
import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";

function WikiPage() {
    const {searchQuery} = useParams();
    const [data,setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/players/${searchQuery}`);
                if (response.ok) {
                    const myData = await response.json();
                    setData(myData);
                } else {
                    const errorMessage = await response.json()
                    setError(errorMessage.message);
                }
            } catch (error) {
                setError("데이터를 가져오는 중 오류가 발생했습니다.")
            }
        };
        fetchData();
    },[searchQuery])

    return(
        <div className="container">
            <h1>{searchQuery}</h1>
            <div className="article-container">
                {error ? (
                    <p>{error}</p>
                ) : data ? (
                    <div>
                        <p>{data.이름}</p>
                        <p>포지션: {data.포지션}</p>
                        <p>입단 년도 : {data.입단년도}</p>
                        <p>소속팀 : {data.소속팀}</p>
                        <p>플레이스타일 : {data.플레이스타일}</p>
                        <p>주발 : {data.주발}</p>
                        <p>등번호 : {data.등번호}</p>
                    </div>
                    
                ) : (
                    <p>데이터를 로드 중입니다.</p>
                )}
            </div>
        </div>
    )
}
export default WikiPage;