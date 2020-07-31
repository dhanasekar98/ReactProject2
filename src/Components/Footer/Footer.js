import React from 'react'
import Styled  from 'styled-components'
import Movies from '../Movies/Movies' 

const Div1=Styled.div`
display:flex;
text-align:center;
background:#223243;
color:white;
 height:150vh;
 width:100%;
`;

const Footer=()=>{
    return(
        <Div1 >
        <Movies/> 
        </Div1>
    )
}
export default Footer;