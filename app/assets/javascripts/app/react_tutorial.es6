var CommentBox = React.createClass({
  getInitialState: function(){
    return {data: []}
  },
  loadCommentsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },
  componentDidMount: function(){
    this.loadCommentsFromServer()
    setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  },
  render: function(){
    return(
      <div className='commentBox'>
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    )
  }
})

var CommentList = React.createClass({
  render: function(){
    commentNodes = this.props.data.map(function(comment){
        return(
          <Comment author={comment.author} key={comment.id}>
            {comment.text}
          </Comment>
        )
    })

    return(
      <div className='commentList'>
        {commentNodes}
      </div>
    )
  }
})

var CommentForm = React.createClass({
  render: function(){
    return(
      <div className='commentForm'>
      Hello World, I am a CommentForm
      </div>
    )
  }
})

var Comment = React.createClass({
  rawMarkup: function(){
    var md = new Remarkable()
    var rawMarkup = md.render(this.props.children.toString())
    return({__html: rawMarkup})
  },
  render: function(){
    return(
      <div className='comment'>
        <h2 className='commentAuthor'>{this.props.author}</h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    )
  }
})

var CommentForm = React.createClass({
  getInitialState: function(){
  return({author: '', text: ''})
  }

  render: function(){
    return(
      <form className='commentForm'>
        <input type='text' placeholder='Your name'>
        <input type='text' placeholder='Say something'>
        <input type='submit' value='Post'>
      </form>
    )
  }
})

class ReactTutorialPage extends EnsayoPage{
  loaded(){
    content = document.getElementById('content')

    // data = [
    //   {id: 1, author: 'lyc4n', text: 'That is awesome piece of cake'},
    //   {id: 2, author: 'anonymous', text: '*React* is love'}]
    //
    // ReactDOM.render(<CommentBox data={data}/>, content);
    ReactDOM.render(<CommentBox url='/react/react-tutorial-comments-json' pollInterval='2000' />, content);
  }
}
reactTutorialPage = new ReactTutorialPage('react-tutorial-page')
