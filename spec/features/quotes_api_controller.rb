require 'rails_helper'

RSpec.describe Api::V1::QuotesController, type: :controller do
  let!(:user) { User.create!(email: "test@test.com", password: "aaaaaa") }
  let!(:quote) { Quote.create!(body: "this is a test quote body", author: "this is a test author", mood: "this is a test mood", user: user) }
  let!(:favorited_quote) { FavoritedQuote.create!(user: user, quote: quote) }

  describe "GET#index" do
    it "should return a quote" do

      sign_in user

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json.first["body"]).to eq("this is a test quote body")
    end
  end

  describe "POST#create" do
    it "should create a new quote" do
      numQuotesBefore = Quote.all.length
      get :create, params: {
        user: user,
        body: quote.body, author: quote.author, mood: quote.mood
      }
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      numQuotesAfter = Quote.all
      expect(numQuotesBefore + 1).to eq 2
    end
  end
end
