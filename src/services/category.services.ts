import { prisma } from "../database/prisma";
import { TCategory, TCategoryCreate } from "../schemas/category.schemas";

export class CategoryServices {
    async create(body: TCategoryCreate): Promise<TCategory> {
        try {
            const data = await prisma.category.create({ data: body });
            return data;
        } catch (error) {
            
            console.error("Erro ao criar categoria:", error);
            throw error; 
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await prisma.category.delete({ where: { id } });
        } catch (error) {
            
            console.error("Erro ao excluir categoria:", error);
            throw error; 
        }
    }
}

