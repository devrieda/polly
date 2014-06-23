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
    if request.path =~ %r{^/api/v1}
      # probably should refactor this from being hardcoded
      env["HTTP_HOST"] = "localhost:3001"
    end
  end
end
