module HangmenHelper
  def selectWord
    filename = 'words.txt'
    totalLines = `wc -l "#{filename}"`.strip.split(' ')[0].to_i
    
    random = rand(totalLines)
    word = open(filename,'r').readlines[random]
    word = word[0..word.length-2]
  end

  def gameStatus(hm)
    state = {
      board: [],
      id: hm.id,
      points: 0,
      status: {
        letters: '',
        wrongs: 0
      },
      winner: 0
    }
    
    word = hm.word.split('')
    guess = Array.new(hm.word.length, '_')

    letters = hm.letters.split('')
    letters.each do |letter|
      if word.include? letter
        word.each_with_index {|pos, index| (pos === letter) ? guess[index] = letter : '' }
      else
        state[:status][:wrongs] += 1
      end
    end

    state[:board] = guess
    state[:status][:letters] = letters
    if word === guess
      state[:winner] = 1
      state[:points] = 8 - state[:status][:wrongs]
    elsif state[:status][:wrongs] > 7
      state[:winner] = -1
      state[:board] = word
    end

    return state
  end
end
