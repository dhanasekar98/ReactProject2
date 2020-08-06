import React, { useEffect } from 'react'
import Styled from 'styled-components'
import {AiOutlineStar} from 'react-icons/ai'
import axios from 'axios'
import {Apikey} from '../APIkey/Apikey'


const Span=Styled.span`
display:flex;
position:absolute;
margin-top:20px;
margin-right:106px;
width:50px;
box-shadow:0 0 8px black;
opacity:75%;
height:5vh;
color:#999;
algin:center;
border-top-right-radius:50%;
border-bottom-right-radius:50%;
background:black;
`;

const H3=Styled.h3`
    color: #FFF;
    font-size: 14px;
    font-weight: 600;
    padding: 15px;
    width:130px;
    margin-top:0px;
    text-align:left;
    background: #223343;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
	flex: 1 1 100%;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: 0.4s ease-out;
    &:hover{
        box-shadow:0 0 15px #fff;
    }`;

const Image=Styled.img`
border-radius:10px;
margin-bottom:0px;
border-bottom-left-radius: 0px;
border-bottom-right-radius: 0px;
width:150px;
height:220px;
&:hover {
    box-shadow: 0 0 5px #2196f3;
    width:160px;
}
`;

const H5=Styled.h3`
font-size:10px;
color:#999;`;



const MovieDetails=(props)=> {

    const API_KEY=Apikey();

    const [Results,setResults]=React.useState([]);
 

    useEffect(()=>{
        axios.get(`
        https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${props.name}&page=1&include_adult=false`)
        .then((res)=>{   
               
            setResults(res.data.results[0]);
        }).catch((err)=>{
            console.log(err);
        })

    },[props.name])


	return (
		<div>
		     <div className="result" onClick={()=>props.handleClick(Results.id)}>
              <Span> 
                  <AiOutlineStar size="1rem" color="#999" />
                  {Results.vote_average}
                  </Span>
			 <Image src={`https://image.tmdb.org/t/p/w200${Results.poster_path}`} alt={Results.title} />
             <H3>{Results.title}<H5>Drama</H5></H3>
		   
		</div>
		</div>
	)
}

export default MovieDetails;
