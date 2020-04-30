import { EntityRepository, Repository } from 'typeorm';
import { APITokens } from '../models/API_Tokens';

@EntityRepository(APITokens)
export class APITokenRepository extends Repository<APITokens>{

}
