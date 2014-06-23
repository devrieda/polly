require 'rails_helper'

module PollyLtiEngine
  RSpec.describe LtiController, :type => :controller do

    describe "GET 'index'" do
      it "returns http success" do
        get 'index', use_route: :polly_lti_engine
        expect(response).to be_success
      end
    end

  end
end
