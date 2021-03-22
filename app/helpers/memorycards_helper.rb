module MemorycardsHelper
  # Generate a random board
  def generateBoard
    # Create and empty board at first
    board = Array.new(16, 0)

    # Add 8 shapes twice in the board
    8.times do |image|
      2.times do
        # Add all positions that have not been used to the pos array
        pos = []
        board.each_with_index{|value,index| pos.push(index) if value === 0}
        # Select a random position from available pos array
        index = rand(pos.length)
        # Add new shape to the board / image starts from 0
        board[pos[index]] = image + 1
      end
    end
    return board
  end

  # All shape text to be used / can be extended at will
  # These words are corresponding to font awesome shapes
  # E. g. <i class="fal fa-bird"></i>, the 'bird' comes from here
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
    # Define initial state / general state
    state = {
      board: [],
      id: mc.id,
      points: 0,
      status: {
        clicks: mc.clicks,
      },
      winner: 0
    }

    # Convert the whole board to array
    board = mc.board.split(',')
    # Convert opened tiles to array
    opened = mc.open.split(',')

    # Opened array has only 0 and 1, 1 meaning open
    # Multiplying with board tells which ones are already opened
    multiplied = []
    16.times { |i| multiplied.push( board[i].to_i * opened[i].to_i ) }

    # For opened tiles save to board, for others put ?
    # This way user cannot hack in the front end what is inside each tile
    state[:board] = multiplied.map { |value| (value != 0) ? images()[value - 1] : '?'}

    # Find tiles that are not correctly matched
    indexes = []
    multiplied.each_with_index { |value, index| indexes.push(index) if (value != 0 && multiplied.count(value) != 2) }

    # Close tiles if two are open
    if indexes.length > 1
      indexes.map { |index| state[:board][index] = '?' }
    end

    # Open a new tile as the other 2 are closed
    state[:board][show.to_i] = show.to_i === -1 ? '?' : images()[board[show.to_i].to_i - 1]

    # Check is all tiles are opened and calculate points
    if state[:board].count('?') === 0
      state[:winner] = 1
      state[:points] = 40 - mc.clicks
    end

    # Return state
    return state
  end
end
