class Api::V1::QuotesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    quotes = Quote.all
    render json: { quotes: quotes }
  end

end
