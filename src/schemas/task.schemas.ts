import { z } from "zod"; 

export const TaskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().nullable()
})

export const taskCreateSchema = TaskSchema.omit({ id: true, categoryId:true });

export const taskUpdateSchema = taskCreateSchema.partial();

export type TTask = z.infer<typeof TaskSchema>;

export type TTaskCreateSchema = z.infer<typeof taskCreateSchema>;

export type TTaskUpdate = z.infer<typeof taskUpdateSchema>;