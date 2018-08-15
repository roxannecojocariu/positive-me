class Api::V1::QuotesController < ApiController
before_action :authenticate_user!

  def index
    quotes = current_user.quotes
    render json: { quotes: quotes }
  end

  def create
    quote = Quote.create!(quote_params)
    if user_signed_in?
      user = current_user
      new_quote = FavoritedQuote.new(user: user, quote: quote)
    else
      new_quote = Quote.new(body: params["body"], author: params["author"], mood: params["mood"] )
    end

    if new_quote.save
      render json: { quote: quote }
    else
      render json: { errors: new_quote.errors }, status: 422
    end
  end

  def update
    user = current_user if user_signed_in?
    quote = Quote.find(params)
  end

  private

  def quote_params
    params.require(:quote).permit(:body, :author, :mood)
  end
end
