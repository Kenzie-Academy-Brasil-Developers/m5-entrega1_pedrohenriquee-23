import { prisma } from "../database/prisma";
import { TTask, TTaskCreateSchema, TTaskUpdate } from "../schemas/task.schemas";

export class TaskServices {
    async create(body: TTaskCreateSchema): Promise<TTask> {
        const data = await prisma.task.create({ data: body });
        return data;
    }

    async findMany(): Promise<TTask[]> {
        const data = await prisma.task.findMany({
            include: {
                category: true, 
            },
        });
        return data;
    }

    async findByCategory(categoryName: string): Promise<TTask[]> {
        const data = await prisma.task.findMany({
            where: {
                category: {
                    name: {
                        equals: categoryName.toLowerCase(), 
                    },
                },
            },
            include: {
                category: true, 
            },
        });
        return data;
    }    

    async findOne(id: number): Promise<TTask> {
        const data = await prisma.task.findFirst({
            where: { id },
            include: {
                category: true, 
            },
        });
        return data as TTask;
    }

    async update(id: number, body: TTaskUpdate): Promise<TTask> {
        const data = await prisma.task.update({ where: { id }, data: body });
        return data;
    }

    async delete(id: number): Promise<void> {
        await prisma.task.delete({ where: { id } })
    }
}