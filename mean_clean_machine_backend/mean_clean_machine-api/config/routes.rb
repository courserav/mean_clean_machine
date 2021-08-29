Rails.application.routes.draw do
  resources :customers do
    resources :orders
  end
  resources :items
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
