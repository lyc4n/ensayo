class BasketBallScoringPage extends EnsayoPage{
  loaded(){
    ReactDOM.render(
      <GameBox/>,
      document.getElementById('basketball-scoring-content')
    )
  }
}

const ConstHomeTeamId = 1;
const ConstAwayTeamId = 0;

var GameBox = React.createClass({
  componentDidMount: function(){
    $(document).on('keydown', (function(e){
      key = e.which
      console.log(key)
      if(key === 37){ // left arrow key
        this.setPossession(ConstHomeTeamId)
      }
      else if(key === 39){// right arrow key
        this.setPossession(ConstAwayTeamId)
      }
      else if(key === 38){// up key
        this.incrementScore()
      }
      else if(key === 40){// down key
        this.decrementScore()
      }
      else if((index = ([49, 50, 51]).indexOf(key)) > -1){
        this.setState({scoreMovement: index + 1})
      }
    }).bind(this))
  },
  getInitialState: function(){
    return {
      homeTeamName: '',
      awayTeamName: '',
      homeTeamScore: 0,
      awayTeamScore: 0,
      qtr: 1,
      minutesPerQtr: 10,
      minutesQtrBreak: 1,
      posession: null,
      scoreMovement: 2
    }
  },
  incrementScore: function(){
    increment = this.state.scoreMovement
    if(this.state.possession == ConstHomeTeamId){
      oldScore = this.state.homeTeamScore
      this.setState({homeTeamScore: oldScore + increment, possession: ConstAwayTeamId })
    }
    else if(this.state.possession == ConstAwayTeamId){
      oldScore = this.state.awayTeamScore
      this.setState({awayTeamScore: oldScore + increment, possession: ConstHomeTeamId  })
    }
  },
  decrementScore: function(){
    decrement = this.state.scoreMovement
    if(this.state.possession == ConstHomeTeamId){
      newScore = this.state.homeTeamScore - decrement
      newScore = newScore > 0 ? newScore : 0
      this.setState({homeTeamScore: newScore })
    }
    else if(this.state.possession == ConstAwayTeamId){
      newScore = this.state.awayTeamScore - decrement
      newScore = newScore > 0 ? newScore : 0
      this.setState({awayTeamScore: newScore})
    }
  },
  setPossession: function(teamId){
    this.setState({possession: teamId})
  },
  togglePossession: function(){
    if(this.state.possession === ConstAwayTeamId){
      this.setState({posession: this.props.homeTeamId})
      console.log('toggling A')
    }
    else if(this.state.possession === ConstHomeTeamId){
      this.setState({posession: this.props.awayTeamId})
      console.log('toggling B')
    }
    else{
      console.log('nothing')
      // do nothing
    }
  },
  updateSetup: function(e){
    e.preventDefault()
    var $form = $(e.currentTarget)
    homeTeamName = $form.find('.home-team-name-field').val()
    awayTeamName = $form.find('.away-team-name-field').val()
    this.setState({homeTeamName: homeTeamName, awayTeamName: awayTeamName})
    console.log(this.state)
  },
  render: function(){
    var props = this.state
    return(
      <div className='game-box'>
        <GameSetup {...props} updateSetup={this.updateSetup} />
        <GameDisplay {...props} />
      </div>
    )
  }
})

var GameSetup = React.createClass({
  render: function(){
    return(
      <div className='game-setup'>
        <form onSubmit={this.props.updateSetup}>
          <b className='title'>Game Setup</b>
          <p>Home team:</p>
          <input type='text' placeholder='Home' className='home-team-name-field'/>
          <p>Away team:</p>
          <input type='text' placeholder='Away' className='away-team-name-field'/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    )
  }
})

var GameDisplay = React.createClass({
  render: function(){
    console.log(this.props.possession)
    return(
      <div className='game-display'>
        <b className='title'>Scores:</b>
        <div className='main-content'>
          <TeamScore
            teamName={this.props.homeTeamName}
            teamScore={this.props.homeTeamScore}
            className='home-team-score'
            hasPossession={this.props.possession === ConstHomeTeamId}
          />
          <TeamScore
            teamName={this.props.awayTeamName}
            teamScore={this.props.awayTeamScore}
            className='away-team-score'
            hasPossession={this.props.possession === ConstAwayTeamId}
          />
        </div>
      </div>
    )
  }
})

var TeamScore = React.createClass({
  render: function(){
    return(
      <div className='team-score'>
        {this.props.hasPossession ? <span className='possession-marker'></span> : '' }
        <div className='score'>{this.props.teamScore}</div>
        <div className='team-name'>{this.props.teamName}</div>
      </div>
    )
  }
})

var page = new BasketBallScoringPage('basketball-scoring-page')
