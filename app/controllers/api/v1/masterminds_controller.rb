module API
  module V1
    class MastermindsController < ApplicationController
      # Helper for extra methods
      include MastermindsHelper

      def new
        # Create a game when new asked / no need for create method
        # Generate a code to find out / see helper method
        mm = Mastermind.create(:code => generateCode)

        # Save the game and get the initial status
        if mm.save
          state = gameStatus(mm)

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
            error: mm.errors,
            status: 'New board could not be generated.'
          }
        end
      end

      def update
        # Get the current game
        mm = Mastermind.find(params[:id])

        # Convert array board into a string as in database
        params[:mastermind][:board] = params[:mastermind][:board].join(',')

        # Update the current game with new, strong params
        mm.update(mastermind_params)
        # Get the current game status
        state = gameStatus(mm)
        # Update the colorplace column using the status, convert array to string
        mm.update(:colorPlace => state[:status][:colorPlace].join(','))
        
        # Save the game
        if mm.save
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
            error: mm.errors,
            status: 'Board could not be updated.'
          }
        end
      end

      private

      # Strong parameters just in case
      def mastermind_params
        params.require(:mastermind).permit!
      end
    end
  end
end
