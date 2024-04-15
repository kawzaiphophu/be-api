import { EntitySchema } from 'typeorm';

interface User {
    id: number;
    username: string;
    email: string;
    phone: string;
    user_id_card: string;
    country: string;
    birth_day: Date;
    blood_group: string;
    nation: string;
    created_at: Date;
}

const UserSchema = new EntitySchema<User>({
    name: 'User',
    tableName: 'user',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        username: {
            type: 'varchar'
        },
        email: {
            type: 'varchar'
        },
        phone: {
            type: 'varchar',
            length: 10
        },
        user_id_card: {
            type: 'varchar',
            length: 13
        },
        country: {
            type: 'varchar'
        },
        birth_day: {
            type: 'date'
        },
        blood_group: {
            type: 'varchar',
            length: 3
        },
        nation: {
            type: 'varchar',
            length: 50
        },
        created_at: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP'
        }
    },
});

export default UserSchema;
