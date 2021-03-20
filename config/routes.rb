Rails.application.routes.draw do
  root to: 'react#index'
  namespace :api, defaults: { format: 'json' } do
    scope module: :v1 do
      resources :users, only: [:index, :new, :create]
      resources :games, only: :index
      resources :hangmen, only: [:new, :update]
      resources :masterminds, only: [:new, :update]
      resources :memorycards, only: [:new, :update]
      resources :tictactoes, only: [:new, :update]
    end
  end
  get '/:name', to: redirect{ |params, request| "/?#{params[:name]}"}
end