import { Document, Schema, model } from 'mongoose';

export interface MemorySchema {
  question: string;
  answer: string;
  audioUrl: string;
  mode: number;
  createdAt?: Date;
  updatedAt?: Date | number;
}

export interface MemoryDocument extends MemorySchema, Document {}

const memory = new Schema<MemoryDocument>({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  mode: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

memory.pre<MemoryDocument>('update', function(next) {
    this['updatedAt'] = Date.now();

    next();
});

export const Memory = model<MemoryDocument>('memory', memory);
