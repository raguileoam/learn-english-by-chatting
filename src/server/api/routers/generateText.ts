import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

import cohereService from "../../services/cohere";
import { getPromptbyMessage, getQuestionPromp } from "../../services/cohere";

import { TRPCError } from "@trpc/server";

export const generateTextRouter = createTRPCRouter({
  correctEnglish: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const { body, statusCode } = await cohereService(
        getPromptbyMessage(input.text)
      );

      if (statusCode !== 200) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Bad Request" });
      }
      const text = body.generations[0]?.text as string;
      return {
        greeting: `${text}`,
      };
    }),
  randomQuestion: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async () => {
      const { body, statusCode } = await cohereService(getQuestionPromp());

      if (statusCode !== 200) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Bad Request" });
      }
      const text = body.generations[0]?.text as string;
      return {
        question: text,
      };
    }),
});
