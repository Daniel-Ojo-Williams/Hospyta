import { AbstractEntity } from 'src/shared/AbstractEntity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Users extends AbstractEntity {
  @Column({ nullable: false })
  full_name: string;

  @Column()
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  display_pic: string;

  @BeforeInsert()
  async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
}
