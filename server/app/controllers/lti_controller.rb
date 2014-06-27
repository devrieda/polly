require "ims/lti"

class LtiController < ApplicationController
  def launch
    @launch_params = params.reject!{ |k,v| ['controller','action'].include? k }

    # unless session[:access_token]
    #   redirect_to oauth_launch_path
    # end
  end

  def xml_config
    host = "#{request.protocol}#{request.host_with_port}"
    url = "#{host}#{lti_launch_path}"
    title = "Polly"
    tool_id = "polly"
    tc = IMS::LTI::ToolConfig.new(:title => title, :launch_url => url)
    tc.extend IMS::LTI::Extensions::Canvas::ToolConfig
    tc.set_custom_param('canvas_user_id', '$Canvas.user.id')
    tc.description = "Web based Canvas polling"
    tc.canvas_privacy_anonymous!
    tc.canvas_domain!(request.host)
    tc.canvas_icon_url!("#{host}/assets/common/icon.png")
    tc.canvas_text!(title)
    tc.set_ext_param('canvas.instructure.com', :tool_id, tool_id)
    tc.canvas_course_navigation!(enabled: true)
    render xml: tc.to_xml
  end

  def health_check
    head 200
  end

end
