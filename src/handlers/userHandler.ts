import {User} from "../entity/User";
import * as bcrypt from 'bcryptjs';
import {SubscriptionPlanType, UserRoles} from "../entity/enums";
import {SubscriptionPlan} from "../entity/SubscriptionPlan";
import {SubscriptionHelper} from "../helpers/SubscriptionHelper";
import {getRepository} from "typeorm";
import * as moment from "moment";
import * as jwt from 'jsonwebtoken';
import {environment} from "../../environment";


export async function AddUser(user: User, subscriptionPlanId: string): Promise<User> {
    const subscriptionPlanRepository = getRepository(SubscriptionPlan);
    const hash = bcrypt.hashSync(user.password, 10);
    let currentUser: User = new User();
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
    await subscriptionPlanRepository.save(subscription);
    currentUser.subscriptionPlan = subscription;
    return currentUser;
}

export function CheckPassword(currentUser: User, givenPassword): Promise<any> {
    // checking password
    return bcrypt.compare(givenPassword, currentUser.password).then(function (result) {
        if (result) {
            console.log('bcrypt -', result);
            // jwt signing on... creating token
            const token = jwt.sign({
                Email: currentUser.email,
                Name: currentUser.Name,
                MobileNo: currentUser.mobileNo
            }, environment.jwtKey);
            console.log('JWT signed In');

            if (token) {
                console.log('token-', token);
                return {message: `successful Login`, token, currentUser};
            }
        } else {
            return {message: 'Password wrong'};
        }
    });
}
