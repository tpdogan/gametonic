module MemorycardsHelper
  def generateBoard
    board = Array.new(16, 0)
    8.times do |image|
      2.times do
        pos = []
        board.each_with_index{|value,index| pos.push(index) if value == 0}
        index = rand(pos.length)
        board[pos[index]] = image + 1
      end
    end
    return board
  end

  def images
    [
      'crow',
      'cow',
      'deer',
      'monkey',
      'fish',
      'frog',
      'horse',
      'spider',
    ]
  end

  def gameStatus(mc, show)
    state = {
      board: [],
      id: mc.id,
      points: 0,
      status: {
        clicks: mc.clicks,
      },
      winner: 0
    }

    board = mc.board.split(',')
    opened = mc.open.split(',')

    multiplied = []
    16.times { |i| multiplied.push( board[i].to_i * opened[i].to_i ) }

    state[:board] = multiplied.map { |value| (value != 0) ? images()[value - 1] : '?'}

    indexes = []
    multiplied.each_with_index { |value, index| indexes.push(index) if (value != 0 && multiplied.count(value) != 2) }

    if indexes.length > 1
      indexes.map { |index| state[:board][index] = '?' }
    end

    state[:board][show.to_i] = show.to_i == -1 ? '?' : images()[board[show.to_i].to_i - 1]

    if state[:board].count('?') == 0
      state[:winner] = 1
      state[:points] = 40 - mc.clicks
    end

    return state
  end
end
