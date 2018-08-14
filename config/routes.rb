Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :fetched_quotes
  resources :quotes

  namespace :api do
    namespace :v1 do
      resources :fetched_quotes
      resources :quotes
    end
  end


end
