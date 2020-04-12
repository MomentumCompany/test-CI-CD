import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import {AddUser, CheckPassword} from "../handlers/userHandler";
import {log} from "util";


export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async login(req: Request, res: Response, next: NextFunction) {
       return  this.userRepository.find({email: req.body.email.trim()}).then(doc => {
            if (doc.length > 0) {
                let currentUser = doc[0];
                // console.log('going to check password');
               return  CheckPassword(currentUser, req.body.password).then(value => {
                    console.log(value)
                    return value;
                });

            } else {
                return {message: "Invalid Username "};
            }
        }).catch(err => {
            console.log(err);
            console.log('password check succeeded');
            return {message: 'Something went wrong'}
        })


    }

    async register(request: Request, res: Response, next: NextFunction) {
        try {
            const user = request.body;
            let response = await this.userRepository.find({email: request.body.email});

            if (response.length > 0) {
                res.send('Email already Registered');
            } else {
                const currentUser = await AddUser(user, user.subscriptionPlanId);
                console.log(currentUser);
                const result = await this.userRepository.save(currentUser);
                if (result) {
                    return result;
                } else {
                    return 'Could not save user';
                }

            }
        } catch (e) {
            console.log(e);
            return 'Could not process with finding Email';
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}
