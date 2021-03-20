module MastermindsHelper
  def generateCode
    code = ''

    while true
      color = (rand(8) + 1).to_s
      unless code.include? color
        code += color
        break if code.length == 4
      end
    end

    return code
  end

  def gameStatus(mm)
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

    state[:status][:round] = state[:board].index('0000')
    cell = state[:board].index('0000') ? state[:board].index('0000') - 1 : state[:board].length - 1

    if cell != -1
      state[:board][cell].split('').each_with_index do |num, index|
        color = state[:status][:colorPlace][cell][0].to_i
        place = state[:status][:colorPlace][cell][1].to_i

        color += (mm.code.include? num.to_s) ? 1 : 0
        place += (mm.code[index].to_s == num.to_s) ? 1 : 0

        colorPlace = color.to_s + place.to_s
        state[:status][:colorPlace][cell] = colorPlace
      end

      if state[:status][:colorPlace][cell] == '44'
        state[:winner] = 1
        state[:points] = 12 - state[:status][:round]
      end
    end

    return state
  end
end