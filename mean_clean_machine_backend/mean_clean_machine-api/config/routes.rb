Rails.application.routes.draw do
  resources :orders, except: [:index]
  get '/customers/:id/orders', to: 'orders#index'
  resources :customers
  resources :items
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
