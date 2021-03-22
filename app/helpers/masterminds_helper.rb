module MastermindsHelper
  # Generate a random code
  def generateCode
    # Create an empty code and all colors
    code = []
    colors = (1..8).to_a

    # Add 4 colors to the code
    4.times do
      # Add all colors that have not been used to the pos array
      pos = []
      colors.each{|value| pos.push(value) if !code.include? value}
      # Select a random color from available pos array
      index = rand(pos.length)
      # Push new color to the code
      code.push(pos[index])
    end

    # Return a code string
    return code.join('')
  end

  def gameStatus(mm)
    # Define initial state / general state
    state = {
      board: mm.board.split(','),
      id: mm.id,
      points: 0,
      status: {
        colorPlace: mm.colorPlace.split(','),
        round: 0
      },
      winner: 0
    }

    # Get the current round by looking at the board from database
    state[:status][:round] = state[:board].index('0000')

    # If the last round has been played it will be nil
    # Update all parameters for the last round
    # The state is subject to change if the user won in the last round
    if !state[:status][:round]
      state[:winner] = -1
      state[:status][:round] = 12
      state[:status][:colorPlace] = state[:status][:colorPlace] + ['44']
      state[:board] = state[:board] + [mm.code]
    end

    # The cell index starts from 0 while round starts from 1
    cell = state[:status][:round] - 1

    # If it is not the first round (user has not submitted anything in the first round)
    if cell != -1
      # Check each color in the submitted code
      # Increase the number of colors for each correct color
      # Increase the number of place for each correctly placed color
      state[:board][cell].split('').each_with_index do |num, index|
        color = state[:status][:colorPlace][cell][0].to_i
        place = state[:status][:colorPlace][cell][1].to_i

        color += (mm.code.include? num.to_s) ? 1 : 0
        place += (mm.code[index].to_s == num.to_s) ? 1 : 0

        colorPlace = color.to_s + place.to_s
        state[:status][:colorPlace][cell] = colorPlace
      end

      # If the user has won the colorplace will be 44, meaning all 4 colors and positions are correct
      if state[:status][:colorPlace][cell] == '44'
        state[:winner] = 1
        state[:points] = 4*(13 - state[:status][:round])
      end
    end

    # Return the state
    return state
  end
end