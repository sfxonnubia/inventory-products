import { Length } from "@nestjs/class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    @Length(3, 255, { message: "Name must be at least 3 characters long" })
    name: string;
    @Column({ nullable: false })
    description: string;
    @Column({ nullable: false })
    price: number;
    @Column({ nullable: false })
    quantity: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
