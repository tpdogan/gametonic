module API
  module V1
    class TictactoesController < ApplicationController
      include TictactoesHelper

      def new
        xox = Tictactoe.create()
        if xox.save
          state = gameStatus(xox)

          render json: {
            authenticity_token: form_authenticity_token,
            board: state[:board],
            id: state[:id],
            status: state[:status],
            winner: state[:winner]
          }
        else
          render json: {
            error: xox.errors,
            status: 'New board could not be generated.'
          }
        end
      end

      def update
        xox = Tictactoe.find(params[:id])

        board = boardArray(xox)
        board[tictactoe_params[:index].to_i] = '-1'
        xox.update(:board => board.join(','))
        
        state = randomPlay(xox)
        if xox.save
          render json: {
            board: state[:board],
            points: state[:points],
            status: state[:status],
            winner: state[:winner]
          }
        else
          render json: {
            error: xox.errors,
            status: 'Board could not be updated.'
          }
        end
      end

      private

      def tictactoe_params
        params.require(:tictactoe).permit(:index)
      end
    end
  end
end