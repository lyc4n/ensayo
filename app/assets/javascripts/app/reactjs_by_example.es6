var data = [
  {id: 1, "when": "2 minutes ago","who": "Jill Dupre","description": "Created new account"},
  {id: 2, "when": "1 hour ago","who": "Lose White","description": "Added fist chapter"},
  {id: 3, "when": "2 hours ago","who": "Jordan Whash","description": "Created new account"},
  {id: 4, "when": "2 hours ago","who": "Norly Canarias","description": "Created new account"}
];

App = React.createClass({
  render: function(){
    return(
      <RecentChangesTable>
        <RecentChangesTable.Headings headings={this.props.headings} />
        <RecentChangesTable.Rows changeSets={this.props.changeSets} />
      </RecentChangesTable>)
  }
});

RecentChangesTable = React.createClass({
  render: function(){
    return(
      <table className='table'>{this.props.children}</table>
    )
  }
})

RecentChangesTable.Row = React.createClass({
  render: function(){
    return(
      <tr>
        <td>{this.props.changeSet.when}</td>
        <td>{this.props.changeSet.who}</td>
        <td>{this.props.changeSet.description}</td>
      </tr>
    )
  }
})

RecentChangesTable.Heading = React.createClass({
  render: function(){
    return(
      <td>{this.props.heading}</td>
    )
  }
})

RecentChangesTable.Headings = React.createClass({
  render: function(){
    var style = {background: '#eee'}
    var headings = this.props.headings.map(function(heading){
      return(<RecentChangesTable.Heading heading={heading} />)
    })

    return(<thead style={style}><tr>{headings}</tr></thead>)
  }
})

RecentChangesTable.Rows = React.createClass({
  render: function(){
    var rows = this.props.changeSets.map(function(row){
      return(<RecentChangesTable.Row changeSet={row}/>)
    })

    return(<tbody>{rows}</tbody>)
  }
})

class ReactjsByExamplePage extends EnsayoPage{
  loaded(){
    var content = document.getElementById('content')
    var headings = ['Last Changed at', 'Author', 'Summary']
    ReactDOM.render(<App title='- Recent Changes -' headings={headings} changeSets={data}/>, content);
  }
}

page = new ReactjsByExamplePage('reactjs-by-example-page')
