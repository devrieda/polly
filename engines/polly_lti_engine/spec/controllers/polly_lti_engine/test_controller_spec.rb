require 'rails_helper'

module PollyLtiEngine
  RSpec.describe TestController, :type => :controller do

    describe "GET 'backdoor'" do
      it "returns http success" do
        get 'backdoor', use_route: :polly_lti_engine
        expect(response).to be_success
      end
    end

  end
end
