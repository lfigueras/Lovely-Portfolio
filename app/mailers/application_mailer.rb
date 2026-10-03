class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch("GMAIL_USER", "lovelyfigueras@gmail.com")
  layout "mailer"
end
