class Api::V1::QuotesController < ApiController
before_action :authenticate_user!

  def index
    quotes = current_user.quotes.sort.reverse
    render json: { quotes: quotes}
  end

  def show
    render json: { quote: Quote.find(params[:id]) }
  end

  def create
    if params["new_quote"]
      new_quote = Quote.find_or_initialize_by(quote_params)
      new_quote.creator = current_user
    else
      new_quote = Quote.find_or_initialize_by(quote_params)
    end

    if new_quote.save
      FavoritedQuote.create!(user: current_user, quote: new_quote)
      render json: { quote: new_quote }
    else
      render json: { errors: new_quote.errors }, status: 422
    end
  end

  def edit
    render json: { quote: Quote.find(params[:id]),
    errors: '' }
  end

  def update
    quote = Quote.find(params[:id])
    if quote.update(quote_params)
      render json: {quote: quote}
    else
    render json: {errors: quote.errors}, status: 422
    end
  end

  private

  def quote_params
    params.require(:quote).permit(:body, :author, :mood)
  end
end
