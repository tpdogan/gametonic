module TictactoesHelper
  def boardArray(xox)
    return xox.board.split(',')
  end

  def randomPlay(xox)
    board = boardArray(xox)
    if gameStatus(xox)[:status][:perform] === 'play'
      while true
        pos = rand(9)
        if board[pos] === '0'
          board[pos] = '1'
          break
        end
      end
    end
    xox.update(:board => board.join(','))

    state = gameStatus(xox)
    return state
  end

  def gameStatus(xox)
    state = {
      board: boardArray(xox),
      id: xox.id,
      points: 0,
      status: {
        perform: 'play'
      },
      winner: 0
    }
    board = state[:board]

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

    state[:status][:perform] = perform if perform
    state[:winner] = winner if winner
    state[:points] = state[:board].count('0') if winner

    return state
  end

  def hasWon(board, pos1, pos2, pos3)
    if board[pos1] != '0' && board[pos1] === board[pos2] && board[pos1] === board[pos3]
      return true
    end
    return false
  end
end
