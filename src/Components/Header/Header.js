import React from 'react'
import Styled from 'styled-components'
import Image from '../assets/download.jpg'
import {Apikey } from '../APIkey/Apikey'
import axios from 'axios'
import Image5 from '../assets/closee.png'
import {GoTriangleRight} from 'react-icons/go'
import ReactPlayer from 'react-player'


const Div1=Styled.div`
display:flex;
align-items:center;
background:black;
margin:0px;
color:white;
 height:13vh;
 width:100%;
 border-radius:25px;
 border-bottom-left-radius: 0;
 border-bottom-right-radius: 0;`

const H1=Styled.h1`
align-content: center;
    font-size: x-large;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    margin-left:10%;`;
const Input=Styled.input`
algin-content:center;
height:8vh;
width:50vh;
margin-left:40vh;
border-radius:10px;
background:#222;
border:0px;
outline:none;
font-size:4vh;
color:#fff;
`;

const Div5=Styled.div`
margin:0px;
box-shawdow:0 0 15px blue;
postion:absolute;
width:100%;
height:35%;

.Play{
    position: absolute;
    left:40%;
    top:10%;
    color:white;
    opacity: 50%;
    cursor: pointer;
  }
  .Play:hover{
    color:black;
    opacity: 100%;
  }
  
`;

const Div2=Styled.div`
height: 100%;
width: 0;
position: absolute;
z-index: 1;
margin-right: 0px;
top: 0;
margin-top:100px;
right: 0;
border-top-left-radius:10px;
background-color: #000;
opacity: 0.9;
overflow-x: hidden;
padding-top: 60px;
transition: 0.7s;
align-items:left;`

const Div4=Styled.div`
margin-bottom:10px;
box-shawdow:0 0 15px blue;
width:98%;
height:40%;`;

const Image3=Styled.img`
position:absolute;
top:0;
right:0;
left:0;
padding:0;
box-shawdow:0 0 15px blue;
width:100%;
height:40%;
`;

const Image1=Styled.img`
display:flex;
width:50px;
height:50px;
border-radius:50%;
margin-left:60vh;
box-shadow:0 0 25px;`
;
const Div3=Styled.div`
position:absolute;
top:70px;
left:470px;
right:0px;
background:black;
text-align:left;
width:50vh;
border-bottom-left-radius:10px;
border-bottom-right-radius:10px;  
color:white;

ul ol{
    padding-bottom:0px;
    border:1px solid #223343;
    border-bottom:0px;
    border-radius:10px;
}
ol{
    width:auto;
    height:auto;
}
ol:hover{
    background:white;
    color:black;
    outline:none;
}
ul ol h3{
    position:absolute;
    text-align:center;
    margin-left:120px;  
}

`
const Image2=Styled.img`

width:100px;
height:100px;
margin:3px;`;



const Div7=Styled.div`
margin:20px;`;

const Para=Styled.p`
font-family: "Trebuchet MS", Helvetica, sans-serif;
text-transform: capitalize;
font-weight:none;
color:#998;
text-align:left;
margin-top:10px;`;



const Hi1=Styled.h1`
text-align:left;`;

const Hi2=Styled.h3`
text-align:left;
color:#999;
font-size:small;
font-family: "Trebuchet MS", Helvetica, sans-serif;
font-weight:none;`;

const Div6=Styled.div`
width: 75px;
height:75px;
background-color: white;
opacity: 90%;
align-items: center;
border-bottom-left-radius: 75%;
top:0;
right:0;
position: absolute;`;

const I=Styled.i`
font-size:small`;


const Header=()=>{
    const API_KEY=Apikey();
    const[query,setQuery]=React.useState('');
    const[Results,setResults]=React.useState([]);
    const[MovieDetails,SetMovieDetails]=React.useState([]);
    const [correct,setCorrect]=React.useState(true);
    const[key,setKey]=React.useState('');
    
    function CloseSlide(){
        document.getElementById('menu').style.width = '0px';	
        document.getElementById('container').style.marginRight='0%';
        setKey('');
        setCorrect(true);
	}
    function openSlide(){
        document.getElementById('menu').style.width = '40%';
        document.getElementById('container').style.marginRight='30%';
        document.getElementById('menus').style.width='0px';
    }
    function PlayerEnable(){
        setKey('');
        axios.get(`https://api.themoviedb.org/3/movie/${MovieDetails.id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((res)=>{
            console.log(res.data.results[0].key)
            setKey(res.data.results[0].key);
        }).catch((err)=>{
            console.log(err);
        })

        setCorrect(false);
        
    }

    function handleClick(id,name){


        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
        .then((res)=>{
            console.log(res.data);
            SetMovieDetails(res.data);
            
        }).catch((err)=>{
            console.log(err);
        }) 
        setResults([]);
        setQuery(name);
        
        setCorrect(true);
        openSlide();
       }
    function handleChange(e){
     
        e.preventDefault();
        setQuery(e.target.value);
        axios.get(`
        https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
        .then((res)=>{   
            console.log(res.data);   
            setResults(res.data.results);
        }).catch((err)=>{
            console.log(err);
        })
        if(!query)
        {
            setResults([]);
        }
    }
    return(
        <div>
        <Div1>
        <Div2 id="menu">

              { correct ?(
               <Div5>
              <Image3 src={`https://image.tmdb.org/t/p/w500${MovieDetails.poster_path}`} alt={MovieDetails.title}/>
              <Div6 className="md-cancel-div" onClick={CloseSlide}>
              <img src={Image5} className="md-cancel2" width="20px" height="20px" />
              </Div6>
              <GoTriangleRight   onClick={PlayerEnable} size="7rem" className="Play"/> 
              </Div5>):false}

              {correct?false:( <Div4>
                  <ReactPlayer playing="true" controls="true" url={`https://www.youtube.com/watch?v=${key}`} width="100%" height="100%"/>
                  <Div6 className="md-cancel-div" onClick={CloseSlide}>
              <img src={Image5} className="md-cancel2" width="20px" height="20px" />
              </Div6>
                  </Div4>
              )}

            <Div7>
              <Hi1>{MovieDetails.original_title}</Hi1>
              <Hi2>Rating:{MovieDetails.vote_average}<I>.Drama.{MovieDetails.runtime} mins</I></Hi2>
              <Para>{MovieDetails.overview}</Para>
              </Div7>
              
              
        </Div2>
           <H1>Halido</H1>
           <Input type="text"
            name="search"
            placeholder="search.."
            value={query}
            onChange={handleChange}
            />
             <Div3>
      { Results.length>0 &&(
                    <ul>{
                        Results.slice(0,5).map((movie)=>(
                            <ol onClick={()=>handleClick(movie.id,movie.title)}  >
                            <h3>{movie.title}</h3> 
                            {movie.poster_path?(<Image2 classname="image3" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title}Poster`}/>):
                            false}
                            </ol>
                        )
                        )}</ul>
                    )}
    </Div3>
           <Image1 src={Image} alt=""/>
    </Div1> 
   
    
    </div>
    )
}
export default Header;