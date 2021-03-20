module API
  module V1
    class MastermindsController < ApplicationController
      include MastermindsHelper

      def new
        mm = Mastermind.create(:code => generateCode)
        if mm.save
          state = gameStatus(mm)

          render json: {
            authenticity_token: form_authenticity_token,
            board: state[:board],
            id: state[:id],
            status: state[:status],
            winner: state[:winner]
          }
        else
          render json: {
            error: mm.errors,
            status: 'New board could not be generated.'
          }
        end
      end

      def update
        mm = Mastermind.find(params[:id])

        params[:mastermind][:board] = params[:mastermind][:board].join(',')

        mm.update(mastermind_params)
        state = gameStatus(mm)
        mm.update(:colorPlace => state[:status][:colorPlace].join(','))
        
        if mm.save
          render json: {
            board: state[:board],
            points: state[:points],
            status: state[:status],
            winner: state[:winner]
          }
        else
          render json: {
            error: mm.errors,
            status: 'Board could not be updated.'
          }
        end
      end

      private

      def mastermind_params
        params.require(:mastermind).permit!
      end
    end
  end
end
