class Api::V1::QuotesController < ApiController
before_action :authenticate_user!, except: [:index]

  def index
    quotes = Quote.all
    render json: { quotes: quotes }
  end

  def create
    quote = Quote.create!(quote_params)
    user = current_user if user_signed_in?
    new_favorite = FavoritedQuote.new(user: user, quote: quote)

    if new_favorite.save
      render json: { quote: quote }
    else
      render json: { errors: new_favorite.errors }, status: 422
    end
  end

  private

  def quote_params
    params.require(:quote).permit(:body, :author, :mood)
  end
end
