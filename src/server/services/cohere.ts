import cohere from "cohere-ai";
import { env } from "../../env/server.mjs";

export function getPromptbyMessage(message: string) {
  return `
  Correct misspelled English sentences and describe how to write them correctly. 
  --
  Input: I went to the store yesterdai.
  Result: Maybe you meant to say 'I went to the store yesterday'.
  --
  Input: She don't like pizza.
  Result: She doesn't like pizza. 
  --
  Input: The cat chases it's tail.
  Result: Maybe you meant to say 'The cat chases its tail'. 
  --
  Input: They was at the park.
  Result: Maybe you meant to say 'They were at the park'.
  --
  Input: I aint got no money.
  Result: Maybe you meant to say 'I don't have any money'. 
  --
  Input: She don't no how to swim.
  Result: Maybe you meant to say 'She doesn't know how to swim'. 
  --
  Input: He like to play soccer on weekends.
  Result: Maybe you meant to say 'He likes to play soccer on weekends'. 
  --
  Input: They was supposed to come yesterday.
  Result: Maybe you meant to say 'They were supposed to come yesterday'.
  --
  Input: The book was wrote by Shakespeare.
  Result: Maybe you meant to say 'The book was written by Shakespeare'.
  --
  Input: She's got the prettiest dress on.
  Result: Maybe you meant to say 'She has the prettiest dress on'.
  --
  Input: ${message}
  Result:`;
}

export function getQuestionPromp() {
  return "Give me a common question of real life";
}

export default async function cohereService(message: string) {
  cohere.init(env.COHERE_API_KEY);

  const response = await cohere.generate({
    model: "command-xlarge-20221108",
    prompt: message,
    max_tokens: 100,
    temperature: 0.9,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  });
  return response;
}
