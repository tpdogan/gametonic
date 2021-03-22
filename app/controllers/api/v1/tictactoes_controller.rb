module API
  module V1
    class TictactoesController < ApplicationController
      # Helper for extra methods
      include TictactoesHelper

      def new
        # Create a game when new asked / no need for create method
        xox = Tictactoe.create()

        # Save the game and get the initial status
        if xox.save
          state = gameStatus(xox)

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
            error: xox.errors,
            status: 'New board could not be generated.'
          }
        end
      end

      def update
        # Get the current game
        xox = Tictactoe.find(params[:id])

        # Get the board array using the game reference
        board = boardArray(xox)
        # Make the user move which is always -1 / 'o'
        board[tictactoe_params[:index].to_i] = '-1'
        # Update the game with latest move, convert array to string
        xox.update(:board => board.join(','))
        
        # Make a random play and/or get the status
        # Random play also checks if the player has already won / see helper method
        state = randomPlay(xox)

        # Save the game
        if xox.save

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
            error: xox.errors,
            status: 'Board could not be updated.'
          }
        end
      end

      private

      # Strong parameters just in case
      def tictactoe_params
        params.require(:tictactoe).permit(:index)
      end
    end
  end
end