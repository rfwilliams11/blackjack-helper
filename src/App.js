import "./App.css";
import { useState } from "react";
import { getMove } from "./useGetMove.ts";
import {
  Button,
  Flex,
  Text,
  Input,
  FormLabel,
  Heading,
  Icon,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { GiCardAceSpades } from "react-icons/gi";

function App() {
  const [userCards, setUserCards] = useState([]);
  const [dealerCard, setDealerCard] = useState("");
  const [move, setMove] = useState("");

  const handleInputChange = (event) => {
    // Handle user input changes and update state
    const { name, value } = event.target;
    if (name === "userCards") {
      setUserCards(value);
    } else if (name === "dealerCard") {
      setDealerCard(parseInt(value));
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call the getMove function with user input values and update state
    const userCardsArray = userCards.split(",").map((card) => parseInt(card));
    const move = getMove(userCardsArray, dealerCard);
    setMove(move);
  };

  return (
    <Flex
      direction="column"
      width="100%"
      justify={"center"}
      m={2}
    >
      <Heading justify="center" align="center" m={2}>
        {" "}
        <Icon as={GiCardAceSpades} m={-1} /> Blackjack Helper{" "}
        <Icon as={GiCardAceSpades} m={-1} />
      </Heading>
      <Flex justify={"center"}>
        <VStack width="33%">
          <HStack width="100%">
            <Text width="100%" fontWeight={"bold"} align="left" m={2}>Your cards (comma-separated values):</Text>
            <Input
              type="text"
              name="userCards"
              value={userCards}
              onChange={handleInputChange}
            />
          </HStack>
          <HStack width="100%">
            <Text width="100%" align="left" fontWeight={"bold"} m={2}>Dealer's card value:</Text>
            <Input
              type="text"
              name="dealerCard"
              value={dealerCard}
              onChange={handleInputChange}
            />
          </HStack>
          <Button align="center" justify="center" m={2} type="submit" onClick={handleFormSubmit}>
            Get move
          </Button>
          </VStack>
      </Flex>
      {move && (
        <HStack justify="center" align="center" spacing={"4px"}>
          <Text size={"48px"}>The best move is to</Text>
          <Text size={"48px"} color={"red"} fontWeight="bold" textTransform={"uppercase"}>
            {move}
          </Text>
        </HStack>
      )}
    </Flex>
  );
}

export default App;
