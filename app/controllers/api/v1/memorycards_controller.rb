module API
  module V1
    class MemorycardsController < ApplicationController
      include MemorycardsHelper

      def new
        mc = Memorycard.create(:board => generateBoard.join(','))
        if mc.save
          state = gameStatus(mc, -1)

          render json: {
            authenticity_token: form_authenticity_token,
            board: state[:board],
            id: state[:id],
            winner: state[:winner]
          }
        else
          render json: {
            error: mc.errors,
            status: 'New board could not be generated.'
          }
        end
      end

      def update
        mc = Memorycard.find(params[:id])

        state = gameStatus(mc, memorycard_params[:index])
        mc.update(:open => state[:board].map { |img| img == '?' ? 0 : 1 }.join(','), :clicks => (mc.clicks + 1))
        
        if mc.save

          render json: {
            board: state[:board],
            points: state[:points],
            winner: state[:winner]
          }
        else
          render json: {
            error: mc.errors,
            status: 'Board could not be updated.'
          }
        end
      end

      private

      def memorycard_params
        params.require(:memorycard).permit(:index)
      end
    end
  end
end
