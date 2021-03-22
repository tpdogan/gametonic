module TictactoesHelper
  # Convert board string to array
  def boardArray(xox)
    return xox.board.split(',')
  end

  # Play randomly for cpu
  def randomPlay(xox)
    # Get the board as array and check if cpu should play
    board = boardArray(xox)
    if gameStatus(xox)[:status][:perform] === 'play'
      # Add all tiles that have not been used to the pos array
      pos = []
      board.each_with_index{|value, index| pos.push(index) if board[index] === '0'}
      # Select a random index from available pos array
      index = rand(pos.length)
      # Change the empty board position
      board[pos[index]] = '1'
    end
    
    # Update the board after the random play / convert array to string
    xox.update(:board => board.join(','))

    # Check the game status after the cpu plays
    state = gameStatus(xox)
    return state
  end

  def gameStatus(xox)
    # Define initial state / general state
    state = {
      board: boardArray(xox),
      id: xox.id,
      points: 0,
      status: {
        perform: 'play'
      },
      winner: 0
    }

    # Get the state board
    board = state[:board]

    # Check for possible winning scenarios and assign winner
    if hasWon(board, 0, 4, 8) || hasWon(board, 1, 4, 7) || hasWon(board, 2, 4, 6) || hasWon(board, 3, 4, 5)
      perform = 'won',
      winner = board[4].to_i
    elsif hasWon(board, 0, 1, 2) || hasWon(board, 0, 3, 6)
      perform = 'won',
      winner = board[0].to_i
    elsif hasWon(board, 6, 7, 8) || hasWon(board, 2, 5, 8)
      perform = 'won',
      winner = board[8].to_i
    elsif !board.include? '0'
      perform = 'draw',
      winner = 0
    end

    # Update perform status if it exists
    state[:status][:perform] = perform if perform
    # Update the winner status if it exists
    state[:winner] = winner if winner
    # Set the points depending on empty number of tiles
    state[:points] = (1 + state[:board].count('0')) ** 2 if winner

    # Return state
    return state
  end

  # Winning algorithm
  def hasWon(board, pos1, pos2, pos3)
    # Check if the given 3 positions have the same tile and not zero
    if board[pos1] != '0' && board[pos1] === board[pos2] && board[pos1] === board[pos3]
      return true
    end
    return false
  end
end
