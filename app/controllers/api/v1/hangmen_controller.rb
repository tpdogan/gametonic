module API
  module V1
    class HangmenController < ApplicationController
      # Helper for extra methods
      include HangmenHelper

      def new
        # Create a game when new asked / no need for create method
        # Select a new word from available / see helper method
        hm = Hangman.create(:word => selectWord())

        # Save the game and get the initial status
        if hm.save
          state = gameStatus(hm)

          # Send status with appropriate object
          render json: {
            authenticity_token: form_authenticity_token,
            board: state[:board],
            id: state[:id],
            status: state[:status],
            winner: state[:winner]
          }
          # If game cannot be saved for any reason
        else
          render json: {
            error: hm.errors,
            status: 'New board could not be generated.'
          }
        end
      end

      def update
        # Get the current game
        hm = Hangman.find(params[:id])

        # Concatenate the new letter and update the game
        hm.update(:letters => (hm.letters + hangman_params[:letter]))
        
        # Save the game and get the current status
        if hm.save
          state = gameStatus(hm)

          # Send status with appropriate object
          render json: {
            board: state[:board],
            points: state[:points],
            status: state[:status],
            winner: state[:winner]
          }
          # If game cannot be saved for any reason
        else
          render json: {
            error: hm.errors,
            status: 'Board could not be updated.'
          }
        end
      end

      private

      # Strong parameters just in case
      def hangman_params
        params.require(:hangman).permit(:letter)
      end
    end
  end
end
