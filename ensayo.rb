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
require 'sinatra/activerecord'
Dir['./app/models/*.rb'].each{|file| require file}

class Ensayo < Sinatra::Base

  configure :development do
    register Sinatra::Reloader
  end

  register Sinatra::ActiveRecordExtension

  set :database, {adapter: "sqlite3", database: "ensayo.sqlite3"}
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

  get '/comments-api' do
    Comment.all.to_json
  end

  post '/comments-api' do
    comment = Comment.create(author: params[:author], text: params[:text])
    comment.to_json
  end

  get '/react/basketball-scoring' do
    erb :'react/basketball_scoring'
  end
end

