Rails.application.routes.draw do

  get "lti/config(.xml)" => 'lti#xml_config', as: :lti_xml_config
  get "health_check" => "lti#health_check"
  match "lti/launch", via: [:get, :post], as: :lti_launch

  root 'lti#launch'
end
