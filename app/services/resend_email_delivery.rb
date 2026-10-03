require "json"
require "net/http"

class ResendEmailDelivery
  ENDPOINT = URI("https://api.resend.com/emails")

  class DeliveryError < StandardError; end

  def initialize(message)
    @message = message
  end

  def deliver
    request = Net::HTTP::Post.new(ENDPOINT)
    request["Authorization"] = "Bearer #{ENV.fetch('RESEND_API_KEY')}"
    request["Content-Type"] = "application/json"
    request.body = JSON.generate(payload)

    response = Net::HTTP.start(
      ENDPOINT.host,
      ENDPOINT.port,
      use_ssl: true,
      open_timeout: 5,
      read_timeout: 10
    ) do |http|
      http.request(request)
    end

    return if response.code.to_i.between?(200, 299)

    raise DeliveryError, "Resend API returned HTTP #{response.code}"
  end

  private

  def payload
    {
      from: ENV.fetch("RESEND_FROM_EMAIL", "Portfolio <onboarding@resend.dev>"),
      to: @message.to,
      subject: @message.subject,
      text: @message.text_part&.decoded || @message.body.decoded,
      reply_to: @message.reply_to&.first
    }.compact
  end
end
