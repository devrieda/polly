require 'net/http'

class OauthController < ApplicationController
  def oauth_launch
    if session[:access_token]
      redirect_to action: :launch
    else
      redirect_to "#{CanvasProxy.config.url}/login/oauth2/auth?client_id=#{session[:client_id]}&response_type=code&redirect_uri=#{oauth_response_url}"
    end
  end

  def oauth_response
    canvas_url = URI("#{CanvasProxy.config.url}/login/oauth2/token")
    response = Net::HTTP.post_form(canvas_url, client_id: session[:client_id],
                                                  redirect_uri: oauth_response_url,
                                                  client_secret: session[:client_secret], code: params[:code])

    session[:access_token] = JSON.parse(response.body)['access_token']
    redirect_to "/"
  end
end
