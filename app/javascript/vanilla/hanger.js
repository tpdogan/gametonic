function hanger() {
  const man = document.getElementsByClassName('hangman__man')[0]

  // Add hangman shape
  for (let i = 0; i < 10; i++) {
    const element = document.createElement('div')
    element.id = i
    element.style.cssText = 
      i == 0 ? `width: 5px; height: 20px; right: 80px; top: 90px; transform: rotate(-45deg);` :
      i == 1 ? element.style.cssText = `width: 5px; height: 20px; right: 80px; top: 130px; transform: rotate(-45deg);` :
      i == 2 ? element.style.cssText = `width: 5px; height: 20px; right: 95px; top: 130px; transform: rotate(45deg);` :
      i == 3 ? element.style.cssText = `width: 5px; height: 20px; right: 95px; top: 90px; transform: rotate(45deg);` :
      i == 4 ? element.style.cssText = `width: 5px; height: 50px; right: 87.5px; top: 85px;` :
      i == 5 ? element.style.cssText = `width: 30px; height: 30px; right: 75px; top: 60px; border-radius: 50%;` :
      i == 6 ? element.style.cssText = `width: 5px; height: 40px; right: 87.5px; top: 30px;` :
      i == 7 ? element.style.cssText = `width: 80px; height: 10px; right: 20px; top: 30px;` :
      i == 8 ? element.style.cssText = `width: 10px; height: 120px; right: 20px; top: 40px;` :
      i == 9 ? element.style.cssText = `width: 40px; height: 10px; right: 10px; top: 160px;` : ''
    man.appendChild(element)
  }
}

export default hanger