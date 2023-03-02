// interface Card {
//   value: number;
//   //   suit: string;
// }

enum Move {
  Hit = "hit",
  Stand = "stand",
  DoubleDown = "double down",
  Split = "split",
  Surrender = "surrender",
}

export function getMove(userCards: number[], dealerCard: number): Move {
  const cardValues: number[] = userCards; //.map((card) => card.value);
  const dealerValue = dealerCard; //.value;
  console.log("cardValues: " + userCards);
  console.log("dealerCard: " + dealerCard);

  // Calculate the total value of the user's cards
  let total = cardValues.reduce((sum, value) => sum + value, 0);

  // Check for an ace and adjust the total accordingly
  const aceCount = cardValues.filter((value) => value === 1).length;
  if (aceCount > 0 && total + 10 <= 21) {
    total += 10;
  }

  // Check for soft and hard hand
  const softHand = aceCount > 0 && total <= 11;
  const hardHand = total <= 21 && (!softHand || total - 10 <= 11);

  // Implement basic Blackjack strategy based on the user's total and the dealer's face-up card
  if (softHand) {
    if (total === 20) {
      return Move.Stand;
    } else if (total === 19 && dealerValue === 6) {
      return Move.DoubleDown;
    } else if (total >= 17) {
      return Move.Stand;
    } else if (total === 15 || total === 16) {
      if (dealerValue >= 4 && dealerValue <= 6) {
        return Move.DoubleDown;
      } else {
        return Move.Hit;
      }
    } else if (total === 13 || total === 14) {
      if (dealerValue >= 5 && dealerValue <= 6) {
        return Move.DoubleDown;
      } else {
        return Move.Hit;
      }
    } else {
      return Move.Hit;
    }
  } else if (hardHand) {
    if (total >= 17) {
      return Move.Stand;
    } else if (total === 16) {
      if (dealerValue >= 2 && dealerValue <= 6) {
        return Move.Stand;
      } else {
        return Move.Hit;
      }
    } else if (total === 15) {
      if (dealerValue >= 2 && dealerValue <= 6) {
        return Move.Stand;
      } else if (dealerValue === 10 || dealerValue === 11) {
        return Move.Surrender;
      } else {
        return Move.Hit;
      }
    } else if (total === 13 || total === 14) {
      if (dealerValue >= 2 && dealerValue <= 6) {
        return Move.Stand;
      } else {
        return Move.Hit;
      }
    } else if (total === 12) {
      if (dealerValue >= 4 && dealerValue <= 6) {
        return Move.Stand;
      } else {
        return Move.Hit;
      }
    } else if (total === 11) {
      return Move.DoubleDown;
    } else if (total === 10) {
      if (dealerValue >= 2 && dealerValue <= 9) {
        return Move.DoubleDown;
      } else {
        return Move.Hit;
      }
    } else {
      return Move.Hit;
    }
  } else {
    return Move.Hit;
  }
}
