require 'ostruct'

class CanvasProxy < Rack::Proxy
  def initialize(app)
    @app = app
  end

  def call(env)
    original = env["HTTP_HOST"]
    rewrite_env(env)

    if original != env["HTTP_HOST"]
      perform_request(env)
    # if it didn't proxy, pass it along the Rack chain
    else
      @app.call(env)
    end
  end

  def rewrite_env(env)
    request = Rack::Request.new(env)
    if request.path =~ Regexp.new(CanvasProxy.config.prefix)
      env["HTTP_AUTHORIZATION"] = "Bearer #{CanvasProxy.config.api_key}"
      env["HTTP_HOST"] = CanvasProxy.config.url
    end
  end

  def self.config
    @@config ||= OpenStruct.new
  end
end
