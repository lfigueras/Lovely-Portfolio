class ContactsController < ApplicationController
  def create
    ContactMailer.contact_email(
      name: params[:name].to_s.strip,
      email: params[:email].to_s.strip,
      message: params[:message].to_s.strip
    ).deliver_now

    redirect_to root_path(anchor: "contact"), notice: "Thanks for reaching out! Your message has been sent."
  rescue StandardError => e
    Rails.logger.error("Contact form delivery failed: #{e.class} - #{e.message}")
    redirect_to root_path(anchor: "contact"), alert: "Sorry, something went wrong. Please email me directly at lovelyfigueras@gmail.com."
  end
end
