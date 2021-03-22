module HangmenHelper
  # Select a random word from word.txt
  def selectWord
    filename = 'words.txt'
    # Below line finds number of lines without reading the entire file
    totalLines = `wc -l "#{filename}"`.strip.split(' ')[0].to_i
    
    # Select random and remove additional marks
    random = rand(totalLines)
    word = open(filename,'r').readlines[random]
    word = word[0..word.length-2].downcase
  end

  def gameStatus(hm)
    # Define initial state / general state
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
    
    # Split word into letters array and create an empty guess array
    word = hm.word.split('')
    guess = Array.new(hm.word.length, '_')

    # Get the already selected letters
    letters = hm.letters.split('')
    # Check how many letters are included in the word and update the guess array accordingly
    # Increase number of wrong guesses for winning/losing
    letters.each do |letter|
      if word.include? letter
        word.each_with_index {|pos, index| (pos === letter) ? guess[index] = letter : '' }
      else
        state[:status][:wrongs] += 1
      end
    end

    # Update the state with guess and letters
    state[:board] = guess
    state[:status][:letters] = letters

    # Calculate points if user wins else show the correct word
    if word === guess
      state[:winner] = 1
      state[:points] = (8 - state[:status][:wrongs]) ** 2
    elsif state[:status][:wrongs] > 7
      state[:winner] = -1
      state[:board] = word
    end

    # Return final state
    return state
  end
end
