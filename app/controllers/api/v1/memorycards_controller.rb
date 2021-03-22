module API
  module V1
    class MemorycardsController < ApplicationController
      # Helper for extra methods
      include MemorycardsHelper

      def new
        # Create a game when new asked / no need for create method
        mc = Memorycard.create(:board => generateBoard.join(','))

        # Save the game and get the initial status
        if mc.save
          state = gameStatus(mc, -1)

          # Send status with appropriate object
          render json: {
            authenticity_token: form_authenticity_token,
            board: state[:board],
            id: state[:id],
            winner: state[:winner]
          }
          # If game cannot be saved for any reason
        else
          render json: {
            error: mc.errors,
            status: 'New board could not be generated.'
          }
        end
      end

      def update
        # Get the current game
        mc = Memorycard.find(params[:id])

        # Get the game status after making the move
        state = gameStatus(mc, memorycard_params[:index])
        # Update the game using the final status after the move
        # Number of clicks is relevant for points / see helper method
        mc.update(:open => state[:board].map { |img| img == '?' ? 0 : 1 }.join(','), :clicks => (mc.clicks + 1))
        
        # Save the game
        if mc.save

          # Send status with appropriate object
          render json: {
            board: state[:board],
            points: state[:points],
            winner: state[:winner]
          }
          # If game cannot be saved for any reason
        else
          render json: {
            error: mc.errors,
            status: 'Board could not be updated.'
          }
        end
      end

      private

      # Strong parameters just in case
      def memorycard_params
        params.require(:memorycard).permit(:index)
      end
    end
  end
end
