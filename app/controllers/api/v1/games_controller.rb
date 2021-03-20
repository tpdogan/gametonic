module API
  module V1
    class GamesController < ApplicationController
      def index
        render json: { games: Game.all, status: 'All games are sent successfully.' }
      end
    end
  end
end
