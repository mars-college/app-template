import { FastifyRequest, FastifyReply } from "fastify";
import { Memory } from "../models/Memory";



export const getMemories = async (request: FastifyRequest, reply: FastifyReply) => {
  const memories = await Memory.find({mode: 0});
  return reply.status(200).send({
    memories: memories,
  });
}

export const createMemory = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { question, answer, audioUrl } = request.body as {
      question: string, answer: string, audioUrl: string
    };

    // Create a new Memory object
    const newMemory = new Memory({
      question: question,
      answer: answer,
      audioUrl: audioUrl,
      mode: 0
    });

    // Save the new memory to the database
    await newMemory.save();

    return reply.status(201).send({
      message: "Memory created successfully",
      memory: newMemory,
    });
  } catch (error) {
    console.error("Error creating memory:", error);
    return reply.status(500).send({
      error: "Internal server error",
    });
  }
}