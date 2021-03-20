module API
  module V1
    class UsersController < ApplicationController
      def index
        if params[:game]
          userGames = UserToGame.where(:game => Game.find_by_name(params[:game])).order('points DESC')
        else
          userGames = UserToGame.all.order('points DESC')
        end
        render json: { users: userGames.map{ |userGame| [userGame.user.username, userGame.points] }, status: 'All usernames are sent.' }
      end

      def new
        render json: { authenticity_token: form_authenticity_token, status: 'Token is sent successfully.' }
      end

      def create
        #params[:password] = secure_password(params[:password])
        user = User.find_by_username(user_params[:username])
        unless user
          user = User.create(user_params)
        end
        user.save

        game = Game.find_by_name(game_params[:name])
        
        userToGame = UserToGame.where(:user_id => user.id, :game_id => game.id)[0]
        unless userToGame
          userToGame = UserToGame.create(:user_id => user.id, :game_id => game.id)
          userToGame.save
        end
        
        userToGame.update(:points => (userToGame.points + game_params[:points]))
        
        if userToGame.save
          render json: { user: user, status: 'User points saved successfully.' }
        else
          render json: { error: user.errors, status: 'User saving was not successful.' }
        end
      end

      private

      def user_params
        params.require(:user).permit(:username)
      end

      def game_params
        params.require(:game).permit(:name, :points)
      end

      #def secure_password(original_password)
      #  require "openssl"
      #  key = "gametonic-user-password"
      #  secret = OpenSSL::HMAC.hexdigest("sha256", key, original_password.to_s)
      #end
    end
  end
end
