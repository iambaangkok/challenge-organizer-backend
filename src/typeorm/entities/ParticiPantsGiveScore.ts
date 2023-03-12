import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";


export class ParticiPantsGiveScore {



    @PrimaryGeneratedColumn()
    particGSId: number;

    @Column()
    displayName?: string;

    @Column()
    fristName?: string;

    @Column()
    lastName?: string;

    @Column()
    score?: number;

    @CreateDateColumn()
    createdAt: Date;





}