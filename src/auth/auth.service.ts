import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { username, password} = authCredentialsDto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.usersRepository.create({
            username,
            password: hashedPassword
      
          })

          try {
            
              await this.usersRepository.save(user)
          } catch (error) {
            if(error.code === '23505'){  //duplicate username
                throw new ConflictException('Username already exists')
                // console.log(error.code) 

            }else{
                throw new InternalServerErrorException()
              }
              
          }
    }
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}>{
        const { username, password} = authCredentialsDto

        const user = await this.usersRepository.findOne({where: {username}})

        if(user && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = { username }
            const accessToken: string = await this.jwtService.sign(payload)
            return { accessToken }

        }else {
            throw new UnauthorizedException('Please check your login credentials')
        }
    }
}
