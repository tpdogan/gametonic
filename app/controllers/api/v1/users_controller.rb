module API
  module V1
    class UsersController < ApplicationController

      def index
      # Order the user information either for a games or all games
        if params[:game]
          userGames = UserToGame.where(:game => Game.find_by_name(params[:game])).order('points DESC')
        else
          userGames = UserToGame.all.order('points DESC')
        end
        # Send information as pairs of username and points
        render json: { users: userGames.map{ |userGame| [userGame.user.username, userGame.points] }, status: 'All usernames are sent.' }
      end

      # New method only sends auth token for user form
      def new
        render json: { authenticity_token: form_authenticity_token, status: 'Token is sent successfully.' }
      end

      def create
        # First check if username already exists, if not create new one and save
        user = User.find_by_username(user_params[:username])
        unless user
          user = User.create(user_params)
        end
        # Save user
        user.save

        # Find the game that user has played and won
        game = Game.find_by_name(game_params[:name])
        
        # Check if user has played the game before if not create a relation and save
        userToGame = UserToGame.where(:user_id => user.id, :game_id => game.id)[0]
        unless userToGame
          userToGame = UserToGame.create(:user_id => user.id, :game_id => game.id)
          userToGame.save
        end
        
        # Update the relation by adding newly gained points 
        userToGame.update(:points => (userToGame.points + game_params[:points]))
        
        # Save relation and send relevant information
        if userToGame.save
          render json: { user: user, status: 'User points saved successfully.' }
        else
          render json: { error: user.errors, status: 'User saving was not successful.' }
        end
      end

      private

      # Strong parameters just in case
      def user_params
        params.require(:user).permit(:username)
      end

      def game_params
        params.require(:game).permit(:name, :points)
      end
    end
  end
end
