import React from 'react'
import MovieDetails from '../MovieDetails/MovieDetails'
import Styled from 'styled-components'
import {Apikey} from '../APIkey/Apikey'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { GoTriangleRight } from 'react-icons/go'

import Image5 from '../assets/closee.png'

const Selection=Styled.section`
padding: 15px;
display: flex;
flex-wrap: wrap;
margin: 0px -15px;
margin-top:-200px;
align-items:center;
transition:0.7s`;
const Div2=Styled.div`
height: 100%;
width: 0;
position: absolute;
z-index: 2;
margin-right: 0px;
top: 0;
margin-top:100px;
right: 0;
background-color: #000;
border-top-left-radius:10px;
opacity: 0.9;
overflow-x: hidden;
padding-top: 60px;
transition: 0.7s;
align-items:left;`;

const Div5=Styled.div`
margin:0px;
box-shawdow:0 0 15px blue;
postion:absolute;
width:100%;
height:35%
`;

const Para=Styled.p`
font-family: "Trebuchet MS", Helvetica, sans-serif;
text-transform: capitalize;
font-weight:none;
color:#998;
text-align:left;
margin-top:10px;`;
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


const Div7=Styled.div`
margin:20px;`;

const Hi1=Styled.h1`
text-align:left;`;

const Hi2=Styled.h3`
text-align:left;
color:#999;
font-family: "Trebuchet MS", Helvetica, sans-serif;
font-weight:none;`;

const H4=Styled.h4`
position: absolute;
font-family: "Trebuchet MS", Helvetica, sans-serif;
font-weight:none;
top:49.5%;
left:21%;
color:#999;`

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
const Div4=Styled.div`
margin-bottom:10px;
box-shawdow:0 0 15px blue;
width:100%;
height:35%;`;
const API_KEY=Apikey();


function Movies () {

    const[MovieDetail,SetMovieDetails]=React.useState([]);
    const[correct,setCorrect]=React.useState(true);
    const[key,setKey]=React.useState('');
    
    const Movie=[{
        id:1,
        name:'Big Hero 6',
    },
    {
        id:2,
        name:'Ant-Man',
    },{
        id:3,
        name:'Iron Man',
    },{
        id:4,
        name:'Spider-Man 3',
    },{
        id:5,
        name:'Mersal',
    },{
        id:6,
        name:'Iron Man 3',
    }]
    
    function openSlide(){
        document.getElementById('menus').style.width = '40%';
        document.getElementById('container').style.marginRight='30%';
        document.getElementById('menu').style.width='0px';
    }
    function CloseSlide(){
        document.getElementById('menus').style.width = '0px';	
        document.getElementById('container').style.marginRight='0%';
        setKey('');
    }

    function PlayerEnable(){
        axios.get(`https://api.themoviedb.org/3/movie/${MovieDetail.id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((res)=>{
            console.log(res.data.results[0].key)
            setKey(res.data.results[0].key);
        }).catch((err)=>{
            console.log(err);
        })

        setCorrect(false);
        
    }

    
  const handleClick = id => {
   

    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then((res)=>{
        console.log(res.data);
        SetMovieDetails(res.data);
        
    }).catch((err)=>{
        console.log(err);
    }) 
    
    setCorrect(true);
    openSlide();
  }
	return (
        <div>
        <Div2 id="menus">
         
             { correct ?(
               <Div5>
              <Image3 src={`https://image.tmdb.org/t/p/w200${MovieDetail.poster_path}`} alt={MovieDetail.title}/>
              <Div6 className="md-cancel-div" onClick={CloseSlide}>
              <img src={Image5} className="md-cancel" width="20px" height="20px" />
              </Div6>
              <GoTriangleRight   onClick={PlayerEnable} size="7rem" className="Play"/> 
              </Div5>):false}

              {correct?false:( <Div4>
                  <ReactPlayer playing="true" controls="true" url={`https://www.youtube.com/watch?v=${key}`} width="100%" height="100%"/>
                  <Div6 className="md-cancel-div" onClick={CloseSlide}>
                    <img src={Image5} className="md-cancel" width="20px" height="20px" />
                 </Div6>
                  </Div4>
              )}
             <Div7>
              <Hi1>{MovieDetail.original_title}</Hi1>
              <Hi2>Rating:{MovieDetail.vote_average} .Drama.{MovieDetail.runtime} mins</Hi2>
              <Para>{MovieDetail.overview}</Para>
              </Div7>
              
        </Div2>
		<Selection className="results" id="container">
			{Movie.map((result,index) => (
				<MovieDetails key={index} name={result.name} title={result.title} handleClick={handleClick}/>
			))}
		</Selection>
        </div>
	)
}

export default Movies;
