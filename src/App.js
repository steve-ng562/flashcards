import React, { Component } from 'react';
import Card from './Card/Card.js';
import Button from './Button/Button.js'
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      card: [],
      currentCard: {
      }
    }
  }

componentDidMount(){
  var cardList = this.state.card;
axios.get('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=10&api_key=96422f03867639ffb71b957c32f0876e8f997deebba333342')
.then(res => {
        cardList = res.data;
 

this.setState({ 
          card: cardList,
          currentCard: this.getRandomCard(cardList)
         });


      })

 
}


  getRandomCard(currentCards){
    var card = currentCards[Math.floor(Math.random() * currentCards.length)];
  axios.get('http://api.wordnik.com/v4/word.json/'+ card.word + '/definitions?limit=1&includeRelated=false&api_key=96422f03867639ffb71b957c32f0876e8f997deebba333342')
  .then(res => {
   card.definition = res.data[0].text;
   this.setState({
    currentCard: card
  })
    })
  if(card === this.state.currentCard){
    this.getRandomCard(currentCards);
  }


  return card;
  }

   updateCard = () => {
   this.getRandomCard(this.state.card);
  }

  render() {
    console.log(this.state.currentCard.definition);
    return (
      <div className="App">
      <h1>Random Flashcards Application</h1>
      <p>Utilizes HTML,CSS,Javascript,React.js,Axios,Webnik API...</p>
      <p>Generates random words along with definition and allows you to practice your memorization skills.</p>
      <div className="cardRow">
      <Card
      def={this.state.currentCard.definition}
      word={this.state.currentCard.word}></Card>
      </div>

      <div className="buttonRow">
      <Button drawCard={this.updateCard}/>
      </div>

      </div>
    );

  }
}

export default App;
