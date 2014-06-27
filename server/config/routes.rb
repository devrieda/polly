Rails.application.routes.draw do

  get "lti/config(.xml)" => 'lti#xml_config', as: :lti_xml_config
  get "health_check" => "lti#health_check"
  match "lti/launch", via: [:get, :post], as: :lti_launch

  match "/oauth/launch" => "oauth#oauth_launch", via: [:get], as: :oauth_launch
  match "/oauth2response" => "oauth#oauth_response", via: [:get], as: :oauth_response

  root 'lti#launch'
end
