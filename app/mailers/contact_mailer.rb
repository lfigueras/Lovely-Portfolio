class ContactMailer < ApplicationMailer
  def contact_email(name:, email:, message:)
    @name = name
    @email = email
    @message = message

    sender = (name.presence || "Portfolio visitor").gsub(/[\r\n]/, " ")
    account = ENV.fetch("GMAIL_USER") { Rails.application.credentials.dig(:gmail, :user) }

    mail(
      to: "lovelyfigueras@gmail.com",
      # Gmail forces the address to your account, but the display name shows who wrote in.
      from: "#{sender} <#{account}>",
      reply_to: email.presence,
      subject: "Portfolio message from #{sender}"
    )
  end
end
