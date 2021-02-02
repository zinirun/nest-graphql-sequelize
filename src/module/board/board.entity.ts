import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column({ length: 30 })
    title: string;

    @Column()
    content: string;

    /**
     * DB insert time.
     */
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    public createdAt: Date;

    /**
     * DB last update time.
     */
    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    public updatedAt: Date;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;
}
