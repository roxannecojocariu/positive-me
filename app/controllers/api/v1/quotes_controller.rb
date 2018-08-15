class Api::V1::QuotesController < ApiController
before_action :authenticate_user!

  def index
    quotes = current_user.quotes
    render json: { quotes: quotes }
  end

  def create
    if params["new_quote"]
      new_quote = Quote.find_or_initialize_by(quote_params)
      new_quote.creator = current_user
    else
      new_quote = Quote.find_or_initialize_by(quote_params)
      binding.pry
    end

    # new_quote = Quote.new(quote_params)
    # new_quote.creator = current_user

    if new_quote.save
      FavoritedQuote.create!(user: current_user, quote: new_quote)
      render json: { quote: new_quote }
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
