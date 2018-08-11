class Api::V1::QuotesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: {quotes: Quote.all}
  end
end
