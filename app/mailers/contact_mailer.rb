class ContactMailer < ApplicationMailer
  def contact_email(name:, email:, message:)
    @name = name
    @email = email
    @message = message

    sender = (name.presence || "Portfolio visitor").gsub(/[\r\n]/, " ")
    from = if Rails.env.production?
      ENV.fetch("RESEND_FROM_EMAIL", "Portfolio <onboarding@resend.dev>")
    else
      account = ENV.fetch("GMAIL_USER") { Rails.application.credentials.dig(:gmail, :user) }
      "#{sender} <#{account}>"
    end

    mail(
      to: "lovelyfigueras@gmail.com",
      from: from,
      reply_to: email.presence,
      subject: "Portfolio message from #{sender}"
    )
  end
end
