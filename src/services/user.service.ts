import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepositoy } from '../repositories/userRepositoy';
import { User } from '../models/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { environment } from '../environment';
import { SubscriptionPlanRepository } from '../repositories/subscriptionPlanRepository';
import { UserRoles } from '../pipes/enums';
import * as moment from 'moment';
import { UserRegistrationModel } from '../shared-models/user.view-models';
import { SubscriptionHelper } from '../pipes/SubscriptionHelper';

@Injectable()
export class UsersService {
  constructor(private readonly userRepositoy: UserRepositoy, private readonly subscriptionRepository: SubscriptionPlanRepository) {
  }

  getUserByEmail(email: string): Promise<User[]> {
    return this.userRepositoy.find({ email: email });
  }

  CheckPassword(currentUser: User, givenPassword): Promise<any> {
    // checking password
    return bcrypt.compare(givenPassword, currentUser.password).then(function(result) {
      if (result) {
        // jwt signing on... creating token
        const token = jwt.sign({
          Email: currentUser.email,
          Name: currentUser.Name,
          MobileNo: currentUser.mobileNo,
        }, environment.jwtKey);

        if (token) {
          console.log('token-', token);
          return { message: `successful Login`, token, currentUser };
        }
      } else {
        throw new HttpException({ status: HttpStatus.FORBIDDEN, error: 'Password wrong' }, HttpStatus.FORBIDDEN);
      }
    });
  }

  async AddUser(user: UserRegistrationModel, subscriptionPlanId: string): Promise<User> {
    const hash = bcrypt.hashSync(user.password, 10);
    const currentUser: User = new User();
    currentUser.Name = user.Name;
    currentUser.organisation = user.organisation;
    currentUser.pincode = user.pincode;
    currentUser.city = user.city;
    currentUser.countryCode = user.countryCode;
    currentUser.country = user.country;
    currentUser.mobileNo = user.mobileNo;
    currentUser.designation = user.designation;
    currentUser.email = user.email;
    currentUser.password = hash;
    currentUser.role = UserRoles.organisationalAdmins;
    const subscriptionHelper = new SubscriptionHelper(moment.utc(), parseInt(subscriptionPlanId, 0));
    const subscription = subscriptionHelper.selectSubscription();
    await this.subscriptionRepository.save(subscription);
    currentUser.subscriptionPlan = subscription;
    return this.userRepositoy.save(currentUser);

  }

}
