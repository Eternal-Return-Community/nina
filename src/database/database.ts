import client from './client'
import CustomError from '@nina/errors/CustomError'

type Partial = {
    token: string,
    limit: number,
    isVip: boolean
}

interface Database {
    create(limit?: number, isVip?: boolean): Promise<Partial>;
    read(token: string): Promise<Partial>;
    update(token: string, isVip?: boolean): Promise<any>;
    delete(token: string): Promise<string>;
}

export const database: Database = {
    create: async (limit: number = 10, isVip: boolean = false): Promise<Partial> => {
        const token: Partial = await client.token.create({
            data: { limit: isVip ? limit : 10, isVip },
            select: {
                token: true,
                limit: true,
                isVip: true
            }
        });
        return token;
    },
    read: async (token: string): Promise<Partial> => {
        const getToken: Partial | null = await client.token.findFirst({
            where: { token },
            select: {
                token: true,
                limit: true,
                isVip: true
            }
        })

        if (!getToken) throw new CustomError(404, 'token.not.found');
        return getToken;
    },
    update: async (token: string, isVip: boolean = false): Promise<any> => { },
    delete: async (token: string): Promise<string> => {
        const deleteToken = await client.token.deleteMany({
            where: { token }
        })

        if (!deleteToken.count) throw new CustomError(404, 'token.not.found');

        return 'Token deletado com sucesso!';
    },
}