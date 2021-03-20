module API
  module V1
    class HangmenController < ApplicationController
      include HangmenHelper

      def new
        hm = Hangman.create(:word => selectWord())
        if hm.save
          state = gameStatus(hm)

          render json: {
            authenticity_token: form_authenticity_token,
            board: state[:board],
            id: state[:id],
            status: state[:status],
            winner: state[:winner]
          }
        else
          render json: {
            error: hm.errors,
            status: 'New board could not be generated.'
          }
        end
      end

      def update
        hm = Hangman.find(params[:id])

        hm.update(:letters => (hm.letters + hangman_params[:letter]))
        
        if hm.save
          state = gameStatus(hm)

          render json: {
            board: state[:board],
            points: state[:points],
            status: state[:status],
            winner: state[:winner]
          }
        else
          render json: {
            error: hm.errors,
            status: 'Board could not be updated.'
          }
        end
      end

      private

      def hangman_params
        params.require(:hangman).permit(:letter)
      end
    end
  end
end
