Rails.application.routes.draw do
  mount PollyLtiEngine::Engine => '/lti'

  root 'pages#index'
end
