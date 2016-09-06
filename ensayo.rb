require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/json'
require 'sprockets'
require 'uglifier'
require 'sass'
require 'coffee-script'
require 'sprockets/es6'
require 'execjs'
require 'pry'

class Ensayo < Sinatra::Base

  configure :development do
    register Sinatra::Reloader
    # also_reload '*', './app/views/*', './app/views/*/*'
  end

  set :views, Proc.new { File.join(root, 'app', 'views') }
  set :sprockets_env, Sprockets::Environment.new
  set :erb, :layout => :application
  set :assets, Proc.new { Sprockets::Environment.new(root) {|env|
    env.append_path File.join( root, 'app/assets/javascripts')
    env.append_path File.join(root, 'app/assets/stylesheets')
  }}

  get '/assets/*' do
    env['PATH_INFO'].sub!('/assets', '')
    settings.assets.call(env)
  end

  get '/' do
    erb :index
  end

  get '/react/react-tutorial' do
   erb :'react/react_tutorial'
  end

  get '/react/react-tutorial-comments-json' do
    json([
      {id: 1, author: 'lyc4n', text: 'That is awesome piece of cake'},
      {id: 2, author: 'anonymous', text: '*React* is love'}
    ])
  end

  get '/react/basketball-scoring' do
    erb :'react/basketball_scoring'
  end


end

