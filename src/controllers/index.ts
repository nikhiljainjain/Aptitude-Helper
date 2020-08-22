import { UserController } from "./user";
import { OTPController } from "./otp";
import { ListenController } from "./listen";
import { AdminController } from "./admin";
import { TempController } from "./temp";
import { AudioController } from "./audio";
import { AdminLoginController } from "./admin/login";

const userController = new UserController();
const otpController = new OTPController();
const listenController = new ListenController();
const adminController = new AdminController();
const tempController = new TempController();
const audioController = new AudioController();
const adminLoginController = new AdminLoginController();

export {
    userController,
    otpController,
    listenController,
    adminController,
    tempController,
    audioController,
    adminLoginController
};
