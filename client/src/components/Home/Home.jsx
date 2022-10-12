import React from 'react'
import GameCards from '../GameCards/GameCards.jsx'
import Nav from '../Nav/Nav.jsx'
import ChatBotRender from '../ChatBot/ChatBotRender.jsx'


export default function Home() {

  return (
    <>
    <div> <Nav/> </div>
    <div> <GameCards/> </div>
    <div>  <ChatBotRender/> </div>
    </>
  )
}
