import { cards } from "../constants/cards";
import { ShuffleType } from "./Types";

export const getShuffledDeck = (): string[] => {
  const shuffledCards: string[] = [];
  const usedCards = [...Object.keys(cards)];
  for (let i = 0; i < 20; i++) {
    const index = Math.floor(Math.random() * usedCards.length);
    shuffledCards.push(usedCards.splice(index, 1)[0]);
  }
  return shuffledCards;
};

export const getDeckAfterDealTypeSelected = (
  options: DealDeckOptions
): string[] | undefined => {
  const { numberOfPlayers, shuffleType, cardsToCut } = options;
  if (numberOfPlayers != 2 && shuffleType === ShuffleType.DRAW) return;
  if (shuffleType === ShuffleType.CUT && !cardsToCut) return;
  const shuffledDeck = getShuffledDeck();
  switch (shuffleType) {
    case ShuffleType.TAP:
    case ShuffleType.DRAW:
      return shuffledDeck;
    case ShuffleType.CUT: {
      const cutDeck = shuffledDeck.splice(cardsToCut!, 20 - cardsToCut!);
      return [...cutDeck, ...shuffledDeck];
    }
  }
};

export interface DealDeckOptions {
  numberOfPlayers: number;
  shuffleType: ShuffleType;
  cardsToCut?: number;
}
