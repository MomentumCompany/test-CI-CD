import { EntityRepository, Repository } from 'typeorm';
import { TransactionEntity } from '../models/transaction.entity';

@EntityRepository(TransactionEntity)
export class TransactionRepository extends Repository<TransactionEntity> {

}
