proxy = YAML.load_file(Rails.root.join("config", "canvas_proxy.yml"))

proxy.each do |setting, value|
  CanvasProxy.config.send("#{setting.to_sym}=", value)
end
