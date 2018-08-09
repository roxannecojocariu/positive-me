require 'net/http'

class Api::V1::QuotesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    uri = URI("http://quotes.rest/quote/search.json?category=#{params[:category]}")

    Net::HTTP.start(uri.host, uri.port) do |http|
      request = Net::HTTP::Get.new uri

      request.add_field 'X-TheySaidSo-Api-Secret', ENV["THEY_SAID_SO_API_KEY"]
      response = http.request request # Net::HTTPResponse object

      render json: response.body
    end
  end
end
