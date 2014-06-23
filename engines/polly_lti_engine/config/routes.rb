PollyLtiEngine::Engine.routes.draw do
  post "embed" => "lti#embed", as: :lti_embed
  get "test/backdoor"
  match  "launch" => "lti#launch", as: :launch, via: [:get, :post]
  get "config(.xml)" => "lti#xml_config", as: :lti_xml_config
  get "health_check" => "lti#health_check"
  match "/" => "lti#index", via: [:get, :post]
  root "lti#index"
  namespace :polly_lti_engine do
  get 'lti/index'
  end

  namespace :polly_lti_engine do
  get 'test/backdoor'
  end

end
