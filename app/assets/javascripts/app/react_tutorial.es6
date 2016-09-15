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
  handleCommentSubmit: function(comment){
    var comments = this.state.data
    comment.id = Date.now()
    var newComments = comments.concat([comment])
    this.setState({data: newComments})
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data){
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },

  // This is called after the component is loaded for the first time
  componentDidMount: function(){
    this.loadCommentsFromServer()
    setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  },
  render: function(){
    return(
      <div className='commentBox'>
        <p className='title'>Comments:</p>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
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
  },
  handleAuthorChange: function(e){
    this.setState({author: e.target.value})
  },
  handleTextChange: function(e){
    this.setState({text: e.target.value})
  },
  handleSubmit: function(e){
    e.preventDefault()
    var author = this.state.author.trim();
    var text   = this.state.text.trim();
    if(!text || !author){
      return;
    }

    this.props.onCommentSubmit({author: author, text: text})
    this.setState({author: '', text: ''})
  },
  render: function(){
    return(
      <div className='commentFormWrapper'>
        <p className='title'>Add Comment:</p>
        <form className='commentForm' onSubmit={this.handleSubmit}>
          <p className='control'>
            <input
              type='text'
              placeholder='Your name'
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
          </p>

          <textarea
            placeholder='Say something'
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <div className='columns is-mobile'>
            <div className='column is-2 is-offset-10'>
              <p className='control'>
                <input type='submit' className='button' value='Post'/>
              </p>
            </div>
          </div>
        </form>
      </div>
    )
  }
})

class ReactTutorialPage extends EnsayoPage{
  loaded(){
    content = document.getElementById('content')

    ReactDOM.render(<CommentBox url='/comments-api' pollInterval='2000' />, content);
  }
}
reactTutorialPage = new ReactTutorialPage('react-tutorial-page')
