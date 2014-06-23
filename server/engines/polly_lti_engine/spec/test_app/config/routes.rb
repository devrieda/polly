Rails.application.routes.draw do

  mount PollyLtiEngine::Engine => "/polly_lti_engine"
end
